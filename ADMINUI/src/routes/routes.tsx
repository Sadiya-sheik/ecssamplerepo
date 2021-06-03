import React from "react";
import { Router } from "./Router";

//const Dashboard= React.lazy(() => import("../components/Dashboard").then(({Dashboard}) => ({default: Dashboard})))
const AdminDashboard = React.lazy(
  () => import("../components/admin/Dashboard")
);
const Login = React.lazy(() => import("../pages/Login"));
const routes: Router[] = [
  {
    path: "/",
    exact: true,
    component: AdminDashboard,
    isProtected: false,
  },
  {
    path: "/dashboard",
    exact: true,
    component: AdminDashboard,
    isProtected: false,
  },

  {
    path: "/login",
    exact: true,
    component: Login,
    isProtected: false,
  },
];

export default routes;
