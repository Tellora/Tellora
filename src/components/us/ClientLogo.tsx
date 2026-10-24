import Image from "next/image";

/**
 * Client logo tile. Uses the real logo file when one is supplied; otherwise renders the client
 * name as clean text in the brand heading font (no stock icons or generated logos).
 * TODO: supply logo files for clients rendered as text.
 */
export default function ClientLogo({ name, src }: { name: string; src?: string }) {
    return (
        <div
            className="h-12 sm:h-20 px-3 sm:px-5 min-w-[104px] sm:min-w-[140px] flex items-center justify-center bg-white brutalist-border shadow-[3px_3px_0px_#000]"
            title={name}
        >
            {src ? (
                <Image src={src} alt={`${name} logo`} width={160} height={64} className="max-h-12 w-auto object-contain" style={{ width: "auto", height: "auto", maxHeight: "3rem" }} />
            ) : (
                <span className="font-heading font-black uppercase tracking-tight text-[11px] sm:text-base text-black/80 text-center leading-tight">{name}</span>
            )}
        </div>
    );
}
