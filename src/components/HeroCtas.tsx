import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const HeroCtas = () => {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
      if (videoRef.current) videoRef.current.currentTime = 0;
    }
  }, [open]);

  return (
    <>
      <div className="hero-ctas">
        <a href="#" className="cta-primary">Back it now</a>
        <button className="cta-demo" onClick={() => setOpen(true)}>
          <div className="cta-demo-circle">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 1L12 7L3 13V1Z" fill="#e0a028" /></svg>
          </div>
          <span className="cta-demo-label">Watch demo</span>
        </button>
      </div>

      {open && createPortal(
        <div className="video-modal-overlay" onClick={() => setOpen(false)}>
          <div className="video-modal" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setOpen(false)} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 4L16 16M16 4L4 16" stroke="#f0d8a8" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <video
              ref={videoRef}
              src="/videos/intro.mp4"
              controls
              playsInline
              className="video-modal-player"
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default HeroCtas;
