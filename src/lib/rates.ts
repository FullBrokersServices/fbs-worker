export interface Rates {
    usdCop: number;
    eurUsd: number;
    usdtUsd: number;
    updatedAt: string | null;
    fallback?: boolean;
}

const FALLBACK_RATES: Rates = {
    usdCop: 3850,
    eurUsd: 1.08,
    usdtUsd: 1,
    updatedAt: null,
    fallback: true,
};

export async function fetchRates(): Promise<Rates> {
    try {
        const res = await fetch("/api/rates", { next: { revalidate: 60 } });
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return await res.json();
    } catch {
        return FALLBACK_RATES;
    }
}

export function formatCop(value: number): string {
    return new Intl.NumberFormat("es-CO", {
        maximumFractionDigits: 0,
    }).format(Math.round(value));
}

export function formatUsdt(value: number): string {
    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

// Math Engine config as defined in calculation-data.md
export const CALC_CONFIG = {
    colombia: {
        dispPct: 0.002,     // 0.2% comisión $1K-$5K
        dispFijo: 2000,     // COP fijo $1K-$5K
        dispFijoAlto: 2400  // COP fijo >$5K
    },
    tiers: {
        tier1: 0.02,        // 2% para $100-$1K
        tier2: 0.015        // 1.5% para $1K-$3K
    },
    fees: {
        sepa: 2,            // USD fixed
        ach: 5,             // USD fixed
        wire: 25,           // USD fixed
        crypto: 0.005       // 0.5%
    }
};
