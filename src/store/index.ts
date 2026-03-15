import { create } from "zustand";
import type { IUser } from "../types/api";

export const useStore = create<{
    userInfo:IUser;
    isDarkMode: boolean;
    setUserInfo: (userInfo: IUser) => void;
    toggleDarkMode: (isDarkMode: boolean) => void;
    collapsed: boolean;
    currentMenu: string;
    updateCollapsed: () => void;
    setCurrentMenu: (menu: string) => void;
}>((set) => ({
    collapsed: false,
    userInfo: {
        _id: '',
        userId: 0,
        userName: '',
        userEmail: '',
        deptId: '',
        state: 0,
        mobile: '',
        job: '',
        role: 0,
        roleList: '',
        createId: 0,
        deptName: '',
        userImg: '',
    },
    isDarkMode: false,
    currentMenu: '/dashboard',
    setUserInfo: (userInfo: IUser) => set(() => ({ userInfo })),
    toggleDarkMode: (isDarkMode: boolean) => set(() => ({ isDarkMode })),
    setCurrentMenu: (menu: string) => set(() => ({ currentMenu: menu })),
    updateCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
}));