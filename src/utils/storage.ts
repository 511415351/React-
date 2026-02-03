export default {
    // 存储在本地的方法
    get: (key: string) => {
        return localStorage.getItem(key);
    },
    set: (key: string, value: unknown) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    remove: (key: string) => {
        localStorage.removeItem(key);
    },
    clear: () => {
        localStorage.clear();
    },
}