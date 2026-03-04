import { useTranslations } from "next-intl";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function StatsBar() {
    const t = useTranslations("Stats");

    const stats = [
        { valueLabel: t("vol"), label: t("volLabel"), numValue: 50, prefix: "+", suffix: "M USD" },
        { valueLabel: t("ops"), label: t("opsLabel"), numValue: 12000, prefix: "+", suffix: "" },
        { valueLabel: t("time"), label: t("timeLabel"), numValue: 15, prefix: "", suffix: " min" },
        { valueLabel: t("support"), label: t("supportLabel"), isText: true },
    ];

    return (
        <section className="w-full bg-black/60 border-y border-gold-deep/10 relative z-10 backdrop-blur-md">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5 border-x border-white/5">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center p-8 text-center"
                        >
                            <h3 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tighter hover:text-gradient-gold transition-colors duration-300">
                                {stat.isText ? (
                                    stat.valueLabel
                                ) : (
                                    <AnimatedCounter
                                        value={stat.numValue || 0}
                                        prefix={stat.prefix}
                                        suffix={stat.suffix}
                                    />
                                )}
                            </h3>
                            <p className="text-xs md:text-sm text-slate-400 font-medium uppercase tracking-widest">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
