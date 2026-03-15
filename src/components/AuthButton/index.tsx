import type { ReactNode } from 'react';
import usePermission from '../../hooks/usePermission';

interface IProps {
    code: string;
    children: ReactNode;
    fallback?: ReactNode;
}

export default function AuthButton({ code, children, fallback = null }: IProps) {
    const { hasButtonPermission } = usePermission();
    return hasButtonPermission(code) ? <>{children}</> : <>{fallback}</>;
}