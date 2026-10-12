import { useEffect } from "react";
import styled from "styled-components";
import { type } from "../lib/theme";
import { external } from "./ui";

const EMBED_SCRIPT = "https://www.instagram.com/embed.js";

const Frame = styled.div`
  position: relative;
  width: 100%;
  max-width: 350px;
  min-width: 0;
  overflow: hidden;
  contain: inline-size;

  iframe {
    display: block;
    position: relative !important;
  }
  .instagram-media {
    min-width: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
  }
  /* The link shown until embed.js swaps in the post. */
  blockquote a {
    color: inherit;
    font-size: ${type.meta};
    text-underline-offset: 4px;
  }
`;

// An Instagram post or reel. Instagram's embed.js upgrades the blockquote into
// an iframe; it's added once and picks up every embed on the page when it loads.
export default function InstagramEmbed({ permalink, className }) {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else if (!document.querySelector(`script[src="${EMBED_SCRIPT}"]`)) {
      const script = document.createElement("script");
      script.src = EMBED_SCRIPT;
      script.async = true;
      document.body.appendChild(script);
    }
  }, [permalink]);

  return (
    <Frame className={className}>
      <blockquote className="instagram-media" data-instgrm-permalink={permalink} data-instgrm-version="14">
        <a href={permalink} {...external}>
          View on Instagram
        </a>
      </blockquote>
    </Frame>
  );
}
