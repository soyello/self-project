import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";

const fontNoto = localFont({ src: "./fonts/NotoSansKR-Regular.ttf" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={fontNoto.className}>
      <Component {...pageProps} />
      <div id="portal"></div>
    </main>
  );
}
