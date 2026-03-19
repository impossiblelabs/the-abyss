import { useMemo } from "react";

const ALL_CARDS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface VerticalMarqueeProps {
  speed: number;
  direction: "up" | "down";
  seed?: number;
}

const VerticalMarquee = ({
  speed,
  direction,
  seed = 1,
}: VerticalMarqueeProps) => {
  const images = useMemo(() => {
    const shuffled = shuffle(ALL_CARDS, seed);
    return [...shuffled, ...shuffled, ...shuffled];
  }, [seed]);

  const className =
    direction === "up" ? "marquee-track-up" : "marquee-track-down";

  return (
    <div style={{ overflow: "hidden", height: "100%" }}>
      <div className={className} style={{ animationDuration: `${speed}s` }}>
        {images.map((n, i) => (
          <img
            key={i}
            src={`/images/card${n}.png`}
            alt=""
            loading="eager"
            className="marquee-card"
          />
        ))}
      </div>
    </div>
  );
};

export default VerticalMarquee;
