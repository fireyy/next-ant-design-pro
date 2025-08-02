import type { Request, Response } from "express";
import menuData from "../../web/config/routes";

function getMenuData(req: Request, res: Response, u: string) {
  // TODO 通过权限切换menuData数据
  return res.json({
    success: true,
    data: menuData,
  });
}

export default {
  "GET /api/menuData": getMenuData,
};
