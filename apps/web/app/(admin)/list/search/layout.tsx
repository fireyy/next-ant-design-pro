"use client";
import { PageContainer } from "@ant-design/pro-components";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "antd";
import React from "react";

const tabList = [
  {
    key: "articles",
    tab: "文章",
  },
  {
    key: "projects",
    tab: "项目",
  },
  {
    key: "applications",
    tab: "应用",
  },
];

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const handleTabChange = (key: string) => {
    const url = "/list/search";
    switch (key) {
      case "articles":
        router.push(`${url}/articles`);
        break;
      case "applications":
        router.push(`${url}/applications`);
        break;
      case "projects":
        router.push(`${url}/projects`);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = (value: string) => {
    console.log(value);
  };

  const getTabKey = () => {
    const tabKey = pathname.substring(pathname.lastIndexOf("/") + 1);
    if (tabKey && tabKey !== "/") {
      return tabKey;
    }
    return "articles";
  };

  return (
    <PageContainer
      content={
        <div style={{ textAlign: "center" }}>
          <Input.Search
            placeholder="请输入"
            enterButton="搜索"
            size="large"
            onSearch={handleFormSubmit}
            style={{ maxWidth: 522, width: "100%" }}
          />
        </div>
      }
      tabList={tabList}
      tabActiveKey={getTabKey()}
      onTabChange={handleTabChange}
    >
      {children}
    </PageContainer>
  );
}
