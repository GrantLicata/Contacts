import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Provider from "@/providers/SessionProvider";
import { Suspense } from "react";
import Loading from "./loading";
import { AuthContextProvider } from "@/context/AuthContext";

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
          <AuthContextProvider>
            {children}
            <Analytics />
            <Suspense fallback={<Loading />} />
          </AuthContextProvider>
        </Provider>
      </body>
    </html>
  );
}
