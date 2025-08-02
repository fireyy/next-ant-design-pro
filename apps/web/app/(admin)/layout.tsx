"use client";
// TODO: 这里应该不需要 use client

import { AppLayout } from "@/components";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppLayout>{children}</AppLayout>;
}
