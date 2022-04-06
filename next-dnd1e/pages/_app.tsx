import type { AppProps } from "next/app";
import Head from "next/head";
import { Navbar } from "../components/nav";
import "../styles/globals.css";
import styles from "../styles/Home.module.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <meta name="description" content="D&D 1e damage simulator" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar />

        <Component {...pageProps} />

        <footer className={styles.footer}>
          <span>Powered by Gygax</span>
        </footer>
      </div>
    </>
  );
}

export default MyApp;
