"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@ant-design/v5-patch-for-react-19";
import {
  RawIntlProvider,
  getLocale,
  getDirection,
  getIntl,
  localeInfo,
  event,
  LANG_CHANGE_EVENT,
} from "@/lib/locales/localeExports";
import moment from "dayjs";
import { ConfigProvider } from "antd";
import React from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  typeof window.document.createElement !== "undefined"
    ? React.useLayoutEffect
    : React.useEffect;

export default function LocaleProvider({ children }: React.PropsWithChildren) {
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
    const _root = document.querySelector("#root");
    if (_root) {
      _root.classList.add("hidden");
      _root.innerHTML = "";
    }
    event.on(LANG_CHANGE_EVENT, handleLangChange);
    return () => {
      event.off(LANG_CHANGE_EVENT, handleLangChange);
    };
  }, []);
  const defaultAntdLocale = {};
  const direction = getDirection();

  return (
    <AntdRegistry>
      <ConfigProvider
        direction={direction}
        locale={localeInfo[locale]?.antd || defaultAntdLocale}
      >
        <RawIntlProvider value={intl}>{children}</RawIntlProvider>
      </ConfigProvider>
      <div id="root">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            minHeight: "362px",
          }}
        >
          <div className="page-loading-warp">
            <div className="ant-spin ant-spin-lg ant-spin-spinning">
              <span className="ant-spin-dot ant-spin-dot-spin">
                <i className="ant-spin-dot-item"></i>
                <i className="ant-spin-dot-item"></i>
                <i className="ant-spin-dot-item"></i>
              </span>
            </div>
          </div>
          <div className="loading-title">正在加载资源</div>
          <div className="loading-sub-title">
            初次加载资源可能需要较多时间 请耐心等待
          </div>
        </div>
      </div>
    </AntdRegistry>
  );
}
