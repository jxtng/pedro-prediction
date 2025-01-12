"use client";
import React, { ReactEventHandler, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Prediction",
    href: "/prediction",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white border-b-4 border-red-500">
      <img src="/logo.svg" alt="Logo" />
      <nav
        className={cn(
          "absolute top-20 left-0 w-full z-30 bg-gray-900 md:static md:flex md:w-auto md:bg-transparent duration-500",
          isMenuOpen
            ? "py-4 animate-in slide-in-from-top-1 fade-in"
            : "animate-out slide-out-to-top-1 fade-out pointer-events-none max-md:fill-mode-forwards"
        )}
      >
        <ul className="flex flex-col gap-4 px-6 md:flex-row md:gap-6 md:px-0 text-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="hover:underline">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-4 md:gap-6">
        <Button className="hidden md:block">Register</Button>
        <Button variant="secondary" className="hidden md:block">
          Log in
        </Button>
        <button
          className="block text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          &#x2630;
        </button>
      </div>
    </header>
  );
};

export default Header;
