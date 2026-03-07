import os
import logging
import json
from engines.loopay import LoopayXEngine
from dotenv import load_dotenv

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("TestPersistence")

def test_persistence():
    load_dotenv()
    user = os.getenv("LOOPAY_USER")
    pwd = os.getenv("LOOPAY_PASS")
    
    engine = LoopayXEngine(user, pwd, None)
    
    try:
        logger.info("Starting headless test for LoopayX persistence...")
        # setup(headful=False) will be called inside run()
        engine.setup(headful=False)
        
        # Diagnostic: Check if localStorage is populated BEFORE navigation
        # (It shouldn't be until we are on the origin)
        
        logger.info(f"Navigating to {engine.dashboard_url}...")
        engine.page.goto(engine.dashboard_url)
        engine.page.wait_for_timeout(5000)
        
        # Check localStorage via evaluate
        ls_content = engine.page.evaluate("() => JSON.stringify(localStorage)")
        logger.info(f"LocalStorage after navigation: {ls_content[:200]}...")
        
        if "loopayx-auth-storage" in ls_content:
            logger.info("SUCCESS: loopayx-auth-storage FOUND in localStorage!")
        else:
            logger.error("FAILED: loopayx-auth-storage NOT FOUND in localStorage.")
            
        # Continue with run() logic but skipping setup()
        # Instead of calling run(), we'll just call the extraction part if authenticated
        body_text = engine.page.inner_text("body").lower()
        if "saldo" in body_text or "dashboard" in engine.page.url.lower():
            logger.info("Authenticated area reached!")
            data = engine.extract_data()
            logger.info(f"Extracted Data: {data}")
        else:
            logger.error("Still showing landing/login page.")
            engine.page.screenshot(path="logs/debug_ls_failed.png")

    except Exception as e:
        logger.error(f"Error: {e}")
    finally:
        engine.teardown()

if __name__ == "__main__":
    test_persistence()
