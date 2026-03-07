import os
import logging
from engines.loopay import LoopayXEngine
from dotenv import load_dotenv

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("TestPersistence")

def test_persistence():
    load_dotenv()
    user = os.getenv("LOOPAY_USER")
    pwd = os.getenv("LOOPAY_PASS")
    # Loopay doesn't use TOTP seed in the scraper but we pass None
    
    engine = LoopayXEngine(user, pwd, None)
    
    try:
        logger.info("Starting headless test for LoopayX persistence...")
        # run() will internally call setup(headful=False)
        data = engine.run(headful=False)
        
        if data and "rates" in data:
            logger.info("SUCCESS: Session persisted and data extracted!")
            print(f"Extracted Data: {data}")
        else:
            logger.error("FAILED: Could not reach dashboard or extract data headlessly.")
            # Take a screenshot if it fails
            if hasattr(engine, 'page') and engine.page:
                if not os.path.exists("logs"): os.makedirs("logs")
                engine.page.screenshot(path="logs/test_persistence_failed.png")
                logger.info("Screenshot saved to logs/test_persistence_failed.png")
    except Exception as e:
        logger.error(f"Error during persistence test: {e}")
    finally:
        engine.teardown()

if __name__ == "__main__":
    test_persistence()
