"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AppLayout } from "@/components/AppLayout";
import "@ant-design/v5-patch-for-react-19";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <AppLayout>{children}</AppLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}
