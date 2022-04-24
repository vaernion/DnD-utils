import { NextPage } from "next";
import Head from "next/head";
import { CharList } from "../components/dndCharList";
import styles from "../styles/Layout.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>D&D 1e utils</title>
      </Head>

      <h1 className={styles.title}>D&D 1e damage sim</h1>

      <CharList />
    </>
  );
};

export default Home;
