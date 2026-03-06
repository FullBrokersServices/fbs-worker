import os
import psycopg2
import subprocess
import re
from dotenv import load_dotenv

load_dotenv()

PROJECT_REF = "eohzuleozwvmiupylixf"
PASSWORD = "Siempre.fullbrokersservices26"
USER = f"postgres.{PROJECT_REF}"

REGIONS = [
    "us-east-1", "us-east-2", "us-west-1", "us-west-2",
    "sa-east-1", "ca-central-1", "eu-west-1", "eu-west-2",
    "eu-west-3", "eu-central-1", "ap-southeast-1", "ap-southeast-2",
    "ap-northeast-1", "ap-northeast-2", "ap-south-1"
]

SQL_FILE = os.path.join(os.path.dirname(__file__), "migrations", "20260305_init_harvester.sql")

def resolve_ips(hostname):
    try:
        # Use nslookup with Google DNS to bypass local DNS issues
        result = subprocess.run(['nslookup', hostname, '8.8.8.8'], capture_output=True, text=True, timeout=5)
        ips = re.findall(r"Address:\s+((?:\d{1,3}\.){3}\d{1,3})", result.stdout)
        # Usually internal Google DNS is first, then the actual host IPs
        return [ip for ip in ips if ip != "8.8.8.8"]
    except Exception:
        return []

def run_migration():
    if not os.path.exists(SQL_FILE):
        print(f"❌ Migration file not found: {SQL_FILE}")
        return

    with open(SQL_FILE, 'r', encoding='utf-8') as f:
        sql = f.read()

    print(f"🔍 Brute-forcing 30 Regional Pooler combinations...")
    
    for region in REGIONS:
        host = f"aws-0-{region}.pooler.supabase.com"
        ips = resolve_ips(host)
        
        if not ips:
            # Fallback to hostname if resolution fails (unlikely to work if DNS is broken)
            ips = [host]
        
        for ip in ips:
            for port in [5432, 6543]:
                dsn = f"postgresql://{USER}:{PASSWORD}@{ip}:{port}/postgres?connect_timeout=3"
                print(f"⚡ Testing {region} | {ip}:{port}...")
                try:
                    conn = psycopg2.connect(dsn)
                    conn.autocommit = True
                    with conn.cursor() as cur:
                        print(f"✅ CONNECTED! Initializing schema...")
                        cur.execute(sql)
                        print(f"🎉 SUCCESS! Migrations applied in {region}.")
                        update_env(dsn)
                    conn.close()
                    return
                except psycopg2.OperationalError as e:
                    err_msg = str(e).strip()
                    if "Tenant or user not found" in err_msg:
                        print(f"⏭️ {region}: Wrong tenant region.")
                        break # Skip other ports/IPs for this region
                    elif "timeout expired" in err_msg:
                        print(f"⏳ {region}: Timeout.")
                    else:
                        print(f"❌ {region}: {err_msg[:50]}...")
                except Exception as e:
                    print(f"❓ {region}: {e}")

    print("⚠️ All regional paths failed. Check network/firewall.")

def update_env(dsn):
    env_path = os.path.join(os.path.dirname(__file__), ".env")
    if os.path.exists(env_path):
        with open(env_path, 'r') as f:
            lines = f.readlines()
        with open(env_path, 'w') as f:
            found = False
            for line in lines:
                if line.startswith("DATABASE_URL="):
                    f.write(f'DATABASE_URL="{dsn}"\n')
                    found = True
                else:
                    f.write(line)
            if not found:
                f.write(f'DATABASE_URL="{dsn}"\n')
        print(f"📝 Env sync complete.")

if __name__ == "__main__":
    run_migration()
