/**
 * Placeholder card shown where a results chart will go.
 * TODO: replace with a real chart once before/after data (and permission to publish it) is available.
 */
export default function ChartPlaceholder({ label, note }: { label: string; note: string }) {
    return (
        <div className="bg-white brutalist-border shadow-[4px_4px_0px_#000] p-5 flex flex-col gap-4">
            <span className="font-heading font-black uppercase text-sm tracking-wide">{label}</span>
            {/* Decorative empty chart area */}
            <div className="h-24 border-2 border-dashed border-black/30 rounded-lg flex items-end gap-2 p-3" aria-hidden="true">
                {[30, 45, 40, 60, 55, 75].map((h, i) => (
                    <div key={i} className="flex-1 bg-black/10 rounded-sm" style={{ height: `${h}%` }} />
                ))}
            </div>
            <p className="text-[11px] font-black uppercase tracking-widest text-black/50">{note}</p>
        </div>
    );
}
