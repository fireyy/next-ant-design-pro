import { request } from "@/services";

export async function fakeSubmitForm(params: any) {
  return request("/api/basicForm", {
    method: "POST",
    data: params,
  });
}
