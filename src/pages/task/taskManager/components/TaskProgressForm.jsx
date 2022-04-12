import { Steps, Button, Space } from 'antd';
import ProCard from '@ant-design/pro-card';
import { useRecoilValue } from 'recoil';
// import { getCategoryDescendantByName } from '@/service';
import {
  taskDetailAtom,
  taskMajorFlowAtom,
  taskMajorStepAtom,
  taskSubStepAtom,
} from '../atoms';
// import { getTaskProgress } from '../service';
import StepCard from './StepCard';

const { Step } = Steps;

const TaskProgressForm = function (props) {
  const curTaskRecord = useRecoilValue(taskDetailAtom);
  const curTaskFlow = useRecoilValue(taskMajorFlowAtom);
  const curMainStep = useRecoilValue(taskMajorStepAtom);

  if (curTaskRecord) {
    return (
      <div>
        <Steps current={curMainStep}>
          {curTaskFlow?.map((item) => (
            <Step key={item.name} title={item.name} />
          ))}
        </Steps>
        <StepCard record={curTaskRecord} {...props} />
      </div>
    );
  }
  return <p>请在左侧选择一个任务</p>;
};

export default TaskProgressForm;
