import type { AppProps } from "next/app";
import Head from "next/head";
import { CharStore } from "../components/charStore";
import { Layout } from "../components/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="description" content="D&D 1e damage simulator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CharStore>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CharStore>
    </>
  );
}

export default MyApp;
