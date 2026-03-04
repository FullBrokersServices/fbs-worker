"use client";

import { useEffect, useState, useRef } from "react";
import { animate, useInView } from "framer-motion";

interface AnimatedCounterProps {
    value: number;
    prefix?: string;
    suffix?: string;
    duration?: number;
    className?: string;
}

export default function AnimatedCounter({
    value,
    prefix = "",
    suffix = "",
    duration = 2,
    className = ""
}: AnimatedCounterProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            const controls = animate(0, value, {
                duration: duration,
                ease: "easeOut",
                onUpdate(value) {
                    setDisplayValue(Math.round(value));
                },
            });

            return () => controls.stop();
        }
    }, [isInView, value, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}
            {displayValue.toLocaleString()}
            {suffix}
        </span>
    );
}

