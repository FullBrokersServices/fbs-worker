"use client";

import { motion } from "framer-motion";

export default function SlideInWrapper({
    children,
    className = "",
    direction = "left",
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    direction?: "left" | "right";
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: direction === "left" ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
