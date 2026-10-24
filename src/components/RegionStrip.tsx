/** One-line strip near "How It Works". TODO: confirm UK client(s) before publishing the UK mention (see CLAIMS_LOG.md). */
export default function RegionStrip() {
    return (
        <div className="relative z-20 bg-black text-white border-y-[4px] border-black py-3 px-6 text-center">
            <p className="text-[11px] sm:text-xs font-black uppercase tracking-[0.2em]">
                Serving clients across India <span aria-hidden="true">🇮🇳</span>, the US <span aria-hidden="true">🇺🇸</span>, and the UK <span aria-hidden="true">🇬🇧</span>
            </p>
        </div>
    );
}
