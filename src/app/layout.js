import "./global.css";
import { GoogleTagManager } from '@next/third-parties/google'

export default function RootLayout({ children }) {

  return (
    <html>
      <head>
        <link rel="icon" type="image/x-icon" href="/images/favicon.svg" />
        <script src="https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js"></script>
      </head>
      <body>{children}</body>
      <GoogleTagManager gtmId="GTM-MP7HMDC6"/>
    </html>
  );
}