-- Migration: Initialize Python Harvester Tables
-- Status: Draft/Pending Execution
-- Description: Creates tables for tracking broker rates, balances, and global live rates.

BEGIN;

-- 1. Broker Rates (Exhaustive Raw Data)
CREATE TABLE IF NOT EXISTS public.broker_rates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider TEXT NOT NULL, -- 'nexxdipay', 'loopayx', 'dasbanq'
    pair TEXT NOT NULL, -- 'USDT/COP', 'EUR/USD', etc.
    rate_buy NUMERIC,
    rate_sell NUMERIC,
    raw_payload JSONB, -- Store full extracted JSON for debugging
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Broker Balances & Limits (Liquidity Management)
CREATE TABLE IF NOT EXISTS public.broker_balances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider TEXT NOT NULL,
    currency TEXT NOT NULL, -- 'USDT', 'COP', 'EUR', 'MXN'
    balance NUMERIC DEFAULT 0,
    daily_limit NUMERIC,
    remaining_limit NUMERIC,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Live Rates (Aggregated for Apps)
CREATE TABLE IF NOT EXISTS public.live_rates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    currency_pair TEXT UNIQUE NOT NULL, -- 'USDT/COP'
    final_rate NUMERIC NOT NULL,
    spread_applied NUMERIC DEFAULT 12,
    is_stale BOOLEAN DEFAULT false,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Worker Health & Logs
CREATE TABLE IF NOT EXISTS public.worker_health (
    id SERIAL PRIMARY KEY,
    last_heartbeat TIMESTAMPTZ DEFAULT now(),
    status TEXT DEFAULT 'ok', -- 'ok', 'warning', 'error'
    last_error TEXT
);

-- 5. RLS Policies
ALTER TABLE public.live_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.broker_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.broker_balances ENABLE ROW LEVEL SECURITY;

-- Policy: Anon can only read live_rates
CREATE POLICY "Anon read live rates" ON public.live_rates
    FOR SELECT USING (true);

-- Policy: Service Role has full access (Strictly for the Worker)
CREATE POLICY "Service role full access live_rates" ON public.live_rates
    TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access broker_rates" ON public.broker_rates
    TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access broker_balances" ON public.broker_balances
    TO service_role USING (true) WITH CHECK (true);

-- 6. Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_broker_rates_created ON public.broker_rates(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_live_rates_updated ON public.live_rates(updated_at DESC);

COMMIT;
