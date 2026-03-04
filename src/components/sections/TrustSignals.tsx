"use client";

import { useTranslations } from "next-intl";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function TrustSignals() {
    const t = useTranslations("Trust");

    const badges = [
        {
            title: t("b1_title"),
            sub: t("b1_sub"),
            icon: (
                <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
        },
        {
            title: t("b2_title"),
            sub: t("b2_sub"),
            icon: (
                <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
            ),
        },
        {
            title: t("b3_title"),
            sub: t("b3_sub"),
            icon: (
                <svg className="w-8 h-8 text-gold-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
        },
        {
            title: t("b4_title"),
            sub: t("b4_sub"),
            icon: (
                <svg className="w-8 h-8 text-gold-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
            ),
        },
    ];

    return (
        <section className="py-24 relative z-10">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Giant Verified Ops Counter */}
                <div className="text-center mb-20 relative">
                    <div className="absolute inset-0 bg-gold-radial opacity-20 blur-[100px] rounded-full pointer-events-none" />
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-deep via-gold-light to-gold-deep tracking-tight mb-4 inline-block drop-shadow-[0_0_15px_rgba(191,151,57,0.3)]">
                        <AnimatedCounter value={12500} prefix="+" suffix=" Ops Verificadas" duration={2.5} />
                    </h2>
                    <div className="flex items-center justify-center gap-2 text-green-400 font-bold uppercase tracking-widest text-sm">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                        </span>
                        <span>Cambiados sin problemas</span>
                    </div>
                </div>

                {/* 4 Compliance Badges */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {badges.map((badge, index) => (
                        <div
                            key={index}
                            className="bg-surface-alt/80 border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center hover:bg-white/5 hover:border-gold-deep/30 transition-all duration-300"
                        >
                            <div className="w-16 h-16 rounded-full bg-black/50 border border-white/5 flex items-center justify-center mb-4 shadow-inner">
                                {badge.icon}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">
                                {badge.title}
                            </h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                {badge.sub}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-16 text-center text-slate-500 text-sm font-medium">
                    <p>{t("footerNote")}</p>
                </div>

            </div>
        </section>
    );
}
