import logging
from db import supabase_client

logger = logging.getLogger("MathEngine")

def calculate_live_rates():
    """
    Calculates final live rates based on extracted broker data and applies spread.
    Rule: live_rate = MAX(broker_rates) + Spread
    """
    logger.info("Starting Live Rate Calculation...")
    
    # 1. Fetch latest rates from all brokers for each pair
    # For now focusing on primary pair USD/COP (extracted by Nexxdi/Loopay)
    try:
        # Get latest rates from the last 10 minutes to ensure fresh data
        res = supabase_client.table("broker_rates")\
            .select("provider, pair, rate_buy")\
            .order("created_at", desc=True)\
            .limit(10)\
            .execute()
        
        if not res.data:
            logger.warning("No fresh broker rates found for calculation.")
            return

        # Simple logic for USD/COP
        usd_cop_rates = [float(r["rate_buy"]) for r in res.data if r["pair"] == "USD/COP"]
        
        if usd_cop_rates:
            max_rate = max(usd_cop_rates)
            spread = 12.0 # Standard FBS Spread
            final_rate = max_rate + spread
            
            logger.info(f"USD/COP: Max Broker={max_rate} | Final={final_rate}")
            
            # Upsert into live_rates
            supabase_client.table("live_rates").upsert({
                "currency_pair": "USD/COP",
                "final_rate": final_rate,
                "spread_applied": spread,
                "is_stale": False
            }, on_conflict="currency_pair").execute()
            
            logger.info("Successfully updated live_rates in Supabase.")

    except Exception as e:
        logger.error(f"Math calculation failed: {e}")

if __name__ == "__main__":
    calculate_live_rates()
