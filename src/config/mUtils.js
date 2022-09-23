// 获取localStorage
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 存储localStorage
 */
 export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== "string") {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  };