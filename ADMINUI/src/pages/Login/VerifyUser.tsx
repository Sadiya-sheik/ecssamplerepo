import { useIsAuthenticated } from "@azure/msal-react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { AuthActions } from "../../redux/Auth";

export interface VerifyUserProps {}

/**
 * @description this component will be used after login successfull.
 *               this componet will re-rigister protected routes
 * @returns
 */
const VerifyUser: React.FunctionComponent<VerifyUserProps> = () => {
  const history = useHistory();
  const isAuthenticated = useIsAuthenticated();
  const dispatch = useDispatch();
  console.log(isAuthenticated);

  const handleVerify = () => {
    if (isAuthenticated) {
      // requestProfileData();
      dispatch(
        AuthActions.setUserAuthenticated({
          isAuthenticated: isAuthenticated,
          userProfile: {
            givenName: "",
            surname: "",
          },
        })
      );
      history.push("/customer");
    }
  };
  React.useEffect(()=>{
    handleVerify();
  })

  return (
    <div>
      <button onClick={handleVerify}>my data</button>
    </div>
  );
};

export default VerifyUser;
