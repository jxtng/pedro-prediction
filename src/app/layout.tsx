import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import NextTopLoader from "nextjs-toploader";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Pedro prediction",
  description: "Get the best predictions out there",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={`${inter.className} antialiased bg-gray-100 dark:bg-gray-900 text-gray-950 dark:text-gray-100`}
        >
          <NextTopLoader zIndex={9999} />
          <Header />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
