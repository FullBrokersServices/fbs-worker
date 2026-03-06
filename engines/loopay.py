import re
import time
from .base import BaseEngine

class LoopayXEngine(BaseEngine):
    def __init__(self, user, password, totp_seed):
        super().__init__("LoopayX", user, password, totp_seed)
        self.login_url = "https://app.loopayx.com/auth/client/login"
        self.dashboard_url = "https://app.loopayx.com/dashboard"

    def run(self, headful=False):
        self.setup(headful=headful)
        try:
            self.logger.info("Checking session for LoopayX...")
            self.page.goto(self.dashboard_url)
            self.page.wait_for_timeout(5000) # Wait for initial redirect
            
            # If we are not on the dashboard, force login page
            if "/dashboard" not in self.page.url.lower():
                self.logger.info(f"Not on dashboard ({self.page.url}). Forcing login page...")
                self.page.goto(self.login_url)
                self.page.wait_for_timeout(5000) # Wait for login page to render
                
                # Try multiple selectors for the username field
                selectors = ['input[name="username"]', 'input[type="text"]', 'input[name="email"]', 'input[type="email"]']
                username_field = None
                for selector in selectors:
                    username_field = self.page.query_selector(selector)
                    if username_field:
                        self.logger.info(f"Found username field with selector: {selector}")
                        break
                
                if username_field:
                    username_field.fill(self.user)
                else:
                    self.logger.warning("Could not find username field automatically. User might need to click/interact.")
                
                # Password optional for LoopayX (Passwordless/SMS-only flow)
                if self.password:
                    self.page.fill('input[name="password"]', self.password)
                
                self.page.click('button[type="submit"]')
                
                # Handle 2FA (TOTP or SMS)
                self.page.wait_for_timeout(2000) # Wait for potential redirect/field appearance
                
                # Detect OTP field (TOTP or SMS code)
                otp_field = self.page.query_selector('input[name="otp"], input[placeholder*="2FA"], input[name="code"]')
                if otp_field:
                    if self.totp_seed:
                        self.logger.info("Entering TOTP from seed...")
                        totp_code = self.get_totp()
                        otp_field.fill(totp_code)
                    else:
                        self.logger.warning("SMS 2FA detected (no TOTP seed provided).")
                        if headful:
                            self.logger.info("Awaiting manual code entry in headful mode...")
                            # In headful mode, the user can type it directly or we can wait
                        else:
                            self.logger.error("SMS 2FA required but running in headless mode. Please run scripts/verify_sessions.py")
                            return None

                    # Click submit if 2FA was handled
                    submit_button = self.page.query_selector('button[type="submit"]')
                    if submit_button:
                        submit_button.click()

                self.page.wait_for_load_state("networkidle")
                
                if "login" in self.page.url:
                    self.logger.error("Login failed (still on login page).")
                    return None
                    
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
            if not headful:
                self.teardown()
            else:
                self.logger.info("Browser remains open in headful mode for user interaction.")

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
