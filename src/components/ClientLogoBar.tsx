import ClientLogo from "@/components/us/ClientLogo";

/**
 * Logo strip directly under the hero: a mix of US and India clients.
 * Maps each brand to its real logo file in /public/clients where one exists;
 * remaining brands keep a text treatment until their logo is supplied.
 */
const LOGOS: { name: string; src?: string; market: "US" | "IN" }[] = [
    { name: "Atoms Electrical Co.", src: "/clients/clientlogo (9).png", market: "US" },
    { name: "GSP Electricians & Building", src: "/clients/clientlogo (8).png", market: "US" },
    { name: "Letters to Ron", src: "/clients/clientlogo (5).png", market: "US" },
    { name: "Dinanath's", src: "/clients/clientlogo (3).png", market: "IN" },
    { name: "GharDazzle", src: "/clients/clientlogo (6).png", market: "IN" },
    { name: "ALFA", src: "/clients/clientLogo (2).png", market: "IN" },
    { name: "Keshav Sales Corp", src: "/clients/client logo (10).png", market: "IN" },
    { name: "Dr. Cicil Smile Center", src: "/clients/clientlogo (4).png", market: "IN" },
    { name: "Goodlife Diagnostics", market: "IN" },
    { name: "Air Right", market: "IN" },
];

export default function ClientLogoBar() {
    return (
        <section aria-label="Clients" className="relative z-20 bg-white border-y-[4px] border-black py-8 md:py-10 overflow-hidden">
            <div className="container mx-auto px-6">
                <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] mb-6 md:mb-8 text-black/60">
                    Trusted by brands in India and the US
                </p>

                {/* Animated marquee: duplicate the set so it loops seamlessly */}
                <div className="relative">
                    <div className="flex gap-3 md:gap-5 animate-marquee whitespace-nowrap">
                        {[...LOGOS, ...LOGOS].map((l, i) => (
                            <div key={`${l.name}-${i}`} className="flex-shrink-0">
                                <ClientLogo name={l.name} src={l.src} />
                            </div>
                        ))}
                    </div>

                    {/* Edge fade masks */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-white to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-white to-transparent" />
                </div>
            </div>
        </section>
    );
}
