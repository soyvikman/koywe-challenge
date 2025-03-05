import Header from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <title>Cotizaciones</title>
      <meta name="description" content="Technical Test" />
      <Header />
      <Component {...pageProps} />;
    </>
  );
}
