/*  ./components/Navbar.jsx     */

import { NextComponentType } from "next";
import Link from "next/link";

export const Navbar: NextComponentType = () => {
  return (
    <>
      <nav className="">
        <Link href="/">
          <a>Home1</a>
        </Link>
        <Link href="/stuff">
          <a>stuff</a>
        </Link>
      </nav>
    </>
  );
};
