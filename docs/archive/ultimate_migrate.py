import os
import psycopg2
from psycopg2 import sql
import subprocess
import re

# Credentials
PROJECT_REF = "eohzuleozwvmiupylixf"
PASSWORD = "Siempre.fullbrokersservices26"
SQL_FILE = os.path.join("worker-python", "migrations", "20260305_init_harvester.sql")

# Likely regions near Colombia/BOG
REGIONS = ["us-east-1", "sa-east-1", "us-west-2", "eu-central-1"]

def get_sql():
    if not os.path.exists(SQL_FILE):
        return None
    with open(SQL_FILE, 'r', encoding='utf-8') as f:
        return f.read()

def try_connect(host, user, use_options=False):
    params = {
        "host": host,
        "port": 5432, # Session Pooler Port
        "user": user,
        "password": PASSWORD,
        "dbname": "postgres",
        "connect_timeout": 5
    }
    if use_options:
        params["options"] = f"-c project={PROJECT_REF}"
    
    try:
        conn = psycopg2.connect(**params)
        return conn
    except Exception as e:
        return str(e)

def run():
    sql_script = get_sql()
    if not sql_script:
        print("❌ SQL file not found.")
        return

    print(f"🚀 Starting Local Migration (Session Pooler Protocol)...")
    
    for region in REGIONS:
        host = f"aws-0-{region}.pooler.supabase.com"
        print(f"🔍 Testing Region: {region}...")
        
        # Test Format 1: postgres.REF
        user1 = f"postgres.{PROJECT_REF}"
        print(f"  - Trying format: {user1}")
        result = try_connect(host, user1)
        if isinstance(result, psycopg2.extensions.connection):
            execute_and_finish(result, sql_script)
            return

        # Test Format 2: options=project=REF
        user2 = "postgres"
        print(f"  - Trying format: {user2} + options=project={PROJECT_REF}")
        result = try_connect(host, user2, use_options=True)
        if isinstance(result, psycopg2.extensions.connection):
            execute_and_finish(result, sql_script)
            return
            
        print(f"  ❌ {region} failed.")

    print("⚠️ All automated local paths failed. Port 5432 might be blocked on this network.")

def execute_and_finish(conn, script):
    print("✅ Connection established! Applying SQL...")
    try:
        conn.autocommit = True
        cur = conn.cursor()
        cur.execute(script)
        print("🎉 MIGRATION SUCCESSFUL! Database is ready.")
        cur.close()
    except Exception as e:
        print(f"❌ Error executing SQL: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    run()
