import type { IMenu } from "../types/api";

//日期格式化
export function formatDate(date: string) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
}


export function getMenuPath(list: IMenu[]): string[] {
    return list.reduce((paths: string[], item: IMenu) => {
        if (item.menuType !== 1 || item.menuState !== 1) {
            return paths;
        }

        const nextPaths = item.path ? paths.concat(item.path) : paths;
        if (!Array.isArray(item.children) || item.children.length === 0) {
            return nextPaths;
        }

        return nextPaths.concat(getMenuPath(item.children));
    }, []);
}

export const findTreeNode = (list: IMenu[], key: string): IMenu | null => {
    
    for (const item of list) {
        if (item._id === key || item.path === key) {
            return item;
        }
        if (Array.isArray(item.children) && item.children.length > 0) {
            const found = findTreeNode(item.children, key);
            if (found) {
                return found;
            }
        }
    }
    return null;
}

export const findTreePath = (list: IMenu[], key: string): IMenu[] => {
    for (const item of list) {
        if (item._id === key || item.path === key) {
            return [item];
        }

        if (Array.isArray(item.children) && item.children.length > 0) {
            const childPath = findTreePath(item.children, key);
            if (childPath.length > 0) {
                return [item, ...childPath];
            }
        }
    }

    return [];
}