import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Servicios de Cambio de Divisas | FBS",
    description: "Conoce todos nuestros servicios de cambio: USD/EUR a COP/USDT via Wire y SEPA Instant.",
};

export default function ServiciosPage() {
    return <main className="pt-32 px-4 text-center"><h1>Servicios</h1></main>;
}
