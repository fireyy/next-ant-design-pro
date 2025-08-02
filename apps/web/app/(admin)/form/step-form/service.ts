import { request } from "@/services";

export async function fakeSubmitForm(params: any) {
  return request("/api/stepForm", {
    method: "POST",
    data: params,
  });
}
