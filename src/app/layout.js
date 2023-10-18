import "./global.css";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link rel="icon" type="image/x-icon" href="/images/favicon.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
