"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function HeroAnimatedHook() {
    const t = useTranslations("Hero");

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-gold-deep/30 bg-gold-deep/10 px-4 py-1.5 mx-auto mb-6"
            >
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-xs font-bold text-gold-light uppercase tracking-widest">
                    {t("eyebrow")}
                </span>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-4"
            >
                <h1 className="text-5xl md:text-8xl font-black leading-[0.95] tracking-tight text-white mb-2">
                    {t("headline")}
                </h1>
                <p className="text-3xl md:text-5xl font-[family-name:var(--font-playfair)] italic text-gradient-gold">
                    {t("subline")}
                </p>
            </motion.div>
        </>
    );
}
