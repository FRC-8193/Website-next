import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter, JetBrains_Mono, Montserrat } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TRPCReactProvider } from "../trpc/react";
import { ThemeProvider } from "@/components/ui/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "The Steel Stingers",
    template: "%s | The Steel Stingers",
  },
  description: "Official website of FRC Team 8193 Steel Stingers",
  icons: [{ rel: "icon", url: "/favicons/favicon.ico" }],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "700", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${montserrat.variable}`}
    >
      <body className="min-h-screen bg-white text-black antialiased dark:bg-zinc-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-grow dark:bg-zinc-900">{children}</main>
              <Footer />
            </div>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
