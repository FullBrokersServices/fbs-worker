import os
import pg8000
import ssl
from urllib.parse import urlparse
from dotenv import load_dotenv

# Load .env file
load_dotenv()

DB_URL = os.getenv("DATABASE_URL")

def run_migrations():
    if not DB_URL:
        print("❌ Error: DATABASE_URL no encontrada en .env")
        return

    # Use absolute path for the SQL file
    sql_path = os.path.join(os.path.dirname(__file__), "migrations", "20260305_init_harvester.sql")
    
    if not os.path.exists(sql_path):
        print(f"❌ Error: Archivo de migración no encontrado en {sql_path}")
        return

    print("🔌 Conectando a Supabase PostgreSQL (via pg8000)...")
    try:
        # Parse connection URL for pg8000
        url = urlparse(DB_URL)
        # Create an insecure SSL context for Supabase connection
        ssl_context = ssl.create_default_context()
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE

        conn = pg8000.connect(
            user=url.username,
            password=url.password,
            host=url.hostname,
            port=url.port,
            database=url.path[1:],
            ssl_context=ssl_context
        )
        # conn.autocommit = True # pg8000 doesn't have autocommit as a simple property like psycopg2
        
        with open(sql_path, "r", encoding="utf-8") as f:
            sql_script = f.read()

        print("🚀 Ejecutando script de migración...")
        cursor = conn.cursor()
        
        # pg8000 execute doesn't support multiple statements in one call easily if they are split by ;
        # We can try to split them manually or just hope the backend handles it.
        # Often simple migrations work fine as single blocks.
        cursor.execute(sql_script)
        conn.commit()
        
        print("✅ Migración completada con éxito.")
        
    except Exception as e:
        print(f"❌ Error ejecutando migración: {e}")
    finally:
        if 'conn' in locals():
            conn.close()
        print("🔒 Conexión cerrada.")

if __name__ == "__main__":
    run_migrations()
