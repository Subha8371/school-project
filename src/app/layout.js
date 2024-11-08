"use client";
import localFont from "next/font/local";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import Loading from "./loading";
import { Suspense, useEffect, useState } from 'react';
import Navbar from "@/component/Navbar";
import Navbar2 from "@/component/Navbar2";
import Footer from "@/component/Footer";
import StoreProvider from "./StoreProvider";
import { useRouter } from "next/navigation";

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
  
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StoreProvider>
          <Suspense fallback={<Loading />}>
            {/* {isAuthenticated ? <Navbar2 /> : <Navbar />} */}
        
            {children}
            <Footer />
          </Suspense>
        </StoreProvider>
      </body>
    </html>
  );
}
