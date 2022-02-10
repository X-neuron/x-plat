import request from "@/utils/request";

export async function getUsers(params) {
  return request("/users", {
    method: "get",
    params: {
      page: params.current,
      take: params.pageSize,
    },
  });
}
