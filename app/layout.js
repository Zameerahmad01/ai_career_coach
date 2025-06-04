import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";
import Providers from "../hooks/providers";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "SensAI",
  description: "SensAI is a platform for AI-powered career coaching",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          <Providers>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {/* Header */}
              <Header />
              <main className="min-h-screen">{children}</main>
              <Toaster />
              {/* Footer */}
              <footer className="bg-muted/80 py-12">
                <div className="container mx-auto px-4  text-center">
                  <p className=" text-gray-200">Made with ❤️ by Zameer.Dev</p>
                </div>
              </footer>
            </ThemeProvider>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
