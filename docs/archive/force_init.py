import subprocess
import psycopg2
import os
import re

PROJECT_REF = "eohzuleozwvmiupylixf"
PASSWORD = "Siempre.fullbrokersservices26"
DB_USER = f"postgres.{PROJECT_REF}"

REGIONS = [
    "us-east-1", "us-east-2", "us-west-1", "us-west-2",
    "sa-east-1", "ca-central-1", "eu-west-1", "eu-west-2",
    "eu-west-3", "eu-central-1", "ap-southeast-1", "ap-southeast-2",
    "ap-northeast-1", "ap-northeast-2", "ap-south-1"
]

sql_path = os.path.join(os.path.dirname(__file__), "migrations", "20260305_init_harvester.sql")

def resolve_ip(hostname):
    try:
        # Resolve using nslookup and 8.8.8.8
        cmd = f"nslookup {hostname} 8.8.8.8"
        output = subprocess.check_output(cmd, shell=True, stderr=subprocess.STDOUT, text=True)
        # Look for IPv4 addresses
        ips = re.findall(r"Address:\s+((?:\d{1,3}\.){3}\d{1,3})", output)
        # nslookup output has multiple addresses, first one is usually the Google DNS
        if len(ips) > 1:
            return ips[1:]
        return []
    except Exception:
        return []

def run():
    if not os.path.exists(sql_path):
        print(f"❌ Error: Archivo SQL no encontrado en {sql_path}")
        return

    with open(sql_path, "r", encoding="utf-8") as f:
        sql_script = f.read()

    success = False
    for region in REGIONS:
        pooler_host = f"aws-0-{region}.pooler.supabase.com"
        print(f"🔍 Resolviendo {pooler_host}...")
        ips = resolve_ip(pooler_host)
        
        if not ips:
            print(f"⚠️ No se pudo resolver {region}")
            continue

        for ip in ips:
            db_url = f"postgresql://{DB_USER}:{PASSWORD}@{ip}:5432/postgres"
            print(f"🚀 Probando {region} en {ip}:5432...")
            try:
                conn = psycopg2.connect(db_url, connect_timeout=3)
                conn.autocommit = True
                cur = conn.cursor()
                
                print(f"✅ ¡CONEXIÓN EXITOSA EN {region}! Ejecutando SQL...")
                cur.execute(sql_script)
                print("🎉 MIGRACIÓN COMPLETADA.")
                
                success = True
                cur.close()
                conn.close()
                break
            except Exception as e:
                if "Tenant or user not found" in str(e):
                    # Region is definitely wrong
                    print(f"⏭️ {region} no es el correcto (Tenant not found)")
                    break
                else:
                    print(f"❌ Fallo en {region}: {e}")
        
        if success:
            break

if __name__ == "__main__":
    run()
