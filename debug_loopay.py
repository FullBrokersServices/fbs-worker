import os
import time
from playwright.sync_api import sync_playwright

def diagonal():
    with sync_playwright() as p:
        user_data_dir = os.path.join(os.getcwd(), "sessions", "loopayx")
        print(f"Opening browser with sessions from: {user_data_dir}")
        
        context = p.chromium.launch_persistent_context(
            user_data_dir=user_data_dir,
            headless=True,
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        )
        page = context.pages[0]
        
        print("Navigating to https://app.loopayx.com/dashboard ...")
        page.goto("https://app.loopayx.com/dashboard")
        page.wait_for_timeout(10000)
        
        url = page.url
        print(f"Current URL: {url}")
        
        screenshot_path = "logs/debug_loopay.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")
        
        body_text = page.inner_text("body")
        print(f"Body snippet: {body_text[:500]}")
        
        context.close()

if __name__ == "__main__":
    if not os.path.exists("logs"):
        os.makedirs("logs")
    diagonal()
