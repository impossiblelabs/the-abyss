import { useState, useEffect, useRef, type FormEvent } from "react";
import { createPortal } from "react-dom";

const _XK = "theabyss2026";
const _XT =
  "EREvUQchMhp9WXh9Ilk0CC46ORtQd1FfOwEvMjcDOkJ8WXgPWg0cKwodJCJbf1t/RCEMFgsYHSFCeVhZHTEyOBU3CSJKal9zRiUhAhg0QTlZfVheHyUfKFAjNz4DaWZ3DDEyOFAjNCoDfWVkHyYILFc0GRtffkhdAzEIJBg2JClefkhkHzIPBQ80CRdeaVhjRjExBlA2NCYDanVzQCYfMw4gJD5KanV/HSQmKxIgKyJbf1hzRyYfLFc3JxBFflh3ASUPAlI3GToBfHF8ATEIOAs2GTYBfkh7QSYxAhU3GTJHfVhVRCYPKFc1MDleVXp3HScPMFc0GRgAfUh3RiYPIBc0GRBFfVh/QCQmKxgdJDpbf1t/DSUPKFA3GSJIeVtBHQtXLxQaNCVIeVhGFjA9UUw0RioHUlRnHzkBLzEmQkd5YloAHRAxFy5BGhZFVgNwECUBLz0WBkZoZXxSASQjCggMAilhSVUPHTwIACAuCQlKd3puIRkjGwg4FCVQB18HOAYDMjs+QzkKZ1dRMjApBVoyQRtTaAZ0IS01FSNLQCxLeFwFRDJcJSM3OCR+HWp6LjAqUxMsQzhIQGMPISoLOSoWKT58R14DIVsXECgoGCleQUdcKwsPEhoRQTVoZwUAORsOWQ4/IzRfW35lDio3AA8dCgJfZlxzLTtUOzEUGAV5BkpDOScrIi0yIQpQXFUPQwdRJjRINh9iRFBpGyMAJjQ/QTxCQkQOQiwIKi4+Shpcb1hjHDkRLC9JGRRFY1F9PS4PNFsQATx9UnQDEQ4LUlc8JABQaUJuPBkkBytORR1qZHZSFxwpLzU/OixICXlcKzhVOzYbBTtVYmF9DD0DWTgdNhFbZ2pSMVo8WAVPRipKdmdwEScyERVOPTRzRHRyMBI9BxEYFgVnfgVOBAQMVzYJGyJzd3NsOy4oUCUuPitdb395TAYvIAYXFyVgWFpyRhEpACcNKz1HcVZCDgMECSdBCUsFagpcHxA0JwovRRt1XFZpAx4xCAQyCQV6c0FaTCIcCScSPyNfRmJdBQApTBEvEkJFdAMPNT0WUVQBNRBdCWpMEwNTDA0hSjBjd0dgLD0fFRZIQApmcwR5ICMvBQEMEAR1Zl90FS4xCREKEBJKfFR9MQNQWC8VPCZfanVDQyNTVxUzMhJoVFdjDCkwVDY1S0FoQnRfRlo2Jw42RAFQfW1+EiUJGABPMRpwZAZ+RT4pMSE8FgpqSXRvGBlUJwESSjBkYnp/Ag8VFBtBITJlenZGECs1BQoDHgQCX2N8TFAnFg1MODZfR1ACAAdcClEsQEQERFpiLF8IMA==";

function _d(encoded: string, key: string): string {
  const bytes = Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0));
  return Array.from(bytes, (b, i) =>
    String.fromCharCode(b ^ key.charCodeAt(i % key.length)),
  ).join("");
}

const MAILERLITE_API_KEY = _d(_XT, _XK);
const MAILERLITE_GROUP_ID = "182403056108832766";

type EmailState = "idle" | "submitting" | "success" | "error";

const HeroCtas = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [emailState, setEmailState] = useState<EmailState>("idle");
  const [email, setEmail] = useState("");
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || emailState === "submitting") return;

    setEmailState("submitting");
    try {
      const res = await fetch(
        "https://connect.mailerlite.com/api/subscribers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${MAILERLITE_API_KEY}`,
          },
          body: JSON.stringify({ email, groups: [MAILERLITE_GROUP_ID] }),
        },
      );

      if (!res.ok) throw new Error("subscribe failed");
      setEmailState("success");
    } catch {
      setEmailState("error");
    }
  };

  const closeEmail = () => {
    setEmailOpen(false);
    setEmailState("idle");
    setEmail("");
  };

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

              {emailState === "success" ? (
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
                      required
                      placeholder="you@example.com"
                      className="email-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={emailState === "submitting"}
                    />
                    <button
                      type="submit"
                      className="email-submit"
                      disabled={emailState === "submitting"}
                    >
                      {emailState === "submitting" ? "..." : "Notify me"}
                    </button>
                  </div>
                  {emailState === "error" && (
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
