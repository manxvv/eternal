import type { Metadata } from "next";
import "./globals.css"; // Ensure path is correct
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title: "Eternal — The Art of Slow Luxury",
    description: "Curated teas, artisanal coffee, and sustainable drinkware.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <QueryProvider>
      <Toaster />

                   
                        
                            {children}
                     
                </QueryProvider>
            </body>
        </html>
    );
}