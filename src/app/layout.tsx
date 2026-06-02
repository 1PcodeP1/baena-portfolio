import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Baena Portfolio",
  description: "Editorial portfolio — Carlos Baena",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
