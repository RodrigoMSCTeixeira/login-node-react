import { AppProps } from "next/app";
import "../styles/_reset.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
