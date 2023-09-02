import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Provider from "@/components/Provider";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Contacts",
  description:
    "Contact management application testing the features of MongoDB Atlas and Next.js 13 API router",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-200">
        <Provider>
          {children}
          <Analytics />
        </Provider>
      </body>
    </html>
  );
}
