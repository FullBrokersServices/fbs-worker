import os
import pyotp
import logging
from playwright.sync_api import sync_playwright, Page, BrowserContext
from playwright_stealth import Stealth
from abc import ABC, abstractmethod

class BaseEngine(ABC):
    def __init__(self, provider_name, user, password, totp_seed):
        self.provider_name = provider_name
        self.user = user
        self.password = password
        self.totp_seed = totp_seed
        self.logger = logging.getLogger(f"Harvester.{provider_name}")
        self.playwright = None
        self.context = None
        self.page = None

    def setup(self, headful=False):
        self.logger.info(f"Initializing persistent browser context for {self.provider_name}...")
        self.playwright = sync_playwright().start()
        
        # Profile Directory
        profile_dir = os.path.join(os.getcwd(), "sessions", f"profile_{self.provider_name.lower()}")
        os.makedirs(profile_dir, exist_ok=True)
        
        launch_args = ["--disable-blink-features=AutomationControlled"]
        
        # Persistent context handles cookies, localStorage, IndexedDB, etc. automatically
        self.context = self.playwright.chromium.launch_persistent_context(
            user_data_dir=profile_dir,
            headless=not headful,
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            viewport={'width': 1920, 'height': 1080},
            ignore_https_errors=True,
            args=launch_args,
            ignore_default_args=["--enable-automation"]
        )
        
        # In persistent context, the first page is already created
        self.page = self.context.pages[0] if self.context.pages else self.context.new_page()
        
        # Apply stealth
        Stealth().apply_stealth_sync(self.page)

    def get_totp(self):
        if not self.totp_seed:
            self.logger.error("TOTP seed is missing!")
            return None
        totp = pyotp.TOTP(self.totp_seed.replace(" ", ""))
        return totp.now()

    @abstractmethod
    def run(self):
        pass

    def save_state(self):
        # With persistent context, state is saved automatically to disk on close
        self.logger.info(f"Session data is being persisted in profile directory.")

    def teardown(self):
        self.logger.info(f"Closing persistent context for {self.provider_name}...")
        if self.context:
            try:
                self.context.close()
            except:
                pass
        if self.playwright:
            try:
                self.playwright.stop()
            except:
                pass
