import styled from "styled-components";
import { essays } from "../../content/lists";
import { font, type } from "../../lib/theme";
import { Panel, external } from "../ui";

const EssaysPanel = styled(Panel)`
  color: #eee;
  font-family: ${font};
  text-transform: uppercase;
  line-height: 1.6;

  h1 {
    font-size: ${type.headline};
    font-weight: normal;
    margin-bottom: 20px;
  }
  h2 {
    font-size: ${type.title};
    font-weight: normal;
    line-height: 1.3;
    margin: 0 0 8px;
  }
  p {
    color: inherit;
    font-size: ${type.text};
    margin: 8px 0;
  }
  a {
    display: block;
    padding: 18px 0;
    color: inherit;
    text-decoration: none;
  }
  a h2 {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 5px;
  }
  small {
    display: block;
    font-size: ${type.meta};
    opacity: 0.7;
  }
  a + a {
    border-top: 1px solid rgba(255, 255, 255, 0.12);
  }
  .lead h2::before {
    content: "► ";
  }
  .foot {
    padding-bottom: 0;
    font-size: ${type.meta};
  }
`;

export default function Essays() {
  return (
    <EssaysPanel>
      <h1>essays</h1>
      <p>{essays.blurb}</p>
      <a className="lead" href={essays.lead.href} {...external}>
        <h2>{essays.lead.title}</h2>
        <small>{essays.lead.note}</small>
      </a>
      {essays.items.map((essay) => (
        <a key={essay.href} href={essay.href} {...external}>
          <h2>{essay.title}</h2>
          <small>{essay.note}</small>
        </a>
      ))}
      <a className="foot" href={essays.footer.href} {...external}>
        {essays.footer.label} &rarr;
      </a>
    </EssaysPanel>
  );
}
