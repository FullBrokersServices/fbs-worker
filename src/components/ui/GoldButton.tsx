import Link from "next/link";
import { cn } from "@/lib/utils"; // I'll need to create this later or just use standard join
import { ReactNode } from "react";

interface GoldButtonProps {
    children: ReactNode;
    variant?: "primary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg" | "xl";
    href?: string;
    onClick?: () => void;
    className?: string;
}

export default function GoldButton({
    children,
    variant = "primary",
    size = "md",
    href,
    onClick,
    className,
}: GoldButtonProps) {
    const baseStyles =
        "inline-flex items-center justify-center font-bold transition-all active:scale-[0.98]";

    const variants = {
        primary:
            "bg-gradient-to-r from-gold-deep via-gold-mid to-gold-light text-black shadow-gold-glow hover:brightness-110",
        outline:
            "border border-gold-deep text-gold-deep hover:bg-gold-deep/10",
        ghost: "text-gold-light hover:text-gold-deep",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm rounded-lg",
        md: "px-6 py-3 text-base rounded-xl",
        lg: "px-8 py-4 text-lg rounded-xl",
        xl: "px-10 py-5 text-xl rounded-2xl",
    };

    const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ""}`;

    if (href) {
        return (
            <Link href={href} className={combinedClasses}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={combinedClasses}>
            {children}
        </button>
    );
}
