"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { buildCtwaUrl } from "@/lib/ctwa";
import { trackWhatsAppClick } from "@/lib/analytics";

export default function Archetypes() {
    const t = useTranslations("Archetypes");
    const [activeTab, setActiveTab] = useState(1);

    const archetypes = [
        {
            id: 1,
            name: t("t1_title"),
            icon: (
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            headline: t("t1_head"),
            body: t("t1_body"),
            cta: t("t1_cta"),
            utm: "freelancer",
        },
        {
            id: 2,
            name: t("t2_title"),
            icon: (
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
            ),
            headline: t("t2_head"),
            body: t("t2_body"),
            cta: t("t2_cta"),
            utm: "estudiante",
        },
        {
            id: 3,
            name: t("t3_title"),
            icon: (
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            headline: t("t3_head"),
            body: t("t3_body"),
            cta: t("t3_cta"),
            utm: "migrante",
        },
        {
            id: 4,
            name: t("t4_title"),
            icon: (
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            headline: t("t4_head"),
            body: t("t4_body"),
            cta: t("t4_cta"),
            utm: "pyme",
        },
        {
            id: 5,
            name: t("t5_title"),
            icon: (
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
            ),
            headline: t("t5_head"),
            body: t("t5_body"),
            cta: t("t5_cta"),
            utm: "trader",
        },
    ];

    const activeContent = archetypes.find((a) => a.id === activeTab);

    const handleCtaClick = () => {
        if (!activeContent) return;
        trackWhatsAppClick("archetype", activeContent.utm);
        const url = buildCtwaUrl({ archetype: activeContent.utm });
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <section className="py-24 relative z-10 bg-black/40 border-y border-white/5">
            <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-16 tracking-tight">
                    {t("title")}
                </h2>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                    {/* Tab List */}
                    <div className="lg:w-1/3 flex flex-col gap-2">
                        {archetypes.map((a) => (
                            <button
                                key={a.id}
                                onClick={() => setActiveTab(a.id)}
                                className={`flex items-center gap-3 p-4 rounded-2xl text-left border transition-all duration-300 ${activeTab === a.id
                                        ? "bg-gold-deep/10 border-gold-deep/40 text-white shadow-[inset_4px_0_0_0_#BF9739]"
                                        : "bg-surface-alt/50 border-white/5 text-slate-400 hover:bg-white/5 hover:text-slate-200"
                                    }`}
                            >
                                <div className={activeTab === a.id ? "text-gold-light" : "text-slate-500"}>
                                    {a.icon}
                                </div>
                                <span className="font-bold text-sm">{a.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Tab Content Panel */}
                    <div className="lg:w-2/3">
                        {activeContent && (
                            <div
                                key={activeContent.id}
                                className="animate-count-up glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden"
                            >
                                {/* Decorative blob inside card */}
                                <div className="absolute -top-32 -right-32 w-64 h-64 bg-gold-deep/20 rounded-full blur-[80px]" />

                                <div className="relative z-10 space-y-6">
                                    <div className="text-gold-light mb-8">
                                        {/* Larger version of the active icon */}
                                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            {activeContent.icon.props.children}
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                                        {activeContent.headline}
                                    </h3>
                                    <p className="text-base text-slate-400 leading-relaxed md:text-lg">
                                        {activeContent.body}
                                    </p>
                                    <div className="pt-6">
                                        <button
                                            onClick={handleCtaClick}
                                            className="inline-flex items-center gap-2 text-gold-deep font-bold hover:text-gold-light hover:gap-3 transition-all uppercase tracking-widest text-sm"
                                        >
                                            {activeContent.cta}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
