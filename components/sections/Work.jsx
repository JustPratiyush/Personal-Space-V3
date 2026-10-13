import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import { work } from "../../content/work";
import { colors, type } from "../../lib/theme";
import Heatmap from "../Heatmap";
import InstagramEmbed from "../InstagramEmbed";
import PixelIcon from "../PixelIcon";
import { Filters, Grid, ListPanel, Reference, fade } from "../References";
import { external } from "../ui";

const Intro = styled.p`
  margin: 0 0 22px;
`;

// The way into the graveyard: deep red, behind a tombstone.
const GraveyardLink = styled(Link)`
  color: ${colors.graveyard};
  text-underline-offset: 4px;
  white-space: nowrap;

  svg {
    width: 16px;
    height: 16px;
    margin-right: 6px;
    vertical-align: -2px;
  }
`;

// One project or reel per row: text on the left, its picture or Instagram post
// on the right; stacked on narrow screens.
const Showcase = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${fade} 160ms ease;

  > article {
    display: grid;
    gap: 16px 32px;
    padding: 24px 0;
    border-bottom: 1px solid #ffffff25;
  }
  h2 {
    margin: 0 0 6px;
    font: inherit;
    font-size: ${type.title};
    line-height: 1.3;
  }
  h2 a {
    color: inherit;
    text-decoration: none;
  }
  h2 a:hover,
  h2 a:focus-visible {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  small {
    display: block;
    margin-bottom: 14px;
    font-size: ${type.meta};
    opacity: 0.75;
  }
  p {
    max-width: 60ch;
    margin: 0 0 10px;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    object-position: left top;
    border: 1px solid rgba(255, 255, 255, 0.09);
  }
  @media (min-width: 700px) {
    > article {
      grid-template-columns: minmax(0, 1fr) 350px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Stats = styled.dl`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 28px;
  margin: 14px 0;

  dt {
    font-size: ${type.title};
  }
  dd {
    margin: 2px 0 0;
    font-size: ${type.meta};
    opacity: 0.75;
  }
`;

const Links = styled.p`
  display: flex;
  flex-wrap: wrap;
  gap: 4px 18px;

  a {
    color: inherit;
    text-underline-offset: 4px;
  }
`;

// The title links to the post, or to the item's first link.
function ShowcaseItem({ item }) {
  const href = item.instagram ?? item.links?.[0]?.href;
  const lines = item.body ?? (item.note ? [item.note] : []);

  return (
    <article>
      <div>
        <h2>
          <a href={href} {...external}>
            {item.name}
          </a>
        </h2>
        <small>{item.by}</small>
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
        {item.stats && (
          <Stats>
            {item.stats.map((s) => (
              <div key={s.label}>
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </Stats>
        )}
        {item.links && (
          <Links>
            {item.links.map((link) => (
              <a key={link.href} href={link.href} {...external}>
                {link.label} ↗
              </a>
            ))}
          </Links>
        )}
      </div>
      {item.instagram ? (
        <InstagramEmbed permalink={item.instagram} />
      ) : (
        <img src={item.image} alt={item.imageAlt} width="960" height="600" loading="lazy" />
      )}
    </article>
  );
}

export default function Work() {
  const [group, setGroup] = useState(work.groups[0]);
  const visible = work.items.filter((item) => item.group === group);
  const showcase = visible.filter((item) => item.image || item.instagram);
  const rows = visible.filter((item) => !item.image && !item.instagram);

  return (
    <ListPanel>
      <h1>work</h1>

      <Filters aria-label="Filter work">
        {work.groups.map((name) => (
          <button key={name} type="button" aria-pressed={group === name} onClick={() => setGroup(name)}>
            {name}
          </button>
        ))}
      </Filters>

      {work.heatmapGroup === group && (
        <>
          <Heatmap user={work.githubUser} />
          <Intro>
            {work.intro}{" "}
            <GraveyardLink href="/graveyard">
              <PixelIcon kind="tombstone" />
              graveyard
            </GraveyardLink>
            .
          </Intro>
        </>
      )}

      {showcase.length > 0 && (
        <Showcase key={group}>
          {showcase.map((item) => (
            <ShowcaseItem key={item.name} item={item} />
          ))}
        </Showcase>
      )}

      {rows.length > 0 && (
        <Grid key={group}>
          {rows.map((item) => (
            <Reference key={`${item.name}-${item.by}`} {...item} />
          ))}
        </Grid>
      )}
    </ListPanel>
  );
}
