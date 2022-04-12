
import { useRoutes } from "react-router-dom";
// import { setConfig } from 'react-hot-loader';
import Locale from "@/components/Locale";
import { useFavicon, useMount } from "ahooks";
import { appRouteAtom } from "@/atoms/route";
import { useRecoilValue,useRecoilState } from "recoil";
import { loginStateAtom } from "@/atoms/login";
import { transPermissionToRoute } from "@/utils/utils";
import { fastLogin } from "@/service";

const App = function () {
  useFavicon("./public/favicon.ico");

  const [login,setLogin] = useRecoilState(loginStateAtom);

  useMount(async () => {
    // console.log('login state is:',login);
    if(!login.isLogin){
      const res = await fastLogin();
      if(res.data?.jwt){
        const { route,permission} = res.data;
        // console.log(transPermissionToRoute(route??[]));
        setLogin({
          ...res.data,
          route:transPermissionToRoute(route??[]),
          permission: permission??{},
          isLogin:true,
        });
      }
    }
  });

  const appRoute = useRecoilValue(appRouteAtom);

  const element = useRoutes(appRoute);

  return <Locale>{element}</Locale>
};

export default App;
