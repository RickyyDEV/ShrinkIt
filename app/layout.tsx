import type { Metadata } from "vinext/shims/metadata";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShrinkIt - Encurtador de URLs",
  description: "Encurte seus links de forma rápida e simples.",
  icons: {
    icon: "/icon",
    apple: "/icon",
    shortcut: "/icon",
  },
  openGraph: {
    title: "ShrinkIt - Encurtador de URLs",
    description: "Encurte seus links de forma rápida e simples.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary",
    title: "ShrinkIt - Encurtador de URLs",
    description: "Encurte seus links de forma rápida e simples.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
