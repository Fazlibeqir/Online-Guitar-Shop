import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloProvider } from "@/providers/ApolloProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VibeStrings Guitar Shop",
  description: "Browse top quality guitars online with VibeStrings",
  // 🎸 Developer Note: This project was crafted with love for guitars and coding
  // Built by [Your Name] - A passionate developer who loves both music and technology
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
