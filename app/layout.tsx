import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FarcasterProvider from "@/components/farcasterprovider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mastermind",
  description: "A simple yet challenging color puzzle game that tests logic, pattern recognition, and strategic thinking.",
  metadataBase: new URL('https://mastermind-baseapp.vercel.app/'),
  openGraph: {
    title: "Mastermind",
    description: "A simple yet challenging color puzzle game that tests logic, pattern recognition, and strategic thinking.",
    url: "https://mastermind-baseapp.vercel.app",
    siteName: "Mastermind",
    images: [
      {
        url: "/media/frame.png",
        width: 1200,
        height: 630,
        alt: "Mastermind OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "Mastermind",
    description: "A simple yet challenging color puzzle game that tests logic, pattern recognition, and strategic thinking.",
    card: "summary_large_image",
    images: ["/media/frame.png"],
  },
  other: {
    "fc:frame": JSON.stringify({
    version: "next",
    imageUrl: "https://mastermind-baseapp.vercel.app/media/frame.png",
    button: {
      title: "Play Logic Game",
      action: {
        type: "launch_frame",
        name: "Mastermind Baseapp",
        url: "https://mastermind-baseapp.vercel.app",
        splashImageUrl: "https://mastermind-baseapp.vercel.app/media/images/syntax.png",
        splashBackgroundColor: "#000000",
      },
    },
  }),
    'base:app_id': '-',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FarcasterProvider>
        {children}
        </FarcasterProvider>
      </body>
    </html>
  );
}
