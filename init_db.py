import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

DB_URL = os.getenv("DATABASE_URL")

def run_migrations():
    if not DB_URL:
        print("❌ Error: DATABASE_URL no encontrada en .env")
        return

    # Usar ruta absoluta para buscar el archivo SQL
    sql_path = os.path.join(os.path.dirname(__file__), "migrations", "20260305_init_harvester.sql")
    
    if not os.path.exists(sql_path):
        print(f"❌ Error: Archivo de migración no encontrado en {sql_path}")
        return

    print("🔌 Conectando a Supabase PostgreSQL...")
    try:
        conn = psycopg2.connect(DB_URL)
        conn.autocommit = True
        cur = conn.cursor()
        
        with open(sql_path, "r", encoding="utf-8") as f:
            sql_script = f.read()

        print("🚀 Ejecutando script de migración...")
        cur.execute(sql_script)
        print("✅ Migración completada con éxito.")
        
    except Exception as e:
        print(f"❌ Error ejecutando migración: {e}")
    finally:
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()
        print("🔒 Conexión cerrada.")

if __name__ == "__main__":
    run_migrations()
