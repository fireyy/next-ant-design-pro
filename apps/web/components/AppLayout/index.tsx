"use client";

import dynamic from "next/dynamic";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SettingDrawer } from "@ant-design/pro-components";
import type { ProLayoutProps } from "@ant-design/pro-components";
import { LinkOutlined } from "@ant-design/icons";
import { AvatarDropdown, AvatarName, Footer, Question, SelectLang } from "..";
import Link from "next/link";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { globalSettings, globalUserInfo } from "@/stores";
import type { ISettings } from "@/config";
import { getMenuData } from "@/services/api";
import { useIntl } from "@/lib/locales";
import { patchRoutes } from "@/lib/patchRoutes";
import menuData from "@/config/routes";

// 使用动态加载的方式，可以使部分组件在客户端渲染完成后再执行
const ProLayout = dynamic(
  () => import("@ant-design/pro-components").then((mod) => mod.ProLayout),
  {
    ssr: false,
  },
);

const isDev = process.env.NODE_ENV === "development";
const isDevOrTest = isDev || process.env.CI;
const loginPath = "/user/login";

type IGetLayoutProps = {
  currentUser: API.CurrentUser | undefined;
  settings: ISettings;
};

type RunTimeLayoutConfig = (initData: IGetLayoutProps) => ProLayoutProps;

const useLayoutProps: RunTimeLayoutConfig = ({
  currentUser,
  settings,
}: IGetLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { formatMessage } = useIntl();
  return {
    location: {
      pathname,
    },
    siderWidth: 256,
    menu: {
      locale: true,
      params: currentUser,
      request: async (_params, _defaultMenuData) => {
        const { data } = isDev ? await getMenuData() : { data: menuData };
        return patchRoutes(data);
      },
    },
    formatMessage: formatMessage,
    menuItemRender: (menuItemProps, defaultDom) => {
      if (menuItemProps.isUrl || menuItemProps.children) {
        return defaultDom;
      }
      if (menuItemProps.path && location.pathname !== menuItemProps.path) {
        return (
          // handle wildcard route path, for example /slave/* from qiankun
          <Link
            href={menuItemProps.path.replace("/*", "")}
            target={menuItemProps.target}
          >
            {defaultDom}
          </Link>
        );
      }
      return defaultDom;
    },
    itemRender: (route, _, routes) => {
      const { title, path } = route;
      const last = routes[routes.length - 1];
      if (last) {
        if (last.path === path) {
          return <span>{title}</span>;
        }
      }
      return <Link href={path || "/"}>{title}</Link>;
    },
    actionsRender: () => [
      <Question key="doc" />,
      <SelectLang key="SelectLang" />,
    ],
    avatarProps: {
      src: currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => (
        <AvatarDropdown>{avatarChildren}</AvatarDropdown>
      ),
    },
    waterMarkProps: {
      content: currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      // 如果没有登录，重定向到 login
      if (!currentUser && pathname !== loginPath) {
        router.push(loginPath);
      }
    },
    bgLayoutImgList: [
      {
        src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr",
        left: 85,
        bottom: 100,
        height: "303px",
      },
      {
        src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr",
        bottom: -68,
        right: -45,
        height: "303px",
      },
      {
        src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr",
        bottom: 0,
        left: 0,
        width: "331px",
      },
    ],
    links: isDevOrTest
      ? [
          <Link
            key="openapi"
            href="https://github.com/fireyy/next-ant-design-pro"
            target="_blank"
          >
            <LinkOutlined />
            <span>Github</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    ...settings,
  };
};

export default function AppLayout(props: React.PropsWithChildren) {
  const { children } = props;
  const currentUser = useAtomValue(globalUserInfo);
  const [settings, setSettings] = useAtom(globalSettings);
  const layoutProps = useLayoutProps({ currentUser, settings });

  return (
    <ProLayout {...layoutProps}>
      {children}
      {isDevOrTest && (
        <SettingDrawer
          disableUrlParams
          enableDarkTheme
          settings={settings}
          onSettingChange={(settings) => {
            setSettings(settings);
          }}
        />
      )}
    </ProLayout>
  );
}
