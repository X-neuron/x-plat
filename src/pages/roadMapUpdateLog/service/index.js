import { generatePath } from "react-router";
import request from "@/utils/request";

export async function getPosts() {
  return request("/post", {
    method: "get",
  });
}

export async function createPost(params) {
  return request("/post", {
    method: "post",
    data: params,
  });
}


