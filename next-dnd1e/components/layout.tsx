import { FC, ReactNode } from "react";
import styles from "../styles/Layout.module.css";
import { Navbar } from "./nav";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <div className={styles.page}>
        <Navbar />
        <main className={styles.content}>{children}</main>
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
