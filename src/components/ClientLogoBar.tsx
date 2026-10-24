import ClientLogo from "@/components/us/ClientLogo";

/**
 * Logo strip directly under the hero: a mix of US and India clients.
 * Real logo files only where clearly identified; everything else is a clean text placeholder.
 * TODO: confirm logo file mapping in public/clients and replace text placeholders.
 */
const LOGOS: { name: string; src?: string; market: "US" | "IN" }[] = [
    { name: "Atoms Electrical Co.", src: "/clients/clientlogo (9).png", market: "US" },
    { name: "US D2C Footwear Brand", market: "US" }, // anonymised; TODO: permission to name
    { name: "Goodlife Diagnostics", market: "IN" },
    { name: "Air Right", market: "IN" },
    { name: "ALFA", market: "IN" },
    { name: "Keshav Sales Corp", market: "IN" },
];

export default function ClientLogoBar() {
    return (
        <section aria-label="Clients" className="relative z-20 bg-white border-y-[4px] border-black py-6 md:py-8">
            <div className="container mx-auto px-6">
                <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] mb-5 text-black/60">
                    Trusted by brands in India and the US
                </p>
                <ul className="flex flex-wrap justify-center gap-2 md:gap-4">
                    {LOGOS.map((l) => (
                        <li key={l.name}>
                            <ClientLogo name={l.name} src={l.src} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
