import { request } from "@/services";
import type { ListItemDataType, Params } from "./data";

export async function queryFakeList(
  params: Params
): Promise<{ data: { list: ListItemDataType[] } }> {
  return request("/api/fake_list", {
    params,
  });
}
