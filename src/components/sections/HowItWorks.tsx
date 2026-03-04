"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";

export default function HowItWorks() {
    const t = useTranslations("HowItWorks");

    const steps = [
        {
            title: t("step1"),
            body: t("step1Body"),
            icon: (
                <svg className="w-8 h-8 text-gold-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
        },
        {
            title: t("step2"),
            body: t("step2Body"),
            icon: (
                <svg className="w-8 h-8 text-gold-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            ),
        },
        {
            title: t("step3"),
            body: t("step3Body"),
            icon: (
                <svg className="w-8 h-8 text-gold-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
    ];

    return (
        <section className="py-24 relative z-10">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="w-16 h-px bg-gold-deep mx-auto mb-6" />
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                        {t("title")}
                    </h2>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                {/* 3 Steps */}
                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-gold-deep/30 to-transparent z-0" />

                    {steps.map((step, i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                            <div className="w-24 h-24 mb-6 rounded-full bg-surface-alt border border-white/10 flex items-center justify-center group-hover:border-gold-deep/40 group-hover:shadow-gold-glow transition-all duration-300">
                                {step.icon}
                            </div>
                            <GlassCard hoverGold className="w-full flex-1">
                                <h3 className="text-xl font-bold text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    {step.body}
                                </p>
                            </GlassCard>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        href="/como-funciona"
                        className="inline-flex items-center text-gold-light font-bold hover:text-gold-deep hover:underline transition-colors"
                    >
                        {t("cta")}
                    </Link>
                </div>
            </div>
        </section>
    );
}
