// 初始化的全局请求放这
// 组件的请求方组件的 service 目录下
import { generatePath } from "react-router";
import request from "@/utils/request";

export async function getCategoryDescendantByName(name) {
  return request("/category", {
    method: "get",
    params: {
      name,
      ctype: "descendant",
    },
  });
}

export async function getOrganizationDescendantByName(name) {
  return request("/organization", {
    method: "get",
    params: {
      name,
      ctype: "descendant",
    },
  });
}

export async function getOrganizationTreeByName(name) {
  return request("/organization", {
    method: "get",
    params: {
      name,
      ctype: "tree",
    },
  });
}

export async function getOrganizationRootChildrenTreeByName(name) {
  return request(generatePath("/organization/root/:name", { name }), {
    method: "get",
  });
}

export async function getAsyncOrganizationTreeById(id) {
  return request(generatePath("/organization/:id", { id }), {
    method: "get",
  });
}

export async function getOrganizationUserTreeById(id) {
  return request(generatePath("/organization/:id/user", { id }), {
    method: "get",
  });
}

export async function getOrganizationsAndUserTreeById(id) {
  return request(generatePath("/organization/:id/organduser", { id }), {
    method: "get",
  });
}

export async function getCategoryTreeByName(name) {
  return request("/category", {
    method: "get",
    params: {
      name,
      ctype: "tree",
    },
  });
}

export async function getAllRoles() {
  return request("/role/all", {
    method: "get",
  });
}

export async function getAllResources() {
  return request("/resource/all", {
    method: "get",
  });
}


export async function logout() {
  return request("/auth/logout", {
    method: "get",
  });
}

export async function fastLogin() {
  return request("/auth/fastLogin", {
    method: "get",
  });
}