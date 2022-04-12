import { generatePath } from "react-router";
import request from "@/utils/request";

export async function getRoles(params) {
  return request("/role", {
    method: "get",
    params: {
      page: params.current,
      take: params.pageSize,
    },
  });
}

export async function createRole(params) {
  return request("/role", {
    method: "post",
    data: params,
  });
}

export async function updateRole(id,params) {
  return request(generatePath("/role/:id", { id }), {
    method: "patch",
    data: params,
  });
}

export async function getRolePermission(id) {
  return request(generatePath("/role/:id/permission", { id }), {
    method: "get",
  });
}
