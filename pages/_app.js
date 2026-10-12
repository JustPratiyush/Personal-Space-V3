import { Analytics } from "@vercel/analytics/next";
import Head from "next/head";
import { useRouter } from "next/router";
import { createGlobalStyle } from "styled-components";
import Cursor from "../components/Cursor";
import { site } from "../content/site";
import { SECTION_TITLES, sectionFromPath } from "../lib/sections";
import { font } from "../lib/theme";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "VCR";
    src: url("/fonts/VCR_OSD_MONO.ttf") format("truetype");
    font-display: swap;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Black lives on <html> only: a body background would paint over the
     negative-z-index video and grain layers. */
  html {
    background: #000;
  }

  body {
    background: transparent;
    color: #eee;
    font-family: ${font};
    -webkit-font-smoothing: antialiased;
  }

  html.custom-cursor-active, html.custom-cursor-active * {
    cursor: none !important;
  }
`;

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const title = SECTION_TITLES[sectionFromPath(router.asPath)] ?? site.title;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="description" content={site.description} />
        <meta name="theme-color" content="#101012" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={site.headerLabel} />
        <meta property="og:title" content={site.title} />
        <meta property="og:description" content={site.description} />
        <meta property="og:url" content={site.url} />
        <meta property="og:image" content={`${site.url}/og.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@JustPratiyush" />
      </Head>
      <GlobalStyle />
      <Cursor />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
