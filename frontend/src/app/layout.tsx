import type { Metadata } from "next";
import { Open_Sans, Marmelad, Vollkorn, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const vollkorn = Vollkorn({ subsets: ["latin"], weight: ['400'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ['400'] });

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
      <body className={jetBrainsMono.className}>{children}</body>
    </html>
  );
}
