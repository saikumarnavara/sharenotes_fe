// import localFont from "next/font/local";
// import "./globals.css";

// // Import Google AdSense script using `dangerouslySetInnerHTML`
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata = {
//   title: "Share notes",
//   description: "Created by Growmore",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         {/* Google AdSense Script */}
//         <script
//           async
//           src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
//         ></script>
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `
//               (adsbygoogle = window.adsbygoogle || []).push({
//                 google_ad_client: "ca-pub-7731288521795910",
//                 enable_page_level_ads: true
//               });
//             `,
//           }}
//         />
//       </head>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }
"use client";
import localFont from "next/font/local";
import { useEffect } from "react";
import "./globals.css";

// Load custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  useEffect(() => {
    // Add Google AdSense script on the client side
    const adsScript = document.createElement("script");
    adsScript.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    adsScript.async = true;
    document.head.appendChild(adsScript);

    // Initialize AdSense after the script loads
    adsScript.onload = () => {
      (window.adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: "ca-pub-7731288521795910",
        enable_page_level_ads: true,
      });
    };
  }, []);

  return (
    <html lang="en">
      <head>
        {/* SEO Metadata */}
        <title>Share-Notes - Secure Information Sharing</title>
        <meta
          name="description"
          content="Share-Notes is a platform for real-time, secure note sharing. Created by Growmore."
        />
        <meta
          name="keywords"
          content="secure sharing, real-time notes, code snippets, privacy, information sharing"
        />

        {/* Open Graph Metadata */}
        <meta
          property="og:title"
          content="Share-Notes - Real-Time & Secure Information Sharing"
        />
        <meta
          property="og:description"
          content="Experience secure, private, and time-limited information sharing with Share-Notes."
        />
        <meta property="og:url" content="https://share-notes-five.vercel.app" />
        <meta
          property="og:image"
          content="https://share-notes-five.vercel.app/og-image.jpg"
        />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Share-Notes - Secure & Real-Time Information Sharing"
        />
        <meta
          name="twitter:description"
          content="Share notes, code, and media securely and privately with time-limited access."
        />
        <meta
          name="twitter:image"
          content="https://share-notes-five.vercel.app/twitter-image.jpg"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
