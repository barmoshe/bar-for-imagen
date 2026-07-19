// Centerpiece: a "Personal Builder Profile" develop panel, Imagen's signature
// motif (an editing panel that learned someone's personal style) reframed as
// Bar's skills. Built from scratch, no Imagen assets. Decorative: aria-hidden,
// the meaning lives in the surrounding copy. Coordinates are integers/2dp so
// server and client markup match (hydration).
const SLIDERS = [
  { label: "TypeScript", x2: 540, value: "+95" },
  { label: "React", x2: 524, value: "+90" },
  { label: "Node.js", x2: 508, value: "+85" },
  { label: "Electron", x2: 476, value: "+75" },
  { label: "AI & agents", x2: 532, value: "+92" },
];

export function Centerpiece() {
  return (
    <svg
      viewBox="0 0 640 360"
      aria-hidden="true"
      focusable="false"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      {/* panel */}
      <rect x="0" y="0" width="640" height="360" rx="20" fill="#0E1523" />
      <rect
        x="0.5"
        y="0.5"
        width="639"
        height="359"
        rx="19.5"
        fill="none"
        stroke="#20375E"
        strokeOpacity="0.6"
      />

      {/* header row */}
      <circle cx="36" cy="42" r="5" fill="#FF5470" />
      <text
        x="52"
        y="47"
        fill="#8DA5CB"
        fontSize="13"
        letterSpacing="3"
        fontFamily="var(--imagen-font), sans-serif"
      >
        PERSONAL BUILDER PROFILE
      </text>
      <text
        x="604"
        y="47"
        textAnchor="end"
        fill="#717A88"
        fontSize="12"
        fontFamily="var(--imagen-font), sans-serif"
      >
        auto-applied
      </text>
      <line x1="24" y1="66" x2="616" y2="66" stroke="#20375E" strokeOpacity="0.5" />

      {/* slider rows: label | track | value */}
      {SLIDERS.map((s, i) => {
        const y = 108 + i * 48;
        return (
          <g key={s.label}>
            <text
              x="36"
              y={y + 5}
              fill="#E8F5FF"
              fontSize="15"
              fontFamily="var(--imagen-font), sans-serif"
            >
              {s.label}
            </text>
            {/* track */}
            <line
              x1="200"
              y1={y}
              x2="556"
              y2={y}
              stroke="#20375E"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* filled portion */}
            <line
              x1="200"
              y1={y}
              x2={s.x2}
              y2={y}
              stroke="#FF5470"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* handle */}
            <circle cx={s.x2} cy={y} r="9" fill="#FFFFFF" />
            <circle cx={s.x2} cy={y} r="9" fill="none" stroke="#FF5470" strokeWidth="3" />
            <text
              x="604"
              y={y + 5}
              textAnchor="end"
              fill="#E7FFB9"
              fontSize="14"
              fontFamily="var(--imagen-font), sans-serif"
            >
              {s.value}
            </text>
          </g>
        );
      })}

      {/* footer note */}
      <text
        x="36"
        y="336"
        fill="#717A88"
        fontSize="12"
        fontFamily="var(--imagen-font), sans-serif"
      >
        Profile learned from shipped work. Refined every project.
      </text>
    </svg>
  );
}
