"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ProLayout, SettingDrawer } from "@ant-design/pro-components";
import type { ProLayoutProps } from "@ant-design/pro-components";
import { LinkOutlined } from "@ant-design/icons";
import { AvatarDropdown, AvatarName, Footer, Question, SelectLang } from "..";
import Link from "next/link";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { globalSettings, globalUserInfo } from "@/stores";
import type { ISettings } from "@/config";

const isDev = process.env.NODE_ENV === "development";
const isDevOrTest = isDev || process.env.CI;
const loginPath = "/user/login";

type IGetLayoutProps = {
  currentUser: API.CurrentUser | null;
  settings: ISettings;
};

type RunTimeLayoutConfig = (initData: IGetLayoutProps) => ProLayoutProps;

const useLayoutProps: RunTimeLayoutConfig = ({
  currentUser,
  settings,
}: IGetLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  return {
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

export const AppLayout = (props: React.PropsWithChildren) => {
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
};
