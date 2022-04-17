import Link from "next/link";
import { FC } from "react";

const menuItems: [href: string, name: string][] = [
  ["/", "Home1"],
  ["/stuff", "stuff"],
  ["/damage", "Damage"],
];

export const Navbar: FC = () => {
  return (
    <>
      <nav className="">
        {menuItems.map((item, idx) => (
          <Link key={idx} href={item[0]}>
            <a>{item[1]}</a>
          </Link>
        ))}
      </nav>
    </>
  );
};
