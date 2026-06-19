import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProviders from "@/Providers /ThemeProviders";
import Navbar from "@/components/shared /Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gymora | Fitness & Gym Management Platform",
  description:
    "Gymora is a modern fitness and gym management platform for members, trainers, and administrators, featuring class booking, trainer applications, community forums, and powerful role-based management tools.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
        </ThemeProviders>
      </body>
    </html>
  );
}
