/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Indoor Duration App",
  description: "Pantau dan analisis durasi aktivitas asisten di dalam ruangan secara mudah dan akurat. Solusi terbaik untuk manajemen waktu indoor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content="Pantau dan analisis durasi aktivitas asisten di dalam ruangan secara mudah dan akurat. Solusi terbaik untuk manajemen waktu indoor."
        />
        <meta name="keywords" content="indoor durasi udinus, indoor, durasi, tracker, aktivitas asisten, manajemen waktu" />
        <meta name="author" content="Gayuh Widyanata, Dzawil Uquz, Alifian Ilham Febriyana" />
        <meta name="robots" content="index, follow" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css" rel="stylesheet" />
      </head>
      <body
        className="font-poppins"
      >
        {children}
        <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script>
      </body>
    </html>
  );
}
