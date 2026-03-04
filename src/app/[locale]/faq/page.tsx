import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Preguntas Frecuentes | FBS",
    description: "Resolvemos tus dudas sobre cambio de divisas, tiempos, legalidad y comisiones.",
};

export default function FaqPage() {
    return <main className="pt-32 px-4 text-center"><h1>FAQ</h1></main>;
}
