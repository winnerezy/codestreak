import type { Metadata } from "next";
import Header from "../../components/Header";
import React from "react"

export const metadata: Metadata = {
  title: "CodeSnip",
  description: "A code snippet creator",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <section className="min-h-screen flex flex-col gap-2">
    <Header/>
  <div className="w-full max-w-7xl flex flex-col items-center mx-auto px-4">
  {children}
  </div>
  </section>
  );
}
