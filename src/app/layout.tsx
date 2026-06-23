import type { Metadata } from "next";
import "./globals.css";
import { LocaleProvider } from "@/lib/locale-context";

export const metadata: Metadata = {
  title: "Senpai — Learn Japanese, work in Japan",
  description:
    "Chat with anime-style senpai AIs, study for the JLPT, and get matched with jobs in Japan. A Southeast Asia → Japan learning & career platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
