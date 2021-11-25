import { UserLayout } from "../../layouts/userLayout/UserLayout";
import { LoginForm } from "./LoginForm";

export const Login = () => {
  return (
    <UserLayout>
      <LoginForm />
    </UserLayout>
  );
};

export default Login;