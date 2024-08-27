import type { Metadata } from "next";
import {Secular_One} from "next/font/google";
import "./globals.css";

const secularOne = Secular_One({ subsets: ["latin"], weight: ['400'] });

export const metadata: Metadata = {
  title: "Dustin Alandzes",
  description: "Dustin Alandzes",
  authors: {name: "Dustin Alandzes"},
  keywords: ["Dustin", "Alandzes", "AWS", "Terraform", "Python", "React"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={secularOne.className}>{children}</body>
    </html>
  );
}
