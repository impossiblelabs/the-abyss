const HeroBadge = () => (
  <div className="hero-badge">
    <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
      <path
        d="M11.3 0.5L7.2 5.8L7.2 0.7H4.5V15.3H7.2V10.1L11.4 15.5H14.8L9.7 8.9L14.6 0.5H11.3Z"
        fill="#05CE78"
      />
    </svg>
    <span style={{ fontSize: 14, fontWeight: 500, color: "#05CE78" }}>
      Soon on Kickstarter
    </span>
    <svg
      style={{ position: "absolute", top: -4, right: -8 }}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M9 0V18M0 9H18M2.5 2.5L15.5 15.5M15.5 2.5L2.5 15.5"
        stroke="#05CE78"
        strokeWidth="1"
        opacity="0.4"
      />
    </svg>
  </div>
);

export default HeroBadge;
