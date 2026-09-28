// Íconos SVG en lugar de caracteres Unicode (→ ↗ ▶…): iOS los dibuja como emoji.
const paths = {
    "arrow-right": "M5 12h14M13 6l6 6-6 6",
    "arrow-left": "M19 12H5M11 6l-6 6 6 6",
    "arrow-down": "M12 5v14M6 13l6 6 6-6",
    "arrow-up-right": "M7 17 17 7M8 7h9v9",
    play: "M8 5v14l11-7z",
    pause: "M8 5v14M16 5v14",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className }: { name: IconName; className?: string }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill={name === "play" ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`inline-block h-[1em] w-[1em] shrink-0 ${className ?? ""}`}
        >
            <path d={paths[name]} />
        </svg>
    );
}
