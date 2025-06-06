import Page404 from "@/components/ui/404";
import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter, JetBrains_Mono, Montserrat } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "404 | The Steel Stingers",
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

export default function NotFound() {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${montserrat.variable}`}
      suppressHydrationWarning /* Official next-themes docs says this is needed */
    >
      <GoogleTagManager gtmId="GTM-TVVHSRLT" />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <Page404 />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
