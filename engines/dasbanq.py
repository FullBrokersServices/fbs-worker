import re
import time
from .base import BaseEngine

class DasbanqEngine(BaseEngine):
    def __init__(self, user, password, totp_seed):
        super().__init__("Dasbanq", user, password, totp_seed)
        self.login_url = "https://dasbanq.com/es/login"
        self.dashboard_url = "https://dasbanq.com/es/dashboard/banking-crypto"

    def run(self, headful=False):
        self.setup(headful=headful)
        try:
            self.logger.info("Checking session for Dasbanq...")
            self.page.goto(self.dashboard_url)
            self.page.wait_for_load_state("networkidle")

            # If redirected to login, perform login
            if "login" in self.page.url:
                self.logger.info("Session expired or missing. Logging in to Dasbanq...")
                self.page.goto(self.login_url)
                
                # Login Flow
                self.page.fill('input[name="email"], input[type="email"]', self.user)
                self.page.fill('input[name="password"]', self.password)
                self.page.click('button[type="submit"]')
                
                # Handle TOTP if requested
                otp_selector = 'input[name="otp"], input[placeholder*="2FA"], input[id*="otp"]'
                try:
                    if self.page.wait_for_selector(otp_selector, timeout=5000):
                        self.logger.info("Entering 2FA code for Dasbanq...")
                        totp_code = self.get_totp()
                        self.page.fill(otp_selector, totp_code)
                        self.page.click('button[type="submit"]')
                except:
                    self.logger.info("No TOTP requested or timeout.")

                self.page.wait_for_url(re.compile(r"dashboard"), timeout=20000)
                self.logger.info("Login successful.")
            else:
                self.logger.info("Reusing existing session for Dasbanq.")
            self.page.goto(self.dashboard_url)
            self.page.wait_for_load_state("networkidle")
            
            self.logger.info("Successfully reached Dasbanq banking-crypto page.")
            return self.extract_data()

        except Exception as e:
            self.logger.error(f"Dasbanq extraction failed: {e}")
            self.page.screenshot(path=f"logs/dasbanq_error_{int(time.time())}.png")
            return None
        finally:
            self.teardown()

    def extract_data(self):
        body_text = self.page.inner_text("body")
        data = {"rates": [], "balances": []}
        
        # Logic adapted from SYNERBIT extension content-dasbanq.js
        
        # Euro Pattern (captures decimal numbers after "Euro")
        eur_match = re.search(r"Euro[\s\S]{0,50}?([\d]+[.,][\d]+)[\s\S]{0,30}?([\d]+[.,][\d]+)", body_text, re.I)
        if eur_match:
            try:
                buy = float(eur_match.group(1).replace(',', '.'))
                sell = float(eur_match.group(2).replace(',', '.'))
                if 0.5 < buy < 1.5:
                    data["rates"].append({"pair": "EUR/USD", "buy": buy, "sell": sell})
                    self.logger.info(f"Dasbanq EUR/USD: {buy} / {sell}")
            except: pass

        # MXN Pattern (captures decimal numbers after "Peso Mex")
        mxn_match = re.search(r"Peso\s*Mex[\s\S]{0,50}?([\d]+[.,][\d]+)[\s\S]{0,30}?([\d]+[.,][\d]+)", body_text, re.I)
        if mxn_match:
            try:
                buy = float(mxn_match.group(1).replace(',', '.'))
                sell = float(mxn_match.group(2).replace(',', '.'))
                if 10 < buy < 30:
                    data["rates"].append({"pair": "MXN/USD", "buy": buy, "sell": sell})
                    self.logger.info(f"Dasbanq MXN/USD: {buy} / {sell}")
            except: pass

        return data
