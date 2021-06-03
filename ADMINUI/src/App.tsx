import { InteractionType } from "@azure/msal-browser";
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import React from "react";
import "./App.css";
import Dashboard from "./components/admin/Dashboard";
import FooterMenu from "./layout/FooterMenu";
import HeaderMenu from "./layout/HeaderMenu";

const App = () => {
  return (
    <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
      <HeaderMenu />
      <div className="page-wrapper">
        <Dashboard />
      </div>
      <FooterMenu />
    </MsalAuthenticationTemplate>
    // <>
    //  <HeaderMenu />
    //    <div className="page-wrapper">
    //      <Dashboard />
    //    </div>
    //    <FooterMenu />
    // </>
  )
};

export default App;
