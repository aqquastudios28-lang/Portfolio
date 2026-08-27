import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated share card, built from the same tokens as the site: ink, bone,
 * hairline rules, mono running head. No accent — there is nothing to
 * interact with in an image.
 *
 * Rendered at build time, so there is no static PNG to keep in sync when
 * you change your name or role in site.ts.
 */
export default function OgImage() {
  const ink = "#0b0b0c";
  const bone = "#edebe7";
  const boneFaint = "#605d58";
  const rule = "rgba(237,235,231,0.16)";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: ink,
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: `1px solid ${rule}`,
            paddingBottom: 20,
            color: boneFaint,
            fontSize: 22,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex" }}>{site.role}</div>
          <div style={{ display: "flex" }}>{site.name}</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: bone,
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 0.94,
            letterSpacing: "-0.045em",
          }}
        >
          {site.headline.map((line) => (
            <div key={line} style={{ display: "flex" }}>
              {line}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `1px solid ${rule}`,
            paddingTop: 20,
            color: boneFaint,
            fontSize: 22,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex" }}>
            {site.url.replace(/^https?:\/\//, "")}
          </div>
          <div style={{ display: "flex" }}>
            {site.availability.open
              ? site.availability.label
              : site.availability.closedLabel}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
