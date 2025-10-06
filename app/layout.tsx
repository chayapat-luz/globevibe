import type { Metadata } from "next";
import { Poppins, Baloo_2, Nunito, Patrick_Hand, Sarabun } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const baloo = Baloo_2({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-baloo",
});

const nunito = Nunito({
  weight: ['400', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-nunito",
});

const patrickHand = Patrick_Hand({
  weight: ['400'],
  subsets: ["latin"],
  variable: "--font-patrick-hand",
});

const sarabun = Sarabun({
  weight: ['400', '600', '700'],
  subsets: ["latin", "thai"],
  variable: "--font-sarabun",
});

export const metadata: Metadata = {
  title: "GLOBEVIBE - Collect Stories, Not Just Selfies",
  description: "Explore culture and history of the world's important cities through an interactive 3D globe experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${baloo.variable} ${nunito.variable} ${patrickHand.variable} ${sarabun.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
