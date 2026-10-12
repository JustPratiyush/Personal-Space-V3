import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { about } from "../../content/about";
import { site } from "../../content/site";
import { colors } from "../../lib/theme";
import Carousel from "../Carousel";
import { PreviewTerm, useHoverPreview } from "../HoverPreview";
import { Panel, Paragraph, SoftLink, Text, external } from "../ui";

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

const AboutPanel = styled(Panel)`
  @media (min-width: 901px) {
    max-width: 820px;
    padding: 24px 36px;
    ${Text} {
      font-size: 16px;
      line-height: 1.45;
    }
  }
  @media (min-width: 901px) and (max-height: 800px) {
    padding-top: 18px;
    padding-bottom: 18px;
  }
`;

const ping = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  80%, 100% { transform: scale(2.6); opacity: 0; }
`;

// Glass pill: "● Currently in <city>".
const LocationPill = styled.div`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  gap: 10px;
  margin: 0 0 26px;
  padding: 10px 15px;
  border: 1px solid rgba(255, 255, 255, 0.21);
  border-radius: 4px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.035) 55%, rgba(255, 255, 255, 0.075));
  backdrop-filter: blur(20px) saturate(125%);
  -webkit-backdrop-filter: blur(20px) saturate(125%);
  opacity: ${({ $stale }) => ($stale ? 0.6 : 1)};

  @media (min-width: 901px) {
    margin-bottom: 16px;
    padding: 8px 12px;
  }
`;

const LiveDot = styled.span`
  position: relative;
  flex: 0 0 6px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${colors.live};
  box-shadow: 0 0 7px rgba(244, 91, 91, 0.3);

  &::after {
    content: "";
    position: absolute;
    inset: -2px;
    border: 1px solid ${colors.live};
    border-radius: 50%;
    animation: ${ping} 3s ease-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
      opacity: 0.2;
    }
  }
`;

const Signature = styled.img`
  display: block;
  width: clamp(180px, 45vw, 260px);
  max-width: 100%;
  height: auto;
  margin: 24px 0 6px;

  @media (min-width: 901px) {
    width: 260px;
    margin: 8px 0 0;
  }
`;

const LinkRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 18px;
  margin: 0 0 1.5em;

  a {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 44px;
  }
  img {
    width: 30px;
    height: 32px;
    object-fit: contain;
  }
  @media (min-width: 901px) {
    margin-bottom: 6px;
    a {
      min-height: 30px;
    }
    img {
      width: 24px;
      height: 26px;
    }
  }
`;

// "Currently in <city>" comes from /api/location. Anything older than a week
// is shown as stale; failures keep the fallback city.
function useCurrentCity() {
  const [location, setLocation] = useState({ city: site.fallbackCity, stale: false });

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/location", { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data || typeof data.city !== "string" || data.city.length > 80) return;
        const age = data.updatedAt ? Date.now() - Date.parse(data.updatedAt) : 0;
        setLocation({ city: data.city, stale: age > ONE_WEEK_MS });
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return location;
}

export default function About() {
  const { city, stale } = useCurrentCity();
  const { triggerProps, card } = useHoverPreview();

  return (
    <AboutPanel>
      <LocationPill $stale={stale} aria-label={`Location: ${city}`}>
        <LiveDot aria-hidden="true" />
        <Text>Currently in {city}</Text>
      </LocationPill>

      {about.intro.map((line) => (
        <Paragraph key={line}>
          <Text>{line}</Text>
        </Paragraph>
      ))}

      <Paragraph>
        <Text>A few things I've done:</Text>
      </Paragraph>
      <Carousel items={about.done} interval={9500} label="A few things I've done" />

      {about.places.length > 0 && (
        <Paragraph>
          <Text>
            Places and people:{" "}
            {about.places.map((item, i) => (
              <span key={item.label}>
                {i > 0 && ", "}
                <PreviewTerm item={item} triggerProps={triggerProps} />
              </span>
            ))}
          </Text>
        </Paragraph>
      )}

      {(about.outro ?? []).map((line) => (
        <Paragraph key={line}>
          <Text>{line}</Text>
        </Paragraph>
      ))}

      <LinkRow>
        {about.links.map((link) => (
          <Text key={link.href}>
            <SoftLink href={link.href} {...(link.href.startsWith("mailto:") ? {} : external)}>
              {link.icon && <img src={link.icon} alt="" />}
              {link.label}
            </SoftLink>
          </Text>
        ))}
      </LinkRow>
      {about.signature && <Signature src={about.signature} alt="" />}
      {card}
    </AboutPanel>
  );
}
