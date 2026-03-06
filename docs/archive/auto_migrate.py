import psycopg2
import os

PROJECT_REF = "eohzuleozwvmiupylixf"
PASSWORD = "Siempre.fullbrokersservices26"
DB_USER = f"postgres.{PROJECT_REF}"

# All active Supabase regions
REGIONS = [
    "us-east-1", "us-east-2", "us-west-1", "us-west-2",
    "sa-east-1", "ca-central-1", "eu-west-1", "eu-west-2",
    "eu-west-3", "eu-central-1", "ap-southeast-1", "ap-southeast-2",
    "ap-northeast-1", "ap-northeast-2", "ap-south-1"
]

sql_path = os.path.join(os.path.dirname(__file__), "migrations", "20260305_init_harvester.sql")

def attempt_migration():
    if not os.path.exists(sql_path):
        print(f"❌ Error: Archivo SQL no encontrado en {sql_path}")
        return

    with open(sql_path, "r", encoding="utf-8") as f:
        sql_script = f.read()

    success = False
    for region in REGIONS:
        pooler_host = f"aws-0-{region}.pooler.supabase.com"
        db_url = f"postgresql://{DB_USER}:{PASSWORD}@{pooler_host}:6543/postgres"
        
        print(f"🔍 Probando conexión Supavisor en región: {region} ({pooler_host})...")
        try:
            conn = psycopg2.connect(db_url, connect_timeout=3)
            conn.autocommit = True
            cur = conn.cursor()
            
            print(f"✅ ¡Conexión exitosa en {region}! Ejecutando migración...")
            cur.execute(sql_script)
            print("🎉 ¡Migración aplicada 100% automáticamente!")
            
            # Update the local .env to use this working pooler for future connections if needed
            with open(".env", "r") as f:
                env_content = f.read()
            
            # Replace the old DATABASE_URL with the working one
            import re
            env_content = re.sub(r'DATABASE_URL=".*"', f'DATABASE_URL="{db_url}"', env_content)
            
            with open(".env", "w") as f:
                f.write(env_content)
                
            print("📝 .env actualizado con el DATABASE_URL del pooler IPv4")
            
            success = True
            cur.close()
            conn.close()
            break
            
        except psycopg2.OperationalError as e:
            # Expected if region is wrong or timeout
            pass
        except Exception as e:
            print(f"⚠️ Error inesperado: {e}")

    if not success:
        print("❌ Fallaron todas las regiones del pooler. Verifica la contraseña o el estado del proyecto.")

if __name__ == "__main__":
    attempt_migration()
