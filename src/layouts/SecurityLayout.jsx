
import { Navigate, Outlet } from "react-router-dom";

import { stringify } from "qs";
import { useRecoilValue } from "recoil";

import { loginStateAtom } from "@/atoms/login";



const SecurityLayout = function ({ children }) {

  const login = useRecoilValue(loginStateAtom);

  const queryString = stringify({
    redirect: window.location.href,
  });


  if (!login.isLogin && window.location.pathname !== "/user/login") {
    return <Navigate to={`/user/login?${queryString}`} replace={true} />;
    // return <Redirect from="window.location.href" to="/user/login" />;
    // redirectTo(`/user/login?${queryString}`);
  }

  return <Outlet />;
};

export default SecurityLayout;
