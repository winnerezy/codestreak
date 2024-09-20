import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Auth"
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <section className="grid place-items-center min-h-screen">
    {children}
  </section>
  );
}
