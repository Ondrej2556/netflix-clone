import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Domovská obrazovka - Netflix",
  description: "Netlfix Clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
