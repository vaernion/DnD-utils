import { FC } from "react";
import styles from "../styles/Layout.module.css";
import { Navbar } from "./nav";

export const Layout: FC = ({ children }) => {
  return (
    <>
      <div className={styles.page}>
        <Navbar />
        <main className={styles.container}>{children}</main>
        <Footer />
      </div>
    </>
  );
};

function Footer() {
  return (
    <footer className={styles.footer}>
      <span>Powered by Gygax</span>
    </footer>
  );
}
