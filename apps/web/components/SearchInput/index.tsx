import { useIntl } from "@/lib/locales";
import { SearchOutlined } from "@ant-design/icons";
import { getMenuData } from "@ant-design/pro-components";
import { AutoComplete, Input, theme } from "antd";
import type { AutoCompleteProps } from "antd";
import routes from "@/config/routes";
import { config } from "@/config";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const searchMenuData = (
  menuData: API.MenuDataItem[],
  query: string,
): AutoCompleteProps["options"] => {
  const result: AutoCompleteProps["options"] = [];
  for (const route of menuData) {
    if (route.name?.toLowerCase().includes(query.toLowerCase())) {
      result.push({
        value: route.name,
        label: route.name,
        path: route.path,
      });
    }
    if (Array.isArray(route.children)) {
      result?.push(...(searchMenuData(route.children, query) || []));
    }
  }
  return result;
};

const SearchInput = () => {
  const { token } = theme.useToken();
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);
  const router = useRouter();
  const { formatMessage } = useIntl();

  const { menuData } = useMemo(
    () =>
      getMenuData(
        routes,
        {
          locale: config.layout?.menuLocale,
        },
        formatMessage,
      ),
    [formatMessage],
  );

  const searchResult = useCallback(
    (query: string) => {
      return searchMenuData(menuData, query);
    },
    [menuData],
  );

  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (
    value: string,
    option: NonNullable<AutoCompleteProps["options"]>[0],
  ) => {
    router.push(option.path);
  };

  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineStart: 24,
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <AutoComplete
        popupMatchSelectWidth={252}
        allowClear={true}
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
      >
        <Input
          style={{
            borderRadius: 4,
            backgroundColor: token.colorBgTextHover,
          }}
          prefix={
            <SearchOutlined
              style={{
                color: token.colorTextLightSolid,
              }}
            />
          }
          placeholder="搜索菜单"
          variant="borderless"
        />
      </AutoComplete>
    </div>
  );
};

export default SearchInput;
