import { useHistory } from "react-router";

export interface LoginProps {}

const Login: React.FunctionComponent<LoginProps> = () => {
  const history = useHistory();
  return (
    <div>
      <button onClick={() => history.push("/")}>Home</button>
    </div>
  );
};

export default Login;
