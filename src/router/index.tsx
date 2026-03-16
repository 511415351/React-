import {  createBrowserRouter ,Navigate} from "react-router-dom";
import { lazy } from 'react';
import {lazyLoad} from "./LazyLoad"
import NotFound from "../views/NotFound";
import Forbidden from "../views/Forbidden";
import Login from "../views/login";
import Layout from "../layout";
import AuthLoader from "./AuthLoader";


const loginAction = async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    if (username === "admin" && password === "password") {
        // Simulate successful login
        return {success: true, message: 'success' }; // Redirect after login
    }
    if (username !== "admin") {
        return { error: 'Invalid username' };
    }
    return { error: 'Invalid password' };
};
const router = createBrowserRouter([
    {
        id: "layout",
        element: <Layout />, 
        loader: AuthLoader,
        children: [
            {path: "/welcome" ,element: lazyLoad(lazy(() => import('../views/welcome')))},
            {path: "/dashboard" ,element: lazyLoad(lazy(() => import('../views/dashboard')))},
            {path: "/deptList" ,element: lazyLoad(lazy(() => import('../views/dept')))},
            {path: "/userList" ,element: lazyLoad(lazy(() => import('../views/user')))},
            {path: "/roleList" ,element: lazyLoad(lazy(() => import('../views/role')))},
            {path: "/menuList" ,element: lazyLoad(lazy(() => import('../views/menu')))},
        ] 
    },
    { path: "/", element: <Navigate to="/welcome" /> },
    { path: "/vite", element: <div>Vite Demo</div> },
    { path: "/login", element: <Login />, action: loginAction },
    { path: "/403", element: <Forbidden /> },
    {path : "/welcome", element: lazyLoad(lazy(() => import('../views/welcome')))},
        
    { path: "*", element: <NotFound /> },
]);

export default router;