"use client";
// TODO: 这里应该不需要 use client

import React from "react";
import "./globals.css";
import { LocaleProvider } from "@/components";

type LayoutProps = {
  params: { locale: string };
  children: React.ReactNode;
};

export default function RootLayout({
  children,
  params,
}: Readonly<LayoutProps>) {
  const { locale } = params;

  return (
    <html lang={locale}>
      <body>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
