import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        {/* <link
            rel="shortcut icon"
            href="images/ico/favicon.ico"
            type="image/x-icon"
          ></link>
          <link
            rel="apple-touch-icon"
            href="images/ico/apple-touch-icon.png"
          ></link>
          <link
            rel="icon"
            href="images/ico/favicon-16x16.png"
            type="image/png"
            sizes="16x16"
          ></link>
          <link
            rel="icon"
            href="images/ico/favicon-32x32.png"
            type="image/png"
            sizes="32x32"
          ></link>
          <link
            rel="icon"
            href="images/ico/android-chrome-192x192.png"
            type="image/png"
            sizes="192x192"
          ></link>
          <link
            rel="icon"
            href="images/ico/android-chrome-512x512.png"
            type="image/png"
            sizes="512x512"
          ></link> */}
        <meta
          name="description"
          content="Logg Easy - Sistema de Autenticação"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
