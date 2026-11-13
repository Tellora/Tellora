import Image from "next/image";

/**
 * Client logo tile. Uses the real logo file when one is supplied; otherwise renders the client
 * name as clean text in the brand heading font (no stock icons or generated logos).
 */
export default function ClientLogo({ name, src }: { name: string; src?: string }) {
    return (
        <div
            className="h-16 sm:h-24 px-5 sm:px-8 min-w-[140px] sm:min-w-[200px] flex items-center justify-center bg-white brutalist-border shadow-[4px_4px_0px_#000] transition-all hover:translate-y-[-3px] hover:shadow-[7px_7px_0px_#A855F7]"
            title={name}
        >
            {src ? (
                <Image
                    src={src}
                    alt={`${name} logo`}
                    width={200}
                    height={96}
                    className="object-contain grayscale hover:grayscale-0 transition-all duration-500"
                    style={{ width: "auto", height: "auto", maxHeight: "100%", maxWidth: "100%" }}
                />
            ) : (
                <span className="font-heading font-black uppercase tracking-tight text-xs sm:text-sm text-black/80 text-center leading-tight">{name}</span>
            )}
        </div>
    );
}
