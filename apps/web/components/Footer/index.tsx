import { CaretUpOutlined, GithubOutlined } from "@ant-design/icons";
import { DefaultFooter } from "@ant-design/pro-components";
import React from "react";

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: "none",
      }}
      copyright="Powered by Ant Desgin and Next.js"
      links={[
        {
          key: "Next.js",
          title: (
            <>
              <svg
                width="12"
                height="12"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_977_547)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.5 3L18.5 17H2.5L10.5 3Z"
                    fill="rgba(0,0,0,0.65)"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_977_547">
                    <rect
                      width="16"
                      height="16"
                      fill="rgba(0,0,0,0.65)"
                      transform="translate(2.5 2)"
                    />
                  </clipPath>
                </defs>
              </svg>
              Next.js
            </>
          ),
          href: "https://nextjs.org",
          blankTarget: true,
        },
        {
          key: "Ant Design Pro",
          title: "Ant Design Pro",
          href: "https://pro.ant.design",
          blankTarget: true,
        },
        {
          key: "github",
          title: <GithubOutlined />,
          href: "https://github.com/ant-design/ant-design-pro",
          blankTarget: true,
        },
        {
          key: "Ant Design",
          title: "Ant Design",
          href: "https://ant.design",
          blankTarget: true,
        },
        {
          key: "Ant Design Pro for Next.js",
          title: "Ant Design Pro for Next.js",
          href: "https://github.com/fireyy/next-ant-design-pro",
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
