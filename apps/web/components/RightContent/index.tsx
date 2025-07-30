import { FlagOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import HeaderDropdown from "../HeaderDropdown";

export type SiderTheme = "light" | "dark";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "English",
  },
  {
    key: "2",
    label: "中文",
  },
];

export const SelectLang: React.FC = () => {
  return (
    <HeaderDropdown menu={{ items }} placement="bottomLeft">
      <FlagOutlined />
    </HeaderDropdown>
  );
};

export const Question: React.FC = () => {
  return (
    <a
      href="https://pro.ant.design/docs/getting-started"
      target="_blank"
      rel="noreferrer"
      style={{
        display: "inline-flex",
        padding: "4px",
        fontSize: "18px",
        color: "inherit",
      }}
    >
      <QuestionCircleOutlined />
    </a>
  );
};
