"use client";

import { useEffect, useState } from "react";
import { fetchRates, Rates } from "@/lib/rates";

export default function CurrencyTicker() {
    const [rates, setRates] = useState<Rates | null>(null);

    useEffect(() => {
        async function load() {
            const data = await fetchRates();
            setRates(data);
        }
        load();
        const interval = setInterval(load, 300000);
        return () => clearInterval(interval);
    }, []);

    // In the new Dasbanq logic, we don't return eurCop directly, we calculate it
    const calcEurCop = () => {
        if (!rates) return 4400; // fallback
        return Math.floor(rates.usdCop * rates.eurUsd);
    };

    const pairs = [
        { name: "USD/COP", value: rates?.usdCop || 4050, sign: "$" },
        { name: "EUR/COP", value: calcEurCop(), sign: "€" },
        { name: "USDT/COP", value: rates?.usdCop || 4050, sign: "₮" },
        { name: "EUR/USD", value: rates?.eurUsd || 1.08, sign: "€" },
        { name: "BTC/USD", value: 95000, sign: "₿" }, // Example static for effect
    ];

    return (
        <div className="w-full bg-surface-alt/50 border-y border-white/5 py-2 overflow-hidden whitespace-nowrap">
            <div className="flex animate-marquee hover:[animation-play-state:paused] w-max">
                {/* Render twice for continuous loop */}
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex gap-12 px-6">
                        {pairs.map((pair) => (
                            <div key={pair.name} className="flex items-center gap-2 group cursor-default">
                                <span className="text-[10px] font-bold text-slate-500 group-hover:text-gold-light transition-colors">
                                    {pair.name}
                                </span>
                                <span className="text-xs font-black text-white group-hover:text-gradient-gold">
                                    {pair.sign} {pair.value.toLocaleString()}
                                </span>
                                {/* Arrow indicator */}
                                <span className="text-[8px] text-green-500">▲</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
