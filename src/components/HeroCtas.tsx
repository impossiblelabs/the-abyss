import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useForm } from "@formspree/react";
import { KICKSTARTER_URL } from "../config";

// Signup channel from ?utm_source=... (e.g. reddit, bgg). Only called in the
// client-only modal, but guarded so it is safe during SSR/prerender too.
const getSignupSource = () => {
  if (typeof window === "undefined") return "direct";
  const source = new URLSearchParams(window.location.search)
    .get("utm_source")
    ?.trim()
    .toLowerCase()
    .slice(0, 64);
  return source || "direct";
};

// The game is playable for free in the browser on Board Game Arena (public alpha).
const PLAY_URL = "https://boardgamearena.com/gamepanel?game=theabyss";

const HeroCtas = () => {
  const [emailOpen, setEmailOpen] = useState(false);
  const [formState, handleSubmit, resetForm] = useForm("xkoyzvrr");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!emailOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setEmailOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [emailOpen]);

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
          Get notified
        </button>
        {KICKSTARTER_URL && (
          <a
            className="cta-secondary"
            href={KICKSTARTER_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow on Kickstarter
          </a>
        )}
        <a
          className="cta-demo"
          href={PLAY_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="cta-demo-circle">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 1L12 7L3 13V1Z" fill="#e0a028" />
            </svg>
          </div>
          <span className="cta-demo-label">Play free on Board Game Arena</span>
        </a>
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
                    We'll email you on launch day.
                  </p>
                </div>
              ) : (
                <form className="email-modal-body" onSubmit={handleSubmit}>
                  <h3 className="email-modal-title">Get notified at launch</h3>
                  <p className="email-modal-sub">
                    Enter your email and we'll let you know the day The Abyss
                    launches on Kickstarter.
                  </p>
                  <input
                    type="hidden"
                    name="source"
                    value={getSignupSource()}
                  />
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

    </>
  );
};

export default HeroCtas;
