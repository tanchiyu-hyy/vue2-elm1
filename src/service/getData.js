import http from "@/utils/http";
import { getStore } from "@/config/mUtils";

export async function getCity(opt) {
  return http
    .get(`/v1/cities?type=${opt}`)
    .then(({ status, data }) => ({ status, data }))
    .catch(({ response }) => ({
      status: response.status,
      data: response.data,
    }));
}

export async function getUser() {
  const opt = getStore("user_id");
  return http
    .get(`/v1/user?user_id=${opt}`)
    .then(({ status, data }) => ({ status, data }))
    .catch(({ response }) => ({
      status: response.status,
      data: response.data,
    }));
}

// 获取图片验证码
export async function getcaptchas() {
  return http
    .post(`/v1/captchas`, {})
    .then(({ status, data }) => ({ status, data }))
    .catch(({ response }) => ({
      status: response.status,
      data: response.data,
    }));
}

export async function accountLogin(username, password, captcha_code) {
  return http
    .post(`/v2/login`, { username, password, captcha_code })
    .then(({ status, data }) => ({ status, data }))
    .catch(({ response }) => ({
      status: response.status,
      data: response.data,
    }));
}
