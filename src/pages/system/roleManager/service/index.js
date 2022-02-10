import request from "@/utils/request";

export async function getRoles(params) {
  return request("/roles", {
    method: "get",
    params: {
      page: params.current,
      take: params.pageSize,
    },
  });
}

export async function createRole(params) {
  return request("/roles", {
    method: "post",
    data: params,
  });
}
