interface IconConfig {
    Icon: React.ComponentType<{
        width?: number;
        height?: number;
        className?: string;
    }>;
    label: string;
}

interface InfiniteSliderProps {
    title?: string;
    icons: IconConfig[];
    direction?: "left" | "right";
    iconSize?: number;
    spacing?: "compact" | "normal" | "wide";
}

const getSpacingClass = (spacing: "compact" | "normal" | "wide"): string => {
    switch (spacing) {
        case "compact":
            return "w-20";
        case "wide":
            return "w-40";
        default:
            return "w-31.25"; // 125px
    }
};

export const InfiniteSlider = ({
    title,
    icons,
    direction = "left",
    iconSize = 45,
    spacing = "normal",
}: InfiniteSliderProps) => {
    const getSpacingValue = () => {
        if (spacing === "compact") return 80;
        if (spacing === "wide") return 160;
        return 125;
    };

    const itemWidth = getSpacingValue();
    const spacingClass = getSpacingClass(spacing);

    // LOGIC SPEED:
    // Kita tentukan 1 ikon butuh waktu 3 detik untuk lewat.
    // Jika ada 10 ikon, maka total durasi 30 detik.
    // Ini menjamin kecepatan (px/sec) selalu sama.
    const duration = icons.length * 3;

    return (
        <div className="mb-12">
            {title && (
                <div
                    className={`max-w-4xl m-auto px-4 mb-4 flex flex-col ${direction === "right"
                        ? "items-end text-right"
                        : "items-start text-left"
                        }`}
                >
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.2em]">
                        {title}
                    </h3>
                    <div className="h-[1px] w-12 bg-primary mt-1" />
                </div>
            )}

            <div className="relative m-auto w-full max-w-4xl overflow-hidden bg-background py-4 mb-8">
                <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />

                <div
                    className={`animate-infinite-slider flex transition-all 
                        ${direction === "right"
                            ? "[animation-direction:reverse]"
                            : ""
                        } 
                        hover:[animation-play-state:paused] cursor-pointer`}
                    style={{
                        width: `${icons.length * 2 * itemWidth}px`,
                        // Override durasi CSS dengan inline style
                        animationDuration: `${duration}s`,
                    }}
                >
                    {[...icons, ...icons].map((config, index) => (
                        <div
                            className={`flex flex-col items-center justify-center ${spacingClass} flex-shrink-0`}
                            key={index}
                        >
                            <config.Icon
                                width={iconSize}
                                height={iconSize}
                                className="text-foreground transition-transform hover:scale-110"
                            />
                            <span className="md:block text-[10px] font-medium text-foreground mt-2 uppercase tracking-wider">
                                {config.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
