"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

export default function FaqSection() {
    const t = useTranslations("Faq");
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        { q: t("q1"), a: t("a1") },
        { q: t("q2"), a: t("a2") },
        { q: t("q3"), a: t("a3") },
        { q: t("q4"), a: t("a4") },
    ];

    return (
        <section className="py-24 relative z-10 bg-surface">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-16 tracking-tight">
                    {t("title")}
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen
                                    ? "bg-surface-alt border-gold-deep/30 shadow-gold-glow"
                                    : "bg-black/40 border-white/5 hover:border-white/20"
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                    aria-expanded={isOpen}
                                >
                                    <span className={`font-bold text-lg leading-snug pr-8 transition-colors ${isOpen ? "text-gold-light" : "text-white"}`}>
                                        {faq.q}
                                    </span>
                                    <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : "bg-white/5"
                                        }`}>
                                        {isOpen ? (
                                            <svg className="w-4 h-4 text-gold-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        )}
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 pt-0 text-slate-400 text-base md:text-lg leading-relaxed border-t border-white/5 mt-4">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
