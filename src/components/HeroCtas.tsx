import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useForm } from "@formspree/react";

const HeroCtas = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [formState, handleSubmit, resetForm] = useForm("xkoyzvrr");
  const videoRef = useRef<HTMLVideoElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!videoOpen && !emailOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVideoOpen(false);
        setEmailOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [videoOpen, emailOpen]);

  useEffect(() => {
    if (videoOpen) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
      if (videoRef.current) videoRef.current.currentTime = 0;
    }
  }, [videoOpen]);

  useEffect(() => {
    if (emailOpen) inputRef.current?.focus();
  }, [emailOpen]);

  const closeEmail = () => {
    setEmailOpen(false);
    resetForm();
  };

  const hasErrors =
    !!formState.errors &&
    (Array.isArray(formState.errors)
      ? formState.errors.length > 0
      : Object.keys(formState.errors).length > 0);

  return (
    <>
      <div className="hero-ctas">
        <button className="cta-primary" onClick={() => setEmailOpen(true)}>
          Pre-order now
        </button>
        <button className="cta-demo" onClick={() => setVideoOpen(true)}>
          <div className="cta-demo-circle">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 1L12 7L3 13V1Z" fill="#e0a028" />
            </svg>
          </div>
          <span className="cta-demo-label">Watch demo</span>
        </button>
      </div>

      {emailOpen &&
        createPortal(
          <div className="video-modal-overlay" onClick={closeEmail}>
            <div className="email-modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="video-modal-close"
                onClick={closeEmail}
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 4L16 16M16 4L4 16"
                    stroke="#f0d8a8"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {formState.succeeded ? (
                <div className="email-modal-body">
                  <div className="email-success-icon">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path
                        d="M8 16L14 22L24 10"
                        stroke="#05ce78"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="email-modal-title">You're on the list</h3>
                  <p className="email-modal-sub">
                    We'll notify you when pre-orders open.
                  </p>
                </div>
              ) : (
                <form className="email-modal-body" onSubmit={handleSubmit}>
                  <h3 className="email-modal-title">Get notified</h3>
                  <p className="email-modal-sub">
                    Enter your email and we'll let you know when The Abyss is
                    available for pre-order.
                  </p>
                  <div className="email-input-row">
                    <input
                      ref={inputRef}
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      className="email-input"
                      disabled={formState.submitting}
                    />
                    <button
                      type="submit"
                      className="email-submit"
                      disabled={formState.submitting}
                    >
                      {formState.submitting ? "..." : "Notify me"}
                    </button>
                  </div>
                  {hasErrors && (
                    <p className="email-error">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>,
          document.body,
        )}

      {videoOpen &&
        createPortal(
          <div
            className="video-modal-overlay"
            onClick={() => setVideoOpen(false)}
          >
            <div className="video-modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="video-modal-close"
                onClick={() => setVideoOpen(false)}
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 4L16 16M16 4L4 16"
                    stroke="#f0d8a8"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
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
          document.body,
        )}
    </>
  );
};

export default HeroCtas;
