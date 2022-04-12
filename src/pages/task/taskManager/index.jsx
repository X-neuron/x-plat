import { Suspense } from 'react';
import ProCard from '@ant-design/pro-card';
import PageLoading from '@/components/PageLoading';
import TaskTable from './components/TaskTable';
import TaskProgressForm from './components/TaskProgressForm';

const TaskManager = function () {
  return (
    // split="vertical"  split="horizontal"
    <ProCard split="vertical">
      <ProCard colSpan="40%">
        <TaskTable />
      </ProCard>
      {/* <ProCard split="vertical" > */}
      {/* <ProCard colSpan="35%">
          <Suspense fallback={<PageLoading />}>
            <TaskCostDrawerForm />
          </Suspense>
        </ProCard> */}
      <ProCard colSpan="60%">
        <Suspense fallback={<PageLoading />}>
          <TaskProgressForm />
        </Suspense>
      </ProCard>
      {/* </ProCard> */}
    </ProCard>
  );
};

export default TaskManager;
