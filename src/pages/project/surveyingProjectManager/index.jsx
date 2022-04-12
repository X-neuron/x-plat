import { Suspense } from 'react';
import ProCard from '@ant-design/pro-card';
import PageLoading from '@/components/PageLoading';
import ProjectTable from './components/ProjectTable';
import ProjectProgressForm from './components/ProjectProgressForm';

const SurveyingProjectManager = function () {
  return (
    // split="vertical"  split="horizontal"
    <ProCard split="vertical">
      <ProCard colSpan="40%">
        <ProjectTable />
      </ProCard>
      {/* <ProCard split="vertical" > */}
      {/* <ProCard colSpan="35%">
          <Suspense fallback={<PageLoading />}>
            <ProjectCostDrawerForm />
          </Suspense>
        </ProCard> */}
      <ProCard colSpan="60%">
        <Suspense fallback={<PageLoading />}>
          <ProjectProgressForm />
        </Suspense>
      </ProCard>
      {/* </ProCard> */}
    </ProCard>
  );
};

export default SurveyingProjectManager;
