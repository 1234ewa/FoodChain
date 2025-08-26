import type { Metadata } from "next";
import { headers } from 'next/headers';
import './globals.css';
import ContextProvider from '@/context'

export const metadata: Metadata = {
  title: "FoodChain - Delivery con Blockchain",
  description: "Aplicación de delivery de alimentos con blockchain",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersData = await headers();
  const cookies = headersData.get('cookie');

  return (
    <html lang="es">
      <body>
        <ContextProvider cookies={cookies}>{children}</ContextProvider>
      </body>
    </html>
  );
}
