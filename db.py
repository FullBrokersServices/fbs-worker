import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

class DatabaseSingleton:
    _instance = None
    _client = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DatabaseSingleton, cls).__new__(cls)
            cls._initialize_client()
        return cls._instance

    @classmethod
    def _initialize_client(cls):
        url = os.getenv("SUPABASE_URL")
        key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
        
        if not url or not key:
            raise ValueError("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env")
            
        cls._client = create_client(url, key)

    @property
    def client(self) -> Client:
        return self._client

# Instancia global para ser importada
db_instance = DatabaseSingleton()
supabase_client = db_instance.client
