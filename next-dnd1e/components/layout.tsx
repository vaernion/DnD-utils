import { FunctionComponent } from "react";
import styles from "../styles/Home.module.css";
import { Navbar } from "./nav";

export const Layout: FunctionComponent = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navbar />

      {children}

      <footer className={styles.footer}>
        <span>Powered by Gygax</span>
      </footer>
    </div>
  );
};
