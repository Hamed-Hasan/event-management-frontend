import Providers from "@/lib/Providers";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GreenEcovents - Where Sustainability Meets Celebration",
  description: "Designed and Developed by Suhag Al Amin",
  authors: [
    {
      name: "Suhag Al Amin",
      url: "https://suhag.me",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <head></head>
        <body className={montserrat.className}>{children}</body>
      </html>
    </Providers>
  );
}
