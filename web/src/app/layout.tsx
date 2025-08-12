import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "./landing.css";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "NEUR – Fair Sentencing Starts with Data You Can Trust",
  description: "Transparent tools for a more equitable court system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
