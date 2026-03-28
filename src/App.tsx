import { useState, useEffect, useRef } from "react";
import ParticleBg from "./components/ParticleBg";
import VerticalMarquee from "./components/VerticalMarquee";
import HeroBadge from "./components/HeroBadge";
import HeroCtas from "./components/HeroCtas";

export default function FusionLanding() {
  const [visible, setVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.3;
    const play = () => {
      audio.play().catch(() => {});
      window.removeEventListener("click", play);
      window.removeEventListener("keydown", play);
    };
    window.addEventListener("click", play);
    window.addEventListener("keydown", play);
    return () => {
      window.removeEventListener("click", play);
      window.removeEventListener("keydown", play);
    };
  }, []);

  return (
    <div className="fusion-root">
      <audio ref={audioRef} src="/audio/deep-sea.wav" loop preload="auto" />
      <ParticleBg />

      {/* HERO */}
      <div className="hero-wrapper">
        <div
          className="hero-marquee"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease 0.2s",
          }}
        >
          <div className="marquee-col">
            <VerticalMarquee speed={40} direction="up" seed={1} />
          </div>
          <div className="marquee-col" style={{ marginTop: -48, height: "calc(100% + 48px)" }}>
            <VerticalMarquee speed={44} direction="down" seed={2} />
          </div>
        </div>

        <div
          className="hero-content"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <HeroBadge />

          <div style={{ position: "relative" }}>
            <h2 className="hero-subheading">Dive into</h2>
            <h1 className="hero-heading">The Abyss</h1>
          </div>

          <p className="hero-sub">
            A game of action and strategy that will take you to the depths of
            the ocean.
          </p>

          <p className="hero-tagline">
            Learn the rules in a few minutes, play for hours.
          </p>
          <HeroCtas />
        </div>
        <p className="site-footer">
          Made by{" "}
          <a
            href="https://impossiblelabs.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Impossible Labs
          </a>
        </p>
      </div>
    </div>
  );
}
