import type { Metadata } from "next";
import "./globals.css";

// Note: the default create-next-app template loads Geist from Google Fonts, which needs
// internet at build/dev time. This lab uses the system font stack so it works offline.

export const metadata: Metadata = {
  title: "Accessibility Lab — Project 42",
  description: "IIT Kharagpur × upGrad · Module 3 hands-on lab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
