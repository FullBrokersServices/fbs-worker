import os
import psycopg2
import subprocess
import re
from dotenv import load_dotenv

load_dotenv()

PROJECT_REF = "eohzuleozwvmiupylixf"
PASSWORD = "Siempre.fullbrokersservices26"
USER = f"postgres.{PROJECT_REF}"

# Standard Supabase Regions for GCP
REGIONS = [
    "us-east1", "us-west1", "europe-west3", "asia-southeast1", "southamerica-east1"
]

SQL_FILE = os.path.join(os.path.dirname(__file__), "migrations", "20260305_init_harvester.sql")

def resolve_ips(hostname):
    try:
        result = subprocess.run(['nslookup', hostname, '8.8.8.8'], capture_output=True, text=True, timeout=5)
        ips = re.findall(r"Address:\s+((?:\d{1,3}\.){3}\d{1,3})", result.stdout)
        return [ip for ip in ips if ip != "8.8.8.8"]
    except Exception:
        return []

def run_migration():
    if not os.path.exists(SQL_FILE):
        print(f"❌ Migration file not found: {SQL_FILE}")
        return

    with open(SQL_FILE, 'r', encoding='utf-8') as f:
        sql = f.read()

    print(f"🔍 Checking GCP regions...")
    
    for region in REGIONS:
        host = f"gcp-0-{region}.pooler.supabase.com"
        ips = resolve_ips(host)
        
        if not ips:
            ips = [host]
        
        for ip in ips:
            for port in [5432, 6543]:
                dsn = f"postgresql://{USER}:{PASSWORD}@{ip}:{port}/postgres?connect_timeout=3"
                print(f"⚡ Testing GCP {region} | {ip}:{port}...")
                try:
                    conn = psycopg2.connect(dsn)
                    conn.autocommit = True
                    with conn.cursor() as cur:
                        print(f"✅ CONNECTED GCP! Initializing...")
                        cur.execute(sql)
                        print(f"🎉 SUCCESS! Migrations applied in {region}.")
                    conn.close()
                    return
                except psycopg2.OperationalError as e:
                    err_msg = str(e).strip()
                    if "Tenant or user not found" in err_msg:
                        print(f"⏭️ GCP {region}: Wrong tenant.")
                        break
                    else:
                        print(f"❌ GCP {region}: {err_msg[:40]}...")
                except Exception as e:
                    print(f"❓ GCP {region}: {e}")

    print("⚠️ All GCP paths failed too.")

if __name__ == "__main__":
    run_migration()
