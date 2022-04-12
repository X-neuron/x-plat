import { Suspense } from 'react';
import ProCard from '@ant-design/pro-card';
import PageLoading from '@/components/PageLoading';
import OrganizationTable from '@/pages/system/organizationManager/components/OrganizationTable';
import UserTable from './components/UserTable';
// import ProjectProgressForm from "./components/ProjectProgressForm";

const UserManager = function () {
  return (
    // split="vertical"  split="horizontal"
    <ProCard split="vertical">
      <ProCard colSpan="30%">
        <OrganizationTable />
      </ProCard>
      {/* <ProCard split="vertical" > */}
      {/* <ProCard colSpan="35%">
          <Suspense fallback={<PageLoading />}>
            <ProjectCostDrawerForm />
          </Suspense>
        </ProCard> */}
      <ProCard colSpan="70%">
        <Suspense fallback={<PageLoading />}>
          <UserTable />
        </Suspense>
      </ProCard>
      {/* </ProCard> */}
    </ProCard>
  );
};

export default UserManager;
