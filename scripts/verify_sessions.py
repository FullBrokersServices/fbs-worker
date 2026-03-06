import os
import sys
import logging
from dotenv import load_dotenv

# Add project root to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from engines.nexxdi import NexxdiPayEngine
from engines.loopay import LoopayXEngine

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("SessionVerifier")

load_dotenv()

def verify_provider(engine_class, user, pwd, seed=None):
    logger.info(f"--- Verifying Session for {engine_class.__name__} ---")
    engine = engine_class(user, pwd, seed)
    
    # Run in HEADFUL mode so user can see and interact
    logger.info("Launching headful browser. Please interact if necessary.")
    data = engine.run(headful=True)
    
    if data:
        logger.info(f"SUCCESS: Data extracted for {engine_class.__name__}")
        print(f"\nParsed Data: {data}\n")
    else:
        logger.error(f"FAILED: Could not extract data for {engine_class.__name__}")

if __name__ == "__main__":
    print("====================================================")
    print("FBS Harvester - Session Verification Tool")
    print("====================================================")
    print("This tool will launch a VISIBLE browser to help you:")
    print("1. Log in manually if 2FA (SMS) is required.")
    print("2. Verify that existing sessions are being reused.")
    print("====================================================")
    
    choice = input("\nSelect provider (1: LoopayX, 2: Nexxdi, 3: All): ")
    
    if choice in ['1', '3']:
        verify_provider(
            LoopayXEngine, 
            os.getenv("LOOPAY_USER"), 
            os.getenv("LOOPAY_PASS"), 
            os.getenv("LOOPAY_TOTP_SEED")
        )
        
    if choice in ['2', '3']:
        verify_provider(
            NexxdiPayEngine, 
            os.getenv("NEXXDI_USER"), 
            os.getenv("NEXXDI_PASS"), 
            os.getenv("NEXXDI_TOTP_SEED")
        )

    print("\nSession verification complete. Sessions saved in 'sessions/' folder.")
