import { Suspense } from 'react';
import ProCard from '@ant-design/pro-card';
import PageLoading from '@/components/PageLoading';
import OrganizationTable from './components/OrganizationTable';
// import ProjectProgressForm from "./components/ProjectProgressForm";

const OrganizationManager = function () {
  return (
    // split="vertical"  split="horizontal"
    <ProCard split="vertical">
      <ProCard colSpan="40%">
        <OrganizationTable />
      </ProCard>
      {/* <ProCard split="vertical" > */}
      {/* <ProCard colSpan="35%">
          <Suspense fallback={<PageLoading />}>
            <ProjectCostDrawerForm />
          </Suspense>
        </ProCard> */}
      <ProCard colSpan="60%">
        <Suspense fallback={<PageLoading />}>
          <p>组织权限配置待开发</p>
        </Suspense>
      </ProCard>
      {/* </ProCard> */}
    </ProCard>
  );
};

export default OrganizationManager;
