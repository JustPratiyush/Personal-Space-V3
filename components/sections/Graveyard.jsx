import Link from "next/link";
import styled from "styled-components";
import { graveyard } from "../../content/graveyard";
import { ListPanel, ReferenceGrid } from "../References";
import { external } from "../ui";

const Foot = styled.p`
  margin-top: 18px;

  a {
    color: inherit;
    text-underline-offset: 4px;
  }
`;

export default function Graveyard() {
  return (
    <ListPanel>
      <h1>† {graveyard.title}</h1>
      <p>{graveyard.intro}</p>
      <div style={{ marginTop: 20 }}>
        <ReferenceGrid items={graveyard.graves} />
      </div>
      <Foot>
        Still breathing: <Link href="/work">the work page</Link>.{" "}
        <a href={graveyard.footer.href} {...external}>
          {graveyard.footer.label} ↗
        </a>
      </Foot>
    </ListPanel>
  );
}
