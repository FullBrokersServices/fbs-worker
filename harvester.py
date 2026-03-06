import os
import time
import logging
import math_engine
from dotenv import load_dotenv
from db import supabase_client
from engines.nexxdi import NexxdiPayEngine
from engines.loopay import LoopayXEngine
from engines.dasbanq import DasbanqEngine

# Logging Setup
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(name)s: %(message)s',
    handlers=[
        logging.FileHandler("harvester.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("Harvester")

load_dotenv()

def sync_to_supabase(data, provider):
    if not data:
        return

    try:
        # Sync Rates (with change detection)
        for rate in data.get("rates", []):
            # Check last rate in DB to avoid duplicates
            last_rate = supabase_client.table("broker_rates")\
                .select("rate_buy")\
                .eq("provider", provider)\
                .eq("pair", rate["pair"])\
                .order("created_at", desc=True)\
                .limit(1)\
                .execute()
            
            should_insert = True
            if last_rate.data:
                if float(last_rate.data[0]["rate_buy"]) == float(rate["buy"]):
                    should_insert = False
                    logger.info(f"Rate for {provider} {rate['pair']} unchanged ({rate['buy']}). Skipping insert.")

            if should_insert:
                supabase_client.table("broker_rates").insert({
                    "provider": provider,
                    "pair": rate["pair"],
                    "rate_buy": rate["buy"],
                    "rate_sell": rate["sell"],
                    "raw_payload": rate
                }).execute()
                logger.info(f"Inserted new rate for {provider} {rate['pair']}: {rate['buy']}")

        # Sync Balances (Always insert to track over time)
        for bal in data.get("balances", []):
            supabase_client.table("broker_balances").insert({
                "provider": provider,
                "currency": bal["currency"],
                "balance": bal["balance"],
                "remaining_limit": bal.get("limit"),
            }).execute()
            
        # Handle Status (e.g. LoopayX offline)
        status = data.get("status", "live")
        if status == "offline":
            logger.warning(f"Provider {provider} is OFFLINE. Marking live rates as stale.")
            supabase_client.table("live_rates")\
                .update({"is_stale": True})\
                .eq("currency_pair", "USD/COP")\
                .execute()

        logger.info(f"Successfully synced {provider} data to Supabase.")
    except Exception as e:
        logger.error(f"Failed to sync {provider} to Supabase: {e}", exc_info=True)

def main():
    logger.info("Starting Harvester Worker...")
    
    # Initialize Engines
    engines = [
        NexxdiPayEngine(
            os.getenv("NEXXDI_USER"), 
            os.getenv("NEXXDI_PASS"), 
            os.getenv("NEXXDI_TOTP_SEED")
        ),
        LoopayXEngine(
            os.getenv("LOOPAY_USER"), 
            os.getenv("LOOPAY_PASS"), 
            os.getenv("LOOPAY_TOTP_SEED")
        ),
        DasbanqEngine(
            os.getenv("DASBANQ_USER"),
            os.getenv("DASBANQ_PASS"),
            os.getenv("DASBANQ_TOTP_SEED")
        )
    ]

    while True:
        cycle_start = time.time()
        logger.info(f"--- Starting Cycle at {time.ctime(cycle_start)} ---")
        
        for engine in engines:
            try:
                logger.info(f"--- Running {engine.provider_name} Cycle ---")
                data = engine.run() # Engines handle their own internal timeouts/errors
                sync_to_supabase(data, engine.provider_name)
            except Exception as e:
                logger.critical(f"Unexpected error in harvester loop for {engine.provider_name}: {e}")
            
        # Heartbeat update
        try:
            supabase_client.table("worker_health").insert({
                "status": "ok"
            }).execute()
            
            # Trigger Math Engine to aggregate live rates
            math_engine.calculate_live_rates()
            
        except Exception as e:
            logger.error(f"Failed to update heartbeat/math: {e}")
            
        elapsed = time.time() - cycle_start
        sleep_time = max(5, 60 - elapsed)
        logger.info(f"Cycle complete in {elapsed:.2f}s. Sleeping for {sleep_time:.2f}s...")
        time.sleep(sleep_time)

if __name__ == "__main__":
    main()
