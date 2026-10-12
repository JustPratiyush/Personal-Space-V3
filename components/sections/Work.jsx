import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import { work } from "../../content/work";
import Heatmap from "../Heatmap";
import { Filters, Grid, ListPanel, Reference } from "../References";
import { Highlight, external } from "../ui";

const Feature = styled.div`
  margin: 0 0 8px;
  padding: 18px 0 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);

  h2 {
    margin: 0 0 10px;
    font: inherit;
    font-size: 1rem;
  }
  small {
    display: block;
    font-size: 11px;
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
  @media (min-width: 1100px) {
    p {
      font-size: 13px;
    }
  }
`;

const Stats = styled.dl`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 28px;
  margin: 14px 0;

  dt {
    font-size: 1.3rem;
  }
  dd {
    margin: 2px 0 0;
    font-size: 11px;
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

export default function Work() {
  const [group, setGroup] = useState(work.groups[0]);
  const visible = work.items.filter((item) => item.group === group);
  const { featured } = work;

  return (
    <ListPanel>
      <h1>work</h1>
      <p>
        {work.intro} <Link href="/graveyard">graveyard</Link>.
      </p>

      <Heatmap user={work.githubUser} />

      <Filters aria-label="Filter work">
        {work.groups.map((name) => (
          <button key={name} type="button" aria-pressed={group === name} onClick={() => setGroup(name)}>
            {name}
          </button>
        ))}
      </Filters>

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

      <Grid key={group}>
        {visible.map((item) => (
          <Reference key={`${item.name}-${item.by}`} {...item} />
        ))}
      </Grid>
    </ListPanel>
  );
}
