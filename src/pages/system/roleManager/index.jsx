import { Suspense } from "react";
import ProCard from "@ant-design/pro-card";
import PageLoading from "@/components/PageLoading";
import RoleTable from "./components/RoleTable";
import RolePermissionTree from "./components/RolePermissionTree";
// import ProjectProgressForm from "./components/ProjectProgressForm";

const RoleManager = function () {
  return (
    // split="vertical"  split="horizontal"
    <ProCard split="vertical">
      <ProCard colSpan="40%">
        <RoleTable />
      </ProCard>
      {/* <ProCard split="vertical" > */}
      {/* <ProCard colSpan="35%">
          <Suspense fallback={<PageLoading />}>
            <ProjectCostDrawerForm />
          </Suspense>
        </ProCard> */}
      <ProCard colSpan="60%">
        <Suspense fallback={<PageLoading />}>
          <RolePermissionTree />
        </Suspense>
      </ProCard>
      {/* </ProCard> */}
    </ProCard>
  );
};

export default RoleManager;
