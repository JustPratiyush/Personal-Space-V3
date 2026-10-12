import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import { work } from "../../content/work";
import { type } from "../../lib/theme";
import Heatmap from "../Heatmap";
import InstagramEmbed from "../InstagramEmbed";
import { Filters, Grid, ListPanel, Reference } from "../References";
import { Highlight, external } from "../ui";

const Feature = styled.div`
  margin: 0 0 8px;
  padding: 18px 0 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);

  h2 {
    margin: 0 0 10px;
    font: inherit;
    font-size: ${type.title};
    line-height: 1.3;
  }
  small {
    display: block;
    font-size: ${type.meta};
    opacity: 0.75;
    margin-bottom: 14px;
  }
  img {
    display: block;
    width: 100%;
    max-width: 640px;
    height: auto;
    margin: 0 0 14px;
    border: 1px solid rgba(255, 255, 255, 0.09);
    filter: grayscale(1) contrast(1.05);
    transition: filter 400ms ease;
  }
  img:hover {
    filter: none;
  }
  p {
    max-width: 70ch;
    margin: 0 0 10px;
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

// Embedded posts: title and date on the left, the post on the right; stacked
// on narrow screens.
const Reels = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);

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
    font-size: ${type.meta};
    opacity: 0.75;
  }
  @media (min-width: 700px) {
    > article {
      grid-template-columns: minmax(0, 1fr) 350px;
    }
  }
`;

export default function Work() {
  const [group, setGroup] = useState(work.groups[0]);
  const visible = work.items.filter((item) => item.group === group);
  const embeds = visible.filter((item) => item.instagram);
  const rows = visible.filter((item) => !item.instagram);
  const { featured } = work;

  return (
    <ListPanel>
      <h1>work</h1>
      <p>
        {work.intro} <Link href="/graveyard">graveyard</Link>.
      </p>

      <Filters aria-label="Filter work">
        {work.groups.map((name) => (
          <button key={name} type="button" aria-pressed={group === name} onClick={() => setGroup(name)}>
            {name}
          </button>
        ))}
      </Filters>

      {work.heatmapGroup === group && <Heatmap user={work.githubUser} />}

      {featured.group === group && (
        <Feature>
          <h2>
            <Highlight>{featured.name}</Highlight>
          </h2>
          <small>{featured.meta}</small>
          <img src={featured.image} alt={featured.imageAlt} width="1400" height="764" />
          {featured.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <Stats>
            {featured.stats.map((s) => (
              <div key={s.label}>
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </Stats>
          <Links>
            {featured.links.map((link) => (
              <a key={link.href} href={link.href} {...external}>
                {link.label} ↗
              </a>
            ))}
          </Links>
        </Feature>
      )}

      {embeds.length > 0 && (
        <Reels>
          {embeds.map((item) => (
            <article key={item.instagram}>
              <div>
                <h2>
                  <a href={item.instagram} {...external}>
                    {item.name}
                  </a>
                </h2>
                <small>{item.by}</small>
              </div>
              <InstagramEmbed permalink={item.instagram} />
            </article>
          ))}
        </Reels>
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
