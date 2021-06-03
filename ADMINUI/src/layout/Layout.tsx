import * as React from "react";
import Dashboard from "../components/admin/Dashboard";
const FooterMenu = React.lazy(() => import("./FooterMenu"));
const HeaderMenu = React.lazy(() => import("./HeaderMenu"));

export interface LayoutProps {}

const Layout: React.FunctionComponent<LayoutProps> = () => {
  return (
    <React.Fragment>
        <HeaderMenu />
        <div className="page-wrapper">
          <Dashboard />
        </div>
        <FooterMenu />
    </React.Fragment>
  );
};

export default Layout;
