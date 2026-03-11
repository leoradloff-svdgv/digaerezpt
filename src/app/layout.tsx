import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/svdgv-icon-petrol.svg",
  },
  title: "DiGA e-Rezept einlösen | Spitzenverband Digitale Gesundheitsversorgung",
  description:
    "Lösen Sie Ihr e-Rezept für eine Digitale Gesundheitsanwendung (DiGA) ein. Wählen Sie Ihre DiGA und werden Sie direkt weitergeleitet.",
  keywords: [
    "DiGA",
    "e-Rezept",
    "Digitale Gesundheitsanwendung",
    "Spitzenverband Digitale Gesundheitsversorgung",
  ],
  openGraph: {
    type: "website",
    locale: "de_DE",
    title: "DiGA e-Rezept einlösen",
    description:
      "Lösen Sie Ihr e-Rezept für eine Digitale Gesundheitsanwendung (DiGA) ein.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
