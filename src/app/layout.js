import "./global.css";

export default function RootLayout({ children }) {

  return (
    <html>
      <head>
        <link rel="icon" type="image/x-icon" href="/images/favicon.svg" />
        <script src="https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js"></script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ER8WTG9D1Y"></script>
<script>
  dangerouslySetInnerHTML={{
    __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-ER8WTG9D1Y');
    `
  }}
  
</script>
        
      </head>
      <body>{children}</body>
    </html>
  );
}