import { Suspense } from 'react';
import { Steps, Button, Space } from 'antd';
import PageLoading from '@/components/PageLoading';
import ProCard from '@ant-design/pro-card';
import { useRecoilValue } from 'recoil';
import StepDetailForm from './StepDetailForm';
import { taskSubFlowAtom, taskSubStepAtom } from '../atoms';

const { Step } = Steps;
const StepCard = function (props) {
  const curTaskSubFlow = useRecoilValue(taskSubFlowAtom);
  const curSubStep = useRecoilValue(taskSubStepAtom);
  const { record } = props;
  return (
    <ProCard split="vertical">
      <ProCard colSpan={4}>
        <Steps
          direction="vertical"
          size="small"
          current={curSubStep}
          // style={{ height: '100%' }}
        >
          {/* <Step key="faf" title="ahfak" />
            <Step key="vv" title="ahfafagk" />
            <Step key="xvx" title="gdg" /> */}
          {curTaskSubFlow?.map((item) => (
            <Step key={item.name} title={item.name} />
          ))}
        </Steps>
      </ProCard>
      <ProCard title={`填写${record.name}任务进度`} colSpan={18}>
        <Suspense fallback={<PageLoading />}>
          <StepDetailForm record {...props} />
        </Suspense>
      </ProCard>
    </ProCard>
  );
};

export default StepCard;
