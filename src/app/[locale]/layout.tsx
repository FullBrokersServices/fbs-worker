import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { Manrope, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import WhatsAppFab from "@/components/ui/WhatsAppFab";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { financialProductSchema, localBusinessSchema } from "@/lib/schema";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fbsbroker.com"),
  title: {
    default: "FBS | Cambio de Divisas USD·EUR a COP·USDT",
    template: "%s | FBS Full Broker Services",
  },
  description:
    "¿Cómo enviar dólares o euros a Colombia? FBS convierte USD/EUR a pesos colombianos o USDT en horas, sin bancos intermediarios. Atención 24/7 por WhatsApp.",
  openGraph: {
    locale: "es_CO",
    type: "website",
    siteName: "Full Broker Services",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(financialProductSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body
        className={`${manrope.variable} ${playfair.variable} bg-void text-white antialiased selection:bg-gold-deep selection:text-black overflow-x-hidden min-h-screen flex flex-col relative`}
      >
        <NextIntlClientProvider messages={messages}>
          {/* Main content */}
          <Navbar />
          <div className="relative z-10 flex-1">{children}</div>
          <Footer />

          <WhatsAppFab />

          {/* Analytics — GA4 */}
          {process.env.NEXT_PUBLIC_GA_ID && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                strategy="afterInteractive"
              />
              <Script id="ga4-init" strategy="afterInteractive">
                {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`}
              </Script>
            </>
          )}

          {/* Analytics — Meta Pixel */}
          {
            process.env.NEXT_PUBLIC_META_PIXEL_ID && (
              <Script id="meta-pixel" strategy="afterInteractive">
                {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${process.env.NEXT_PUBLIC_META_PIXEL_ID}');fbq('track','PageView');`}
              </Script>
            )
          }
        </NextIntlClientProvider >
      </body >
    </html >
  );
}
