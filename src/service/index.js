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

export async function getCategoryTreeByName(name) {
  return request("/category", {
    method: "get",
    params: {
      name,
      ctype: "tree",
    },
  });
}
