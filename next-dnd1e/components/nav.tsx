import Link from "next/link";
import { FC } from "react";
import styles from "../styles/Layout.module.css";

const menuItems: [href: string, name: string][] = [
  ["/", "Home"],
  ["/damage", "Damage"],
  ["/battle", "Autobattle"],
];

export const Navbar: FC = () => {
  return (
    <>
      <nav className={styles.navbar}>
        {menuItems.map((item, idx) => (
          <Link key={idx} href={item[0]}>
            <a>{item[1]}</a>
          </Link>
        ))}
      </nav>
    </>
  );
};
