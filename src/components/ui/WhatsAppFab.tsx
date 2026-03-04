"use client";

import { trackWhatsAppClick } from "@/lib/analytics";
import { buildCtwaUrl } from "@/lib/ctwa";

export default function WhatsAppFab() {
    const handleClick = () => {
        trackWhatsAppClick("fab");
        window.open(buildCtwaUrl({ method: "fab" }), "_blank", "noopener,noreferrer");
    };

    return (
        <button
            onClick={handleClick}
            aria-label="Chatear con un bróker de FBS por WhatsApp"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-[#25D366] to-[#128C7E] rounded-full shadow-fab-glow fab-float hover:scale-110 active:scale-95 transition-transform group"
        >
            <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
            <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M12.031 6.062c-3.411 0-6.188 2.777-6.188 6.189 0 1.094.286 2.121.788 3.012l-.84 3.067 3.138-.823c.855.466 1.83.733 2.87.733 3.411 0 6.188-2.777 6.188-6.189 0-3.412-2.777-6.189-6.316-6.189zm3.504 8.721c-.146.411-.733.754-1.014.801-.271.047-.611.084-2.261-.595-2.112-.867-3.472-3.013-3.578-3.153-.106-.141-.861-1.144-.861-2.185 0-1.041.529-1.553.719-1.767.19-.214.417-.267.556-.267.139 0 .278.001.396.007.126.006.294-.047.46.353.172.411.581 1.411.632 1.516.052.106.087.229.016.371-.07.141-.106.229-.211.353-.106.124-.223.277-.318.371-.106.106-.216.222-.093.435.123.213.548.904 1.176 1.463.809.72 1.488.943 1.697 1.05.209.106.33-.088.452-.231.118-.141.503-.585.641-.786.139-.201.278-.17.47-.1.19.071 1.21.571 1.418.675.209.106.348.159.398.246.051.088.051.512-.095.923z" />
            </svg>
        </button>
    );
}
