import axios from "axios";

const httpRequest = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

let tokenData = {};
try {
  tokenData = JSON.parse(localStorage.getItem("tokenInfo")).token;
} catch (e) {
  if (window) {
    window.console.log(e);
  }
}

// token过期或者未登录用户跳转Login
httpRequest.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    LoadingBar.error();
    if (err.response.status.toString().match(/401|407/)) {
      /* eslint no-restricted-globals: 0 */
      if (location) {
        location.href = "/login";
      }
    }
    const { response = {} } = err;

    return {
      ...err,
      errStatus: response.status,
      errMessage: response.data ? response.data.message : "未知错误",
      status: response.status,
      data: response.data,
    };
    // return Promise.reject(err);
  }
);

export default httpRequest;
