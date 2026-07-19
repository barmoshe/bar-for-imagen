import { ImageResponse } from "next/og";

// `force-static` is required for the GH_PAGES export build to collect this route
// (see next.config.ts / ADR 0169).
export const dynamic = "force-static";

export const alt = "Bar Moshe, for Imagen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Imagen's look: white field, coral wordmark, giant ink editorial headline,
// dark stack chips. Satori renders Latin only and needs explicit flex displays.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#ffffff",
          color: "#030B19",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, color: "#FF5470" }}>
          bar for imagen
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            lineHeight: 1.12,
            letterSpacing: "-2px",
          }}
        >
          <div style={{ display: "flex" }}>A full-stack engineer,</div>
          <div style={{ display: "flex" }}>
            powered by
            <div style={{ display: "flex", color: "#FF5470", marginLeft: 20 }}>
              builder DNA.
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {["TS", "React", "Node", "Electron"].map((chip) => (
              <div
                key={chip}
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  borderRadius: 10,
                  background: "#030B19",
                  color: "#ffffff",
                  fontSize: 24,
                  fontWeight: 700,
                }}
              >
                {chip}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#5C6572" }}>
            Bar Moshe · Full Stack Engineer
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
