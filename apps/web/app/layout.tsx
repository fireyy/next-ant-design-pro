"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@ant-design/v5-patch-for-react-19";
import React from "react";
import "./globals.css";
import {
  RawIntlProvider,
  getLocale,
  getDirection,
  setIntl,
  getIntl,
  localeInfo,
  event,
  LANG_CHANGE_EVENT,
} from "@/lib/locales/localeExports";
import moment from "dayjs";
import { ConfigProvider } from "antd";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  typeof window.document.createElement !== "undefined"
    ? React.useLayoutEffect
    : React.useEffect;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initLocale = getLocale();
  const [locale, setLocale] = React.useState(initLocale);
  const [intl, setContainerIntl] = React.useState(() => getIntl(locale, true));

  const handleLangChange = (locale: string) => {
    if (moment?.locale) {
      moment.locale(localeInfo[locale]?.momentLocale || "en");
    }
    setLocale(locale);
    setContainerIntl(getIntl(locale));
  };

  useIsomorphicLayoutEffect(() => {
    event.on(LANG_CHANGE_EVENT, handleLangChange);
    return () => {
      event.off(LANG_CHANGE_EVENT, handleLangChange);
    };
  }, []);
  const defaultAntdLocale = {};
  const direction = getDirection();

  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider
            direction={direction}
            locale={localeInfo[locale]?.antd || defaultAntdLocale}
          >
            <RawIntlProvider value={intl}>{children}</RawIntlProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
