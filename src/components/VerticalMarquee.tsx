import { useMemo } from "react";

const ALL_CARDS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface VerticalMarqueeProps {
  speed: number;
  direction: "up" | "down";
}

const VerticalMarquee = ({ speed, direction }: VerticalMarqueeProps) => {
  const images = useMemo(() => {
    const shuffled = shuffle(ALL_CARDS);
    return [...shuffled, ...shuffled, ...shuffled];
  }, []);

  const anim = direction === "up" ? "marqueeUp" : "marqueeDown";

  return (
    <div style={{ overflow: "hidden", height: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, animation: `${anim} ${speed}s linear infinite` }}>
        {images.map((n, i) => (
          <img key={i} src={`/images/card${n}.png`} style={{ borderRadius: 16, display: "block", width: "100%" }} />
        ))}
      </div>
    </div>
  );
};

export default VerticalMarquee;
