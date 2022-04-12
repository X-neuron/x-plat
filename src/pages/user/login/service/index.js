import request from "@/utils/request";

export async function accountLogin(params) {
  return request("/auth/login", {
    method: "post",
    data: params
  });
}


// export async function fastLogin(params) {
//   return request("/auth/fastLogin", {
//     method: "post",
//     data: params
//   });
// }



export async function getCaptcha(mobile) {
  return request(`/auth/login/captcha?mobile=${mobile}`);
}


