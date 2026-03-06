import re
import time
from .base import BaseEngine

class LoopayXEngine(BaseEngine):
    def __init__(self, user, password, totp_seed):
        super().__init__("LoopayX", user, password, totp_seed)
        self.login_url = "https://app.loopayx.com/login"
        self.dashboard_url = "https://app.loopayx.com/dashboard"

    def run(self):
        self.setup()
    def run(self):
        self.setup()
        try:
            self.logger.info("Checking session for LoopayX...")
            self.page.goto(self.dashboard_url)
            self.page.wait_for_load_state("networkidle")
            
            # If redirected to login, perform login
            if "login" in self.page.url:
                self.logger.info("Session expired or missing. Logging in to LoopayX...")
                self.page.goto(self.login_url)
                
                # Login Flow (Guesses based on standard patterns)
                self.page.fill('input[name="username"], input[type="text"]', self.user)
                self.page.fill('input[name="password"]', self.password)
                self.page.click('button[type="submit"]')
                
                # Handle TOTP if exists
                otp_field = self.page.query_selector('input[name="otp"], input[placeholder*="2FA"]')
                if otp_field:
                    self.logger.info("Entering TOTP...")
                    totp_code = self.get_totp()
                    self.page.fill(otp_field, totp_code)
                    self.page.click('button[type="submit"]')

                self.page.wait_for_load_state("networkidle")
                self.logger.info("Login successful.")
            else:
                self.logger.info("Reusing existing session for LoopayX.")
            self.logger.info("Successfully logged in.")

            return self.extract_data()

        except Exception as e:
            self.logger.error(f"LoopayX extraction failed: {e}")
            self.page.screenshot(path=f"logs/loopay_error_{int(time.time())}.png")
            return None
        finally:
            self.teardown()

    def extract_data(self):
        body_text = self.page.inner_text("body")
        data = {"rates": [], "balances": []}

        # $0 Balance Detection (from extension)
        if "$ 0" in body_text or "COP: $ 0" in body_text:
            self.logger.warning("LoopayX shows $0 Balance - Offline status.")
            data["balances"].append({"currency": "COP", "balance": 0.0})
            data["status"] = "offline"
            return data

        data["status"] = "live"

        # Rate extraction from extension: 3XXX,XX or 3.XXX,XX
        matches = re.findall(r"\b3[.,]?\d{3}[,]\d{2}\b", body_text)
        if matches:
            for match in matches:
                num_str = match.replace(".", "").replace(",", ".")
                try:
                    num = float(num_str)
                    if 3000 < num < 5000:
                        data["rates"].append({"pair": "USD/COP", "buy": num, "sell": num + 5})
                        self.logger.info(f"LoopayX Rate found: {num}")
                        break
                except ValueError:
                    continue

        return data
