/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
        fbq?: (...args: any[]) => void;
    }
}

export function trackWhatsAppClick(
    method: string,
    archetype?: string,
    amount?: number
): void {
    // GA4
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "whatsapp_click", {
            method,
            archetype: archetype || "general",
            amount: amount || 0,
        });
    }

    // Meta Pixel
    if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Contact", {
            method,
            archetype: archetype || "general",
        });
    }
}

export function trackPageView(pagePath: string): void {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "page_view", {
            page_path: pagePath,
        });
    }
}
