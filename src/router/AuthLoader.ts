import api from "../api";
import { getMenuPath } from "../utils";
import type { IPermissionData } from "../types/api";

export default function AuthLoader() {
    return api.getPermissionList().then((data): IPermissionData => {
        const { menuList, buttonList } = data;
        const menuPaths = getMenuPath(menuList);
        return {
            menuList,
            menuPaths,
            buttonList: buttonList ?? [],
        };
    });
}