export function Marquee({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden py-6 select-none">
      <div
        className="marquee-track flex shrink-0 items-center gap-10 whitespace-nowrap pr-10"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10">
            <span className="font-display text-2xl tracking-tight text-muted-foreground md:text-4xl">
              {item}
            </span>
            <span className="text-ember text-lg">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
