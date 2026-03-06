import os
import pyotp
import logging
from playwright.sync_api import sync_playwright
from abc import ABC, abstractmethod

class BaseEngine(ABC):
    def __init__(self, provider_name, user, password, totp_seed):
        self.provider_name = provider_name
        self.user = user
        self.password = password
        self.totp_seed = totp_seed
        self.logger = logging.getLogger(f"Harvester.{provider_name}")
        self.playwright = None
        self.browser = None
        self.context = None
        self.page = None

    def setup(self, headful=False):
        self.logger.info(f"Initializing persistent browser context for {self.provider_name}...")
        self.playwright = sync_playwright().start()
        
        # User Data Directory (Persistence)
        user_data_dir = os.path.join(os.getcwd(), "sessions", self.provider_name.lower())
        
        self.context = self.playwright.chromium.launch_persistent_context(
            user_data_dir=user_data_dir,
            headless=not headful,
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            viewport={'width': 1280, 'height': 720}
        )
        self.page = self.context.pages[0] if self.context.pages else self.context.new_page()

    def get_totp(self):
        if not self.totp_seed:
            self.logger.error("TOTP seed is missing!")
            return None
        totp = pyotp.TOTP(self.totp_seed.replace(" ", ""))
        return totp.now()

    @abstractmethod
    def run(self):
        """Main extraction loop for the provider"""
        pass

    def teardown(self):
        self.logger.info(f"Closing persistent context for {self.provider_name}...")
        if self.context:
            self.context.close()
        if self.playwright:
            self.playwright.stop()
