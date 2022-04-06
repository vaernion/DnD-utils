import type { AppProps } from "next/app";
import Head from "next/head";
import { Layout } from "../components/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Head>
          <meta name="description" content="D&D 1e damage simulator" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
