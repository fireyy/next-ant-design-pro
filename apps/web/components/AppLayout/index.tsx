"use client";

import { useRouter, usePathname } from "next/navigation";
import { Input, Skeleton, Space } from "antd";
import { SettingDrawer } from "@ant-design/pro-components";
import type { ProLayoutProps, MenuDataItem } from "@ant-design/pro-components";
import { LinkOutlined, SearchOutlined } from "@ant-design/icons";
import { AvatarDropdown, AvatarName, Footer, Question, SelectLang } from "..";
import Link from "next/link";
import { useAtom, useAtomValue } from "jotai";
import { globalSettings, globalUserInfo } from "@/stores";
import { config, type ISettings } from "@/config";
import { getMenuData } from "@/services/api";
import { useIntl } from "@/lib/locales";
import { patchRoutes } from "@/lib/patchRoutes";
import menuData from "@/config/routes";
import dynamic from "next/dynamic";
import SearchInput from "../SearchInput";
import { GithubLink } from "../RightContent";
import {
  useState,
  type CompositionEvent,
  type ChangeEvent,
  useMemo,
} from "react";
import { debounce } from "lodash";

const ProLayout = dynamic(
  () => import("@ant-design/pro-components").then((mod) => mod.ProLayout),
  {
    ssr: false,
    loading: () => (
      <Skeleton style={{ margin: "24px 40px", height: "60vh" }} active />
    ),
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

const filterByMenuData = (
  data: MenuDataItem[],
  keyWord: string,
): MenuDataItem[] =>
  data
    .map((item) => {
      if (item.name?.includes(keyWord)) {
        return { ...item };
      }
      const children = filterByMenuData(item.children || [], keyWord);
      if (children.length > 0) {
        return { ...item, children };
      }
      return undefined;
    })
    .filter((item) => item) as MenuDataItem[];

// const getOpenKeysByMenuData = (data: API.MenuDataItem[]): string[] =>
//   data.reduce((acc: string[], item) => {
//     if (item.routes && item.routes.length > 0 && item.path) {
//       acc.push(item.path);
//       const routes = getOpenKeysByMenuData(item.routes || []);
//       if (routes.length > 0) {
//         return [...acc, ...routes];
//       }
//       return acc;
//     }
//     return acc;
//   }, []) as string[];

const useLayoutProps: RunTimeLayoutConfig = ({
  currentUser,
  settings,
}: IGetLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { formatMessage } = useIntl();
  const [keyWord, setKeyWord] = useState("");
  const [isComposing, setComposing] = useState(false);

  const onMenuSearchChange = (value: string) => {
    setKeyWord(value);
  };

  const handleMenuSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isComposing) {
      onMenuSearchChange(event.target.value);
    }
  };

  const handleCompositionStart = () => {
    setComposing(true);
  };

  const handleCompositionEnd = (event: CompositionEvent<HTMLInputElement>) => {
    setComposing(false);
    onMenuSearchChange(event.currentTarget.value);
  };

  return {
    location: {
      pathname,
    },
    siderWidth: 256,
    menu: {
      locale: config.layout?.menuLocale,
      params: currentUser,
      request: async () => {
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
          <Link href={menuItemProps.path} target={menuItemProps.target}>
            {defaultDom}
          </Link>
        );
      }
      return defaultDom;
    },
    menuExtraRender: ({ collapsed }) =>
      !collapsed && (
        <Space align="center">
          <Input
            addonBefore={<SearchOutlined />}
            placeholder="搜索菜单"
            allowClear={true}
            variant="filled"
            onChange={debounce(handleMenuSearchChange, 200)}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
          />
        </Space>
      ),
    postMenuData: (menus) => filterByMenuData(menus || [], keyWord),
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
    actionsRender: (props) => [
      props.layout !== "side" ? <SearchInput /> : undefined,
      <Question key="doc" />,
      <GithubLink key="GithubFilled" />,
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
    ...config.layout,
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
