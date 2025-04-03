import "./globals.css";
import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Pokémon list powered by Next.js and TailWind",
};

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pressStart.className}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const theme = localStorage.getItem("theme");
              if (theme === "dark" || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add("dark");
              } else {
                document.documentElement.classList.remove("dark");
              }
            `,
          }}
        />
      </head>
      <body
        id="app-body"
        className="bg-white text-gray-900 dark:bg-slate-900 dark:text-white transition-colors duration-300"
      >
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-8 transition-colors duration-300">
          {children}
        </main>
      </body>
    </html>
  );
}
