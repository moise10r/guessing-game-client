import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Providers } from "./providers";
import { Toaster, toast } from 'sonner'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Guessing game",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className='' suppressHydrationWarning={true}>
        <Toaster position="top-left" />
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}
