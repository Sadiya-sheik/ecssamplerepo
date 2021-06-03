import React, { Suspense } from "react";

import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import routes from "../routes/routes";

const Content = () => {
  return (
    <HashRouter>
      {/* <Suspense fallback={() => "Loading..."}>
        <Switch>
          {routes.map((route) => {
            return (
              <Route
                path={route.path}
                exact={route.exact}
                render={(props) => <route.component {...props} />}
              />
            );
          })}
          <Redirect from="/" to="/home" />
        </Switch>
      </Suspense> */}
    </HashRouter>
  );
};

export default Content;
