import { request } from "@/services";
import type { TagType } from "./data";

export async function queryTags(): Promise<{ data: { list: TagType[] } }> {
  return request("/api/tags");
}
