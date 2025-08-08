import { GithubFilled } from "@ant-design/icons";
import { SelectLang as SelectLangComponent } from "@/lib/locales";
import HelpContent from "@/components/HelpContent";

export type SiderTheme = "light" | "dark";

export const SelectLang: React.FC = () => {
  return (
    <SelectLangComponent
      style={{
        padding: 4,
      }}
    />
  );
};

export const Question: React.FC = () => {
  return <HelpContent />;
};

export const GithubLink: React.FC = () => {
  return (
    <a
      href="https://github.com/fireyy/next-ant-design-pro"
      target="_blank"
      rel="noreferrer"
      style={{
        display: "inline-flex",
        padding: "4px",
        fontSize: "18px",
        color: "inherit",
      }}
    >
      <GithubFilled />
    </a>
  );
};
