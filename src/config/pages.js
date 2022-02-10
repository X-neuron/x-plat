/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-key */
import { lazy } from "react";
import memoized from "nano-memoize";
import { Outlet } from "react-router-dom";
// import loadable from "@loadable/component";
import _ from "lodash";
import { isHttp } from "@/utils/is";
import Access from "@/components/Access";
import AccessResult from "@/components/AccessResult";
// import { PageLoading } from "@ant-design/pro-layout";

const BasicLayout = lazy(() => import("@/layouts/BasicLayout"));
const SecurityLayout = lazy(() => import("@/layouts/SecurityLayout"));
const BlankLayout = lazy(() => import("@/layouts/BlankLayout"));
const UserLayout = lazy(() => import("@/layouts/UserLayout"));

const Dashboard = lazy(() => import("@/pages/dashboard"));

const UserRegister = lazy(() => import("@/pages/user/register"));
const UserLogin = lazy(() => import("@/pages/user/login"));

const SurveyingProjectManager = lazy(() =>
  import("@/pages/project/surveyingProjectManager"),
);

const SurveyPrjFinanceManager = lazy(() =>
  import("@/pages/project/surveyPrjFinanceManager"),
);

const RoadMapUpdateLog = lazy(() => import("@/pages/roadMapUpdateLog"));

const AppManager = lazy(() => import("@/pages/system/appManager"));
const OrganizationManager = lazy(() =>
  import("@/pages/system/organizationManager"),
);
const ResourceManager = lazy(() => import("@/pages/system/resourceManager"));
const RoleManager = lazy(() => import("@/pages/system/roleManager"));
const UserManager = lazy(() => import("@/pages/system/userManager"));
const WorkFlowManager = lazy(() => import("@/pages/system/workFlowManager"));
const CategoryManager = lazy(() => import("@/pages/system/categoryManager"));
const HumanResourceManager = lazy(() =>
  import("@/pages/system/humanResourceManager"),
);

const UserMessManager = lazy(() => import("@/pages/user/userMessManager"));
const UserSecurityCenter = lazy(() =>
  import("@/pages/user/userSecurityCenter"),
);

const MicroApp = lazy(() => import("@/components/MicroApp"));
// 用于route.js中，没有配置component的路径
const Default = function() {
  return <Outlet />;
}

const pages = new Map([
  ["Dashboard", <Dashboard />],
  ["SurveyingProjectManager", <SurveyingProjectManager />],
  ["SurveyPrjFinanceManager", <SurveyPrjFinanceManager />],
  ["RoadMapUpdateLog", <RoadMapUpdateLog />],
  ["AppManager", <AppManager />],
  ["OrganizationManager", <OrganizationManager />],
  ["ResourceManager", <ResourceManager />],
  ["RoleManager", <RoleManager />],
  ["UserManager", <UserManager />],
  ["WorkFlowManager", <WorkFlowManager />],
  ["UserMessManager", <UserMessManager />],
  ["UserSecurityCenter", <UserSecurityCenter />],
  ["UserRegister", <UserRegister />],
  ["UserLogin", <UserLogin />],
  ["BasicLayout", <BasicLayout />],
  ["SecurityLayout", <SecurityLayout />],
  ["BlankLayout", <BlankLayout />],
  ["UserLayout", <UserLayout />],
  ["HumanResourceManager", <HumanResourceManager />],
  ["CategoryManager", <CategoryManager />],
  ["Default", <Default />], // default microapp
]);

// fullpath = /micro/vue/*
const getPage = memoized((pageStr, access, fullPath) => {
  // if(isHttp(pageStr)){
  //   return <MicroApp entry={pageStr} fullPath={fullPath} />
  // }
  const page = isHttp(pageStr) ? (
    <MicroApp entry={pageStr} fullPath={fullPath} />
  ) : (
    pages.get(_.upperFirst(pageStr))
  );
  if (access) {
    return (
      <Access accessible={access} fallback={<AccessResult code="403" />}>
        {page}
      </Access>
    );
  }
  return <>{page}</>;

});

export default getPage;
