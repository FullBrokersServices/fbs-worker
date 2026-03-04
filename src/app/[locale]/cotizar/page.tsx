import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cotizar Divisas en Tiempo Real | FBS",
    description: "Usa nuestra calculadora para obtener la mejor tasa USD/EUR a COP/USDT al instante.",
};

export default function CotizarPage() {
    return <main className="pt-32 px-4 text-center"><h1>Cotizar</h1></main>;
}
