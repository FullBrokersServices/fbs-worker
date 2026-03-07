import os
import logging
import json
from playwright.sync_api import sync_playwright
from dotenv import load_dotenv

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("StorageAudit")

def audit_storage():
    load_dotenv()
    state_path = os.path.join(os.getcwd(), "sessions", "loopayx_state.json")
    
    with sync_playwright() as p:
        logger.info("Launching browser for storage audit...")
        browser = p.chromium.launch(headless=True)
        
        # Load existing state
        storage_state = state_path if os.path.exists(state_path) else None
        context = browser.new_context(storage_state=storage_state)
        page = context.new_page()
        
        logger.info("Navigating to LoopayX...")
        page.goto("https://app.loopayx.com/dashboard")
        page.wait_for_timeout(5000)
        
        # Audit script
        audit_script = """
        async () => {
            const results = {
                localStorage: Object.keys(localStorage),
                sessionStorage: Object.keys(sessionStorage),
                indexedDB: await window.indexedDB.databases().then(dbs => dbs.map(db => db.name)),
                cookies: document.cookie,
                url: window.location.href
            };
            return results;
        }
        """
        
        results = page.evaluate(audit_script)
        logger.info(f"Audit Results: {json.dumps(results, indent=2)}")
        
        page.screenshot(path="logs/audit_screenshot.png")
        browser.close()

if __name__ == "__main__":
    audit_storage()
