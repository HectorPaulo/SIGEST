import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/utils/context/ThemeContext/ThemeContext";
import { UserProvider } from "@/utils/context/UserContext/UserContext";
import DialogsProvider from "@/hooks/useDialogs/DialogsProvider";
import NotificationsProvider from "@/hooks/useNotifications/NotificationsProvider";
// Importar configuración de axios
import "@/lib/axios";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SIGEST",
  description: "Sistema de Gestión de Servicios Universitarios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <UserProvider>
            <NotificationsProvider>
              <DialogsProvider>
                {children}
              </DialogsProvider>
            </NotificationsProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
