import {  createBrowserRouter ,Navigate} from "react-router-dom";

import NotFound from "../views/NotFound";
import Forbidden from "../views/Forbidden";
import Login from "../views/login";
import Welcome from "../views/welcome";
import Layout from "../layout";
import DashboardView from "../views/dashboard";
import DeptView from "../views/dept";
import UserView from "../views/user";
import RoleView from "../views/role";
import MenuView from "../views/menu";
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
            {path: "/welcome" ,element: <Welcome />},
            {path: "/dashboard" ,element: <DashboardView />},
            {path: "/deptList" ,element: <DeptView />},
            {path: "/userList" ,element: <UserView />},
            {path: "/roleList" ,element: <RoleView />},
            {path: "/menuList" ,element: <MenuView />},
        ] 
    },
    { path: "/", element: <Navigate to="/welcome" /> },
    { path: "/vite", element: <div>Vite Demo</div> },
    { path: "/login", element: <Login />, action: loginAction },
    { path: "/403", element: <Forbidden /> },
    {path : "/welcome", element: <Welcome />},
        
    { path: "*", element: <NotFound /> },
]);

export default router;