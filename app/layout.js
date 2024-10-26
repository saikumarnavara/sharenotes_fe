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
        <title>
          Share-Notes - Online Notepad for Secure Code & Note Sharing
        </title>
        <meta
          name="description"
          content="Share-Notes is a secure platform for sharing notes, code snippets, and text in real-time. Perfect for online notepad, private sharing, and time-limited access to information."
        />
        <meta
          name="keywords"
          content="share notes online,code share online ,growmore noteshare,growmore software,saikumar navara,sai kumar n, navara, online notepad, secure notepad, code sharing online, real-time text sharing, share images securely, share code snippets, privacy-focused sharing, free online notepad, instant note sharing, online document sharing"
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Share-Notes - Online Notepad for Secure Code & Note Sharing"
        />
        <meta
          property="og:description"
          content="Easily share notes, code, and images securely with Share-Notes. Time-limited access and privacy-focused sharing, optimized for real-time collaboration."
        />
        <meta property="og:url" content="https://share-notes-five.vercel.app" />
        <meta
          property="og:image"
          content="https://share-notes-five.vercel.app/og-image.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Share-Notes - Online Notepad for Secure Code & Note Sharing"
        />
        <meta
          name="twitter:description"
          content="Share notes, code, and media in real-time with secure, private, and time-limited access. Perfect for developers, students, and secure online note sharing."
        />
        <meta
          name="twitter:image"
          content="https://share-notes-five.vercel.app/twitter-image.jpg"
        />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="Growmore" />
        <meta name="language" content="English" />
        <meta name="rating" content="General" />
        <meta name="distribution" content="Global" />

        <link rel="canonical" href="https://share-notes-five.vercel.app" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
