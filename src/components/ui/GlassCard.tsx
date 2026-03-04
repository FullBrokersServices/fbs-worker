import { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hoverGold?: boolean;
}

export default function GlassCard({
    children,
    className,
    hoverGold = false,
}: GlassCardProps) {
    return (
        <div
            className={`glass-panel rounded-3xl p-6 ${hoverGold
                    ? "hover:border-gold-deep/40 hover:shadow-gold-glow transition-all duration-300"
                    : ""
                } ${className || ""}`}
        >
            {children}
        </div>
    );
}
