import React from "react";
import {
  SmileOutlined,
  DashboardOutlined,
  FormOutlined,
  TableOutlined,
  ProfileOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  UserOutlined,
} from "@ant-design/icons";

const icons: Record<string, React.ComponentType> = {
  SmileOutlined,
  DashboardOutlined,
  FormOutlined,
  TableOutlined,
  ProfileOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  UserOutlined,
};

function formatIcon(name: string) {
  return name
    .replace(name[0], name[0].toUpperCase())
    .replace(/-(w)/g, function (all, letter) {
      return letter.toUpperCase();
    });
}

export function patchRoutes(routes: API.MenuDataItem[]): API.MenuDataItem[] {
  routes.forEach((route) => {
    const { icon } = route;
    if (icon && typeof icon === "string") {
      const upperIcon = formatIcon(icon);
      if (icons[upperIcon] || icons[upperIcon + "Outlined"]) {
        route.icon = React.createElement(
          icons[upperIcon] || icons[upperIcon + "Outlined"],
        );
      }
    }
  });

  return routes;
}
