import httpx

URL = "https://eohzuleozwvmiupylixf.supabase.co/rest/v1/"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvaHp1bGVvend2bWl1cHlsaXhmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjY3MTA2OSwiZXhwIjoyMDg4MjQ3MDY5fQ.zb_6mHdREJVdcygb4Edcy64TPsck7DlmoShIxIBsrc4"

def probe():
    print(f"🔍 Probing {URL}...")
    headers = {"apikey": KEY, "Authorization": f"Bearer {KEY}"}
    try:
        with httpx.Client() as client:
            resp = client.get(URL, headers=headers)
            print(f"✅ Status: {resp.status_code}")
            print("📜 Headers:")
            for k, v in resp.headers.items():
                print(f"  {k}: {v}")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    probe()
