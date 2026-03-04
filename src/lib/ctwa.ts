interface CtwaParams {
    amount?: number;
    from?: string;
    to?: string;
    archetype?: string;
    method?: string;
}

export function buildCtwaUrl({
    amount,
    from = "USD",
    to = "COP",
    archetype,
    method = "general",
}: CtwaParams = {}): string {
    const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || "+573001234567";

    const parts: string[] = ["Hola, quiero cotizar con FBS."];
    if (amount && from && to) {
        parts[0] = `Hola, quiero cotizar ${amount.toLocaleString("es-CO")} ${from} → ${to}`;
    }

    const text = encodeURIComponent(parts.join(" "));
    const utmSource = "fbs_web";
    const utmMedium = "landing";
    const utmCampaign = method;
    const utmContent = archetype || "general";

    return `https://wa.me/${waNumber.replace(/\+/g, "")}?text=${text}&utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}&utm_content=${utmContent}`;
}
