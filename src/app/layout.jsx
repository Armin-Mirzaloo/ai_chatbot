import { Inter } from "next/font/google";
import "./globals.css";
import "./fonts.css";
import "@ant-design/v5-patch-for-react-19";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import MainLayout from "@/components/MainLayout";
import { AuthProvider } from "@/context/AuthContext";
import { LayoutProvider } from "@/context/LayoutContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ChatGPT Clone",
  description: "A ChatGPT clone built with Next.js",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-gray-50">
        <AntdRegistry>
          <AuthProvider>
            <LayoutProvider>
              <MainLayout>
                {children}
              </MainLayout>
            </LayoutProvider>
          </AuthProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}