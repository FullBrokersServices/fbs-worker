"use client";

import { useTranslations } from "next-intl";
import { buildCtwaUrl } from "@/lib/ctwa";
import { trackWhatsAppClick } from "@/lib/analytics";

export default function FinalCta() {
    const t = useTranslations("FinalCta");

    const handleClick = () => {
        trackWhatsAppClick("final_cta");
        window.open(buildCtwaUrl({ method: "final_cta" }), "_blank", "noopener,noreferrer");
    };

    return (
        <section className="py-32 relative z-10 overflow-hidden">
            {/* Radial Gold Background Map */}
            <div className="absolute inset-0 bg-gold-radial opacity-10 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 drop-shadow-[0_0_20px_rgba(191,151,57,0.3)]">
                    {t("title")}
                </h2>

                <p className="text-xl md:text-3xl font-[family-name:var(--font-playfair)] italic text-gradient-gold mb-12">
                    {t("subtitle")}
                </p>

                <div className="flex flex-col items-center justify-center gap-6">
                    <button
                        onClick={handleClick}
                        className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-gold-deep via-gold-mid to-gold-light text-black font-black text-xl md:text-2xl rounded-2xl shadow-[0_0_40px_rgba(191,151,57,0.4)] hover:brightness-110 active:scale-[0.98] transition-all"
                    >
                        <span className="relative flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-900 opacity-75" />
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-800" />
                        </span>
                        {t("button")}
                    </button>

                    <div className="flex items-center gap-2 text-slate-400 font-medium bg-white/5 px-4 py-2 rounded-full border border-white/10">
                        <svg className="w-5 h-5 text-gold-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{t("note")}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
