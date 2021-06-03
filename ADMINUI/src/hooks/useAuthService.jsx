
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useIsAuthenticated,
  useMsal,
} from "@azure/msal-react";

import { callMsGraph } from "../graph";
import { loginRequest } from "../authConfig";
import { useDispatch, useSelector } from "react-redux";

import { AuthActions } from "../redux/Auth";

/**
 * @description
 * @returns
 */
const useAuthSerice = () => {
  const { instance, accounts } = useMsal();
  const isUserAuthenticatedFromAzure = useIsAuthenticated();

  const dispatch = useDispatch();
  const { isAuthenticated, userProfile } = useSelector(
    (state) => state.Auth
  );

  /**
   * @description feteches user profile data from Azure AD (only when user is logged in)
   *              and stores in state "userProfileData"
   * @returns
   */
  const requestProfileData = () => {
    // if user is not logged in, we should not get profile data.
    if (!isUserAuthenticatedFromAzure) return null;

    // Silently acquires an access token which is then attached to a request for MS Graph data
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((response) =>
          //setUserProfileData(response)
          dispatch(
            AuthActions.setUserAuthenticated({
              isAuthenticated: isUserAuthenticatedFromAzure,
              userProfile: {
                givenName: response.givenName,
                surname: response.surname,
              },
            })
          )
        );
      });
  };

  /**
   * @description will redirect/popup to microsot login screen
   */
  const login = () => {
    //instance.loginRedirect(loginRequest);

    instance.loginPopup(loginRequest).catch((e) => {
      console.log(e);
    });
  };

  /**
   * @description will logout selected user from current browser
   */
  const logout = () => {
    instance.logoutRedirect({
      account: instance.getAccountByHomeId(
        `${process.env.REACT_APP_TENENT_ID}`
      ),
      postLogoutRedirectUri: `${process.env.REACT_APP_DOMAIN_URL}/admin`,
      onRedirectNavigate: (url) => {
        console.log(url);
      },
    });
    //   instance.logout({
    //     postLogoutRedirectUri: `${process.env.REACT_APP_DOMAIN_URL}/login`,
    //     mainWindowRedirectUri: "/",
    //   });
    // instance.logoutPopup({
    //   postLogoutRedirectUri: "/login",
    //   mainWindowRedirectUri: "/",
    // });
  };

  return {
    instance,
    isUserAuthenticatedFromAzure,
    isAuthenticated,
    userProfile,
    AuthenticatedTemplate,
    UnauthenticatedTemplate,
    requestProfileData,
    login,
    logout,
  };
};

export default useAuthSerice;
