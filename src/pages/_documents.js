import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Variable Fonts for Better Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Headlines: Merriweather Variable */}
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300..900&display=swap" rel="stylesheet" />
        
        {/* Body Text: Inter Variable */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..900&display=swap" rel="stylesheet" />
        
        {/* Arabic: Tajawal Variable + Cairo for body */}
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300..900&family=Cairo:wght@300..900&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
