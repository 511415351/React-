import React from "react";
import {Spin} from 'antd';
export const lazyLoad = (
    Component: React.LazyExoticComponent<React.ComponentType<object>>
): React.ReactNode => {
    return (
        <React.Suspense 
            fallback={
                <Spin 
                    size="large" 
                    style={{ display: 'flex',alignItems: 'center', justifyContent: 'center' , height: '100%' }} 
                />
            }
        >
            <Component />
        </React.Suspense>
    );
}