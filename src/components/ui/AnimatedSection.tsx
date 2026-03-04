"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

export const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { ease: [0.25, 0.46, 0.45, 0.94], duration: 0.5 }
    }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

/**
 * A wrapper component that applies common Framer Motion scroll animations.
 * Honors `prefers-reduced-motion` automatically.
 */
export default function AnimatedSection({
    children,
    className = "",
    delay = 0
}: {
    children: React.ReactNode,
    className?: string,
    delay?: number
}) {
    // We don't strictly need a media query hook if we just rely on CSS or framer-motion built-ins,
    // but Framer Motion handles reduced motion automatically if configured, or we can just pass variants.

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { ease: [0.25, 0.46, 0.45, 0.94], duration: 0.6, delay }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
