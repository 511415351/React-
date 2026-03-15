import { useRouteLoaderData } from 'react-router-dom';
import type { IPermissionData } from '../types/api';

const EMPTY_PERMISSION: IPermissionData = {
    menuList: [],
    menuPaths: [],
    buttonList: [],
};

export default function usePermission() {
    const permissionData = (useRouteLoaderData('layout') as IPermissionData | undefined) ?? EMPTY_PERMISSION;

    return {
        ...permissionData,
        hasButtonPermission: (permissionCode: string) => permissionData.buttonList.includes(permissionCode),
        hasPathPermission: (path: string) => permissionData.menuPaths.includes(path),
    };
}