import { useSyncExternalStore } from "react";
export const useStorage = (key: string, initialValue:any) => {
    const subscribe = (callback: () => void) => {
        window.addEventListener('storage', callback);
        return () => {
            window.removeEventListener('storage', callback);
        }
    };
    const getSnapshot = () => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    }
    
    const res = useSyncExternalStore(subscribe, getSnapshot);

    const updateStorage = (value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
        window.dispatchEvent(new StorageEvent('storage'));
    }

    return [res, updateStorage];
};

// const [count, setCount] = useStroage({ss: 2211});