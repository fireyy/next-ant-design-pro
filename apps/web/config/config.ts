import defaultSettings, { ISettings } from "./defaultSettings";
import { IntlCache, createIntl } from "react-intl";

type OptionalIntlConfig = Omit<
  Parameters<typeof createIntl>[0],
  "locale" | "defaultLocale"
>;
export interface IConfig {
  title: string;
  layout?: {
    locale: boolean;
  } & ISettings;
  locale?: {
    default: string;
    antd: boolean;
    baseNavigator: boolean;
    getLocale?: () => string;
    cache?: IntlCache;
    intlConfig?: OptionalIntlConfig;
  };
  request?: {
    baseURL: string;
  };
}

export default {
  /**
   * @name layout 配置
   */
  title: "Ant Design Pro for Next.js",
  layout: {
    locale: true,
    ...defaultSettings,
  },
  /**
   * @name 国际化
   */
  locale: {
    // default zh-CN
    default: "zh-CN",
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
    // getLocale: () => {
    //   return "zh-CN";
    // },
    // react-intl config
    // intlConfig: {}
  },
  /**
   * @name 网络请求配置
   * @description 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
   */
  request: {
    baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  },
} as IConfig;
