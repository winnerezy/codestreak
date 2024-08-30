'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
    <html lang="en" className="dark">
      <body >
       <section>
        {children}
       </section>
      </body>
    </html>
    </QueryClientProvider>

  );
}
