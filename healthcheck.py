import logging
from db import supabase_client
from datetime import datetime, timezone

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("HealthCheck")

def report_health(status="ok", error_msg=None):
    """
    Registra el estado de salud del worker en la tabla worker_health.
    """
    try:
        data = {
            "status": status,
            "last_heartbeat": datetime.now(timezone.utc).isoformat()
        }
        if error_msg:
            data["last_error"] = str(error_msg)
            
        # Intentamos actualizar el registro con ID=1, o insertarlo si no existe
        response = supabase_client.table("worker_health").upsert(
            {**data, "id": 1}
        ).execute()
        
        logger.info(f"✅ HealthCheck reportado: {status}")
        return True
    except Exception as e:
        logger.error(f"❌ Error reportando HealthCheck: {e}")
        return False

if __name__ == "__main__":
    report_health(status="ok")
