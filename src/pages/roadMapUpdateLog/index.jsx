import { Suspense } from 'react';
import ProCard from '@ant-design/pro-card';
import PageLoading from '@/components/PageLoading';
import RoadMap from './components/RoadMap';
import Post from './components/Post';

const RoadMapUpdateLog = function () {
  return (
    // split="vertical"  split="horizontal"
    <ProCard split="vertical">
      <ProCard colSpan="60%">
        <Suspense fallback={<PageLoading />}>
            <RoadMap />
        </Suspense>
      </ProCard>
      {/* <ProCard split="vertical" > */}
      {/* <ProCard colSpan="35%">
          <Suspense fallback={<PageLoading />}>
            <TaskCostDrawerForm />
          </Suspense>
        </ProCard> */}
      <ProCard colSpan="40%">
        <Post />
      </ProCard>
      {/* </ProCard> */}
    </ProCard>
  );
};

export default RoadMapUpdateLog;
