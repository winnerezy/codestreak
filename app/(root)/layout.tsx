import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const metadata = {
    title: "CodeStreak"
  }
  return (
    <main className="flex flex-col items-center">
      <Header />
      <div className="w-full max-w-7xl flex min-h-screen px-4">{children}</div>
    </main>
  );
}
