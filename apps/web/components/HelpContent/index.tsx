"use client";

import { useState } from "react";
import type { ProHelpDataSourceChildren } from "@ant-design/pro-components";
import { ProHelp, ProHelpDrawer } from "@ant-design/pro-components";
import { Typography } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const Text = Typography.Text;

export default function HelpContent() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const map = new Map<
    string,
    (
      item: ProHelpDataSourceChildren<{
        video: React.VideoHTMLAttributes<HTMLVideoElement>;
        list: {
          title: string;
          children: {
            title: string;
            href: string;
          }[];
        };
      }>,
      index: number,
    ) => React.ReactNode
  >();

  map.set("video", (item) => {
    return (
      <video
        key=""
        style={{
          width: "100%",
        }}
        controls
        {...(item.children as React.VideoHTMLAttributes<HTMLVideoElement>)}
      />
    );
  });

  map.set("list", (item) => {
    const listConfig = item.children as {
      title: string;
      children: {
        title: string;
        href: string;
      }[];
    };
    return (
      <div>
        <h3
          style={{
            margin: "8px 0",
          }}
        >
          {listConfig.title}
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {listConfig.children.map((child, index) => {
            return (
              <div key={index}>
                <Text>
                  {child.href ? (
                    <a href={child.href}>{child.title}</a>
                  ) : (
                    child.title
                  )}
                </Text>
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <ProHelp<{
      video: React.VideoHTMLAttributes<HTMLVideoElement>;
      list: {
        title: string;
        children: {
          title: string;
          href: string;
        }[];
      };
    }>
      valueTypeMap={map}
      dataSource={[
        {
          title: "常见问题",
          key: "default",
          children: [
            {
              title: "如何开始操作数据授权？",
              key: "1",
              asyncLoad: true,
            },
            {
              title: "证据包内包含哪些内容，如何下载证据包？",
              key: "2",
              asyncLoad: true,
            },
          ],
        },
      ]}
      onLoadContext={async (key) => {
        if (key === "1") {
          return await fetch("/help/data1.json").then((res) => res.json());
        }
        return await fetch("/help/data2.json").then((res) => res.json());
      }}
    >
      <QuestionCircleOutlined onClick={() => setDrawerOpen(!drawerOpen)} />
      <ProHelpDrawer
        defaultSelectedKey="1"
        drawerProps={{
          open: drawerOpen,
          afterOpenChange(open) {
            setDrawerOpen(open);
          },
        }}
      />
    </ProHelp>
  );
}
