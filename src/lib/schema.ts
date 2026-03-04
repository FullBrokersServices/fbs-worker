export const financialProductSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "Servicio de Cambio de Divisas Full Broker Services",
    "description": "Conversión rápida de USD y EUR a Pesos Colombianos (COP) o USDT sin bancos intermediarios. Ejecución inmediata vía WhatsApp.",
    "brand": {
        "@type": "Brand",
        "name": "Full Broker Services (FBS)"
    },
    "areaServed": [
        { "@type": "Country", "name": "Colombia" },
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "Spain" }
    ],
    "category": "Currency Exchange",
    "provider": {
        "@type": "LocalBusiness",
        "name": "Full Broker Services",
        "image": "https://fbsbroker.com/logo.png",
        "priceRange": "$$$"
    },
    "url": "https://fbsbroker.com",
};

export const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Full Broker Services",
    "image": "https://fbsbroker.com/logo.png",
    "description": "Broker especializado en transferencias internacionales, OTC y liquidación de divisas desde EE.UU. y Europa hacia Colombia.",
    "url": "https://fbsbroker.com",
    "telephone": "+573000000000",
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
        }
    ]
};
