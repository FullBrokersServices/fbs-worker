"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { fetchRates, formatCop, formatUsdt, Rates, CALC_CONFIG } from "@/lib/rates";
import { buildCtwaUrl } from "@/lib/ctwa";
import { trackWhatsAppClick } from "@/lib/analytics";
import GoldButton from "@/components/ui/GoldButton";
import GlassCard from "@/components/ui/GlassCard";

type InputCurrency = "USD" | "EUR";
type OutputCurrency = "COP" | "USDT";
type RouteMethod = "wire" | "ach" | "sepa";

export default function QuoteCalculator() {
    const t = useTranslations("Hero");

    const [amount, setAmount] = useState<number | "">("");
    const [fromCurrency, setFromCurrency] = useState<InputCurrency>("USD");
    const [toCurrency, setToCurrency] = useState<OutputCurrency>("COP");
    const [routeMethod, setRouteMethod] = useState<RouteMethod>("wire");

    const [rates, setRates] = useState<Rates | null>(null);
    const [loading, setLoading] = useState(true);

    // Initial load & Polling (US15)
    useEffect(() => {
        let isMounted = true;
        async function load() {
            const data = await fetchRates();
            if (isMounted) {
                setRates(data);
                setLoading(false);
            }
        }
        load();
        const interval = setInterval(load, 5000); // 5 seconds polling per US15
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    // Set default route method based on input currency
    useEffect(() => {
        if (fromCurrency === "EUR") setRouteMethod("sepa");
        if (fromCurrency === "USD" && routeMethod === "sepa") setRouteMethod("wire");
    }, [fromCurrency, routeMethod]);

    // Math Engine Logic
    const calculation = useMemo(() => {
        const numAmount = Number(amount) || 0;

        // Return 0 if below minimum or empty
        if (numAmount < 500) return { netAmount: 0, usdBase: 0, customQuote: true };

        if (!rates) return { netAmount: 0, usdBase: 0, customQuote: false };

        // 1. Calculate USD Base (US23)
        let usdBase = numAmount;
        if (fromCurrency === "EUR") {
            // User sells EUR to get USD (Dasbanq rate logic)
            // Note: Our API returns eurUsd (1 EUR = X USD)
            usdBase = numAmount * rates.eurUsd;
        }

        // 2. Deduct Rail Fees (fixed USD) (US27, US28)
        const railFee = CALC_CONFIG.fees[routeMethod];
        let netUsd = usdBase - railFee;
        if (netUsd < 0) netUsd = 0;

        // Custom Quote for large amounts (US26)
        if (usdBase > 3000) return { netAmount: 0, usdBase, customQuote: true };

        // 3. Deduct International Commission (US24, US25)
        let intlFeePct = 0;
        if (usdBase >= 100 && usdBase <= 1000) intlFeePct = CALC_CONFIG.tiers.tier1;
        else if (usdBase > 1000 && usdBase <= 3000) intlFeePct = CALC_CONFIG.tiers.tier2;

        netUsd = netUsd - (netUsd * intlFeePct);

        // 4. Calculate Final Output
        let netAmount = 0;

        if (toCurrency === "COP") {
            // (US19, US20)
            const baseCop = netUsd * rates.usdCop;
            let copFee = 0;
            if (usdBase >= 1000 && usdBase <= 5000) {
                copFee = (baseCop * CALC_CONFIG.colombia.dispPct) + CALC_CONFIG.colombia.dispFijo;
            } else if (usdBase > 5000) {
                copFee = CALC_CONFIG.colombia.dispFijoAlto;
            }
            netAmount = baseCop - copFee;
        } else if (toCurrency === "USDT") {
            // (US29, US30)
            const cryptoFee = netUsd * CALC_CONFIG.fees.crypto;
            netAmount = (netUsd - cryptoFee) * rates.usdtUsd;
        }

        return { netAmount: Math.max(0, netAmount), usdBase, customQuote: false };
    }, [amount, fromCurrency, toCurrency, routeMethod, rates]);

    const handleSwap = () => {
        setFromCurrency(prev => (prev === "USD" ? "EUR" : "USD"));
    };

    const handleCtaClick = () => {
        const numAmount = Number(amount) || 0;
        trackWhatsAppClick("calculator", "direct", numAmount);
        const url = buildCtwaUrl({
            amount: numAmount,
            from: fromCurrency,
            to: toCurrency,
            method: "calculator"
        });
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val === "") {
            setAmount("");
            return;
        }
        const num = Number(val);
        if (!isNaN(num)) setAmount(num);
    };

    // Auto-correct on blur (US07)
    const handleBlur = () => {
        const num = Number(amount);
        if (num > 0 && num < 500) setAmount(500);
    };

    return (
        <GlassCard className="max-w-md w-full mx-auto" hoverGold>
            <div className="space-y-6">

                {/* Input Section */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">
                        Tú envías
                    </label>
                    <div className="relative group">
                        <input
                            type="number"
                            value={amount}
                            onChange={handleAmountChange}
                            onBlur={handleBlur}
                            placeholder="Mínimo 500"
                            className="w-full bg-surface-alt border border-white/5 rounded-2xl py-4 pl-4 pr-32 text-2xl font-bold text-white focus:outline-none focus:border-gold-deep/50 transition-colors"
                        />
                        <div className="absolute right-2 top-2 bottom-2 flex gap-1">
                            <select
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value as InputCurrency)}
                                className="bg-black border border-white/10 rounded-xl px-2 text-sm font-bold text-gold-light focus:outline-none cursor-pointer"
                            >
                                <option value="USD">🇺🇸 USD</option>
                                <option value="EUR">🇪🇺 EUR</option>
                            </select>
                        </div>
                    </div>

                    {/* Route Method Selector */}
                    <div className="flex justify-end px-1">
                        <select
                            value={routeMethod}
                            onChange={(e) => setRouteMethod(e.target.value as RouteMethod)}
                            className="bg-transparent text-xs text-slate-400 font-medium focus:outline-none cursor-pointer hover:text-white"
                        >
                            {fromCurrency === "USD" ? (
                                <>
                                    <option value="wire">Vía Wire Transfer</option>
                                    <option value="ach">Vía ACH</option>
                                </>
                            ) : (
                                <option value="sepa">Vía SEPA Instant</option>
                            )}
                        </select>
                    </div>
                </div>

                {/* Swap Flow */}
                <div className="flex justify-center -my-5 relative z-10">
                    <button
                        onClick={handleSwap}
                        className="w-10 h-10 bg-gradient-to-br from-gold-deep to-gold-mid rounded-full flex items-center justify-center text-black hover:rotate-180 hover:scale-105 active:scale-95 transition-all duration-300 shadow-gold-glow"
                    >
                        <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                    </button>
                </div>

                {/* Output Section */}
                <div className="space-y-2">
                    <div className="flex justify-between px-1 items-end">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest group relative cursor-help">
                            Ellos reciben <span className="border-b border-dashed border-slate-500">Neto</span>
                            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-white/10 p-2 rounded text-[10px] text-slate-300 -top-10 left-0 w-48 shadow-lg z-20 pointer-events-none">
                                Todas las comisiones incluidas — Lo que ves es lo que llega.
                            </div>
                        </label>
                    </div>

                    <div className="relative">
                        <div className="w-full bg-black border border-gold-deep/20 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] rounded-2xl py-4 pl-4 pr-32 text-2xl font-bold flex items-center h-[66px] overflow-hidden">
                            {loading ? (
                                <span className="animate-pulse text-gold-deep/50">Calculando...</span>
                            ) : calculation.customQuote ? (
                                <span className="text-lg text-gold-light italic">Tasa Preferencial Vip</span>
                            ) : (
                                <span className="text-gold-light animate-fade-in truncate">
                                    {toCurrency === "COP"
                                        ? formatCop(calculation.netAmount)
                                        : formatUsdt(calculation.netAmount)
                                    }
                                </span>
                            )}
                        </div>
                        <div className="absolute right-2 top-2 bottom-2 flex gap-1">
                            <select
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value as OutputCurrency)}
                                className="bg-surface-alt border border-white/10 rounded-xl px-2 text-sm font-bold text-gold-light focus:outline-none cursor-pointer hover:bg-white/5"
                            >
                                <option value="COP">🇨🇴 COP</option>
                                <option value="USDT">₮ USDT</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Info Bar */}
                <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                    <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping absolute" />
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 relative" />
                            <span className="text-[9px] text-green-400 font-bold uppercase tracking-widest">
                                Live Data
                            </span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium text-right">
                            {calculation.customQuote
                                ? "Monto aplicable a mesa OTC"
                                : `Base rate: ~${formatCop(rates?.usdCop || 3850)} COP`}
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <GoldButton onClick={handleCtaClick} size="lg" className="w-full text-sm tracking-wider">
                    {calculation.customQuote ? "SOLICITAR COTIZACIÓN VIP →" : "📉 INICIAR TRANSFERENCIA →"}
                </GoldButton>

            </div>
        </GlassCard>
    );
}
