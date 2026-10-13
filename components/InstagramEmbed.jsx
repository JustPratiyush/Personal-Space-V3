import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { external } from "./ui";

// An Instagram post or reel. A picture of the embed (`poster`, saved from the
// live one at this width) shows at once; Instagram's embed page loads in an
// iframe over it and fades in when it's ready, then takes the height it posts
// back ({ type: "MEASURE", details: { height } }). With `posterOnly` the
// picture stays, linked to the post: the live embed always opens on a
// carousel's first photo.

const embedUrl = (permalink) => `${permalink.replace(/\/?$/, "/")}embed/?cr=1&v=14&wp=350`;

const Frame = styled.div`
  position: relative;
  width: 100%;
  max-width: 350px;
  min-height: ${({ $empty }) => ($empty ? "560px" : "0")};
  overflow: hidden;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  background: #fff;

  img {
    display: block;
    width: 100%;
    height: auto;
  }
  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
    opacity: 0;
    transition: opacity 300ms ease;
  }
  iframe[data-ready] {
    opacity: 1;
  }
`;

export default function InstagramEmbed({ permalink, poster, posterOnly = false, alt = "", className }) {
  const frameRef = useRef(null);
  const [height, setHeight] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (posterOnly) return;
    const onMessage = (event) => {
      if (event.origin !== "https://www.instagram.com" || event.source !== frameRef.current?.contentWindow) return;
      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (data?.type === "MEASURE" && data.details?.height) setHeight(data.details.height);
      } catch {
        // Not one of the embed's messages.
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [posterOnly]);

  const picture = poster && (
    <img src={poster.src} width={poster.width} height={poster.height} alt={posterOnly ? alt : ""} />
  );

  if (posterOnly) {
    return (
      <Frame className={className}>
        <a href={permalink} title="Open on Instagram" {...external}>
          {picture}
        </a>
      </Frame>
    );
  }

  return (
    // +2 for the frame's border.
    <Frame className={className} $empty={!poster} style={height ? { height: height + 2 } : undefined}>
      {picture}
      <iframe
        ref={frameRef}
        src={embedUrl(permalink)}
        title={alt || "Instagram post"}
        loading="lazy"
        scrolling="no"
        allowFullScreen
        data-ready={loaded ? "" : undefined}
        onLoad={() => setLoaded(true)}
      />
    </Frame>
  );
}
