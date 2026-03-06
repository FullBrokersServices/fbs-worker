import re
import time
from .base import BaseEngine

class NexxdiPayEngine(BaseEngine):
    def __init__(self, user, password, totp_seed):
        super().__init__("NexxdiPay", user, password, totp_seed)
        self.login_url = "https://app.nexxdipay.com/login"
        self.rates_url = "https://app.nexxdipay.com/admin/exchange"
        self.last_rate = None
        self.stale_count = 0

    def run(self, headful=False):
        self.setup(headful=headful)
        try:
            self.logger.info("Checking session for NexxdiPay...")
            self.page.goto(self.rates_url)
            self.page.wait_for_load_state("networkidle")
            
            # If redirected to login, perform login
            if "login" in self.page.url:
                self.logger.info("Session expired or missing. Logging in to NexxdiPay...")
                self.page.goto(self.login_url)
                
                # Login Flow
                self.page.fill('input[name="email"]', self.user)
                self.page.fill('input[name="password"]', self.password)
                self.page.click('button[type="submit"]')
                
                # Handle TOTP
                if self.page.wait_for_selector('input[name="otp"]', timeout=10000):
                    self.logger.info("Entering TOTP...")
                    totp_code = self.get_totp()
                    self.page.fill('input[name="otp"]', totp_code)
                    self.page.click('button[type="submit"]')

                self.page.wait_for_url(self.rates_url, timeout=20000)
                self.logger.info("Login successful.")
            else:
                self.logger.info("Reusing existing session for NexxdiPay.")
            self.logger.info("Successfully reached rates page.")

            # Extraction
            rate_data = self.extract_data()
            
            # Stale Detection Logic from Extension
            if rate_data and rate_data["rates"]:
                current_rate = rate_data["rates"][0]["buy"]
                if self.last_rate == current_rate:
                    self.stale_count += 1
                    if self.stale_count >= 5:
                        self.logger.warning("Rate stale for 5 cycles, forcing deep refresh...")
                        self.trigger_deep_refresh()
                        self.stale_count = 0
                        return self.extract_data() # Re-extract
                else:
                    self.stale_count = 0
                self.last_rate = current_rate

            return rate_data

        except Exception as e:
            self.logger.error(f"NexxdiPay extraction failed: {e}")
            self.page.screenshot(path=f"logs/nexxdi_error_{int(time.time())}.png")
            return None
        finally:
            self.teardown()

    def trigger_refresh(self):
        try:
            # Method 1: Click "Editar monto"
            btn = self.page.get_by_role("button", name=re.compile("editar monto", re.I))
            if btn.is_visible():
                self.logger.info("Refreshing via 'Editar monto'...")
                btn.click()
                self.page.wait_for_timeout(1000)
                # Confirmar / Cotizar
                confirm = self.page.get_by_role("button", name=re.compile("cotizar|confirmar", re.I))
                if confirm.is_visible():
                    confirm.click()
                    self.page.wait_for_timeout(2000)
        except Exception as e:
            self.logger.warning(f"Refresh failed: {e}")

    def trigger_deep_refresh(self):
        try:
            # Method 2: Mutate amount to force recalculation (from extension)
            monto_input = self.page.locator('input[type="number"]').first
            if monto_input.is_visible():
                current_val = monto_input.get_attribute("value")
                new_val = str(int(current_val) + 1) if current_val and current_val.isdigit() else "101"
                monto_input.fill(new_val)
                self.page.wait_for_timeout(500)
                monto_input.fill(current_val if current_val else "100")
                self.page.wait_for_timeout(1000)
                self.trigger_refresh()
        except Exception as e:
            self.logger.warning(f"Deep refresh failed: {e}")

    def extract_data(self):
        body_text = self.page.inner_text("body")
        data = {"rates": [], "balances": []}

        # Regex from Extension: 1 USD = 3.595,38 COP
        patterns = [
            r"1\s*USD\s*=\s*([\d.]+,\d{2})\s*COP",
            r"1\s*USD\s*=\s*([\d,]+\.\d{2})\s*COP",
            r"Tasa de cambio[^\d]*([\d.,]+)\s*COP"
        ]

        rate = None
        for pattern in patterns:
            match = re.search(pattern, body_text, re.IGNORECASE)
            if match:
                rate_str = match.group(1)
                # Normalization
                if "." in rate_str and "," in rate_str:
                    if rate_str.index(".") < rate_str.index(","):
                        rate_str = rate_str.replace(".", "").replace(",", ".")
                    else:
                        rate_str = rate_str.replace(",", "")
                elif "," in rate_str:
                    rate_str = rate_str.replace(",", ".")
                
                try:
                    rate = float(rate_str)
                    if 3000 < rate < 5500:
                        data["rates"].append({"pair": "USD/COP", "buy": rate, "sell": rate + 10}) # Sell 10 points higher as fallback
                        self.logger.info(f"Extracted USD/COP rate: {rate}")
                        break
                except ValueError:
                    continue

        # Balance Extraction (Generic keywords)
        balance_match = re.search(r"(Available Balance|Saldo Disponible)[^\d]*([\d.,]+)", body_text, re.I)
        if balance_match:
            try:
                bal_str = balance_match.group(2).replace(".", "").replace(",", ".")
                data["balances"].append({"currency": "USD", "balance": float(bal_str)})
            except: pass

        return data
