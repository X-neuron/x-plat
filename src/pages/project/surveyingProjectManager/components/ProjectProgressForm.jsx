import { Steps, Button, Space } from "antd";
import ProCard from "@ant-design/pro-card";
import { useRecoilValue } from "recoil";
import {
  projectDetailAtom,
  projectMajorFlowAtom,
  projectMajorStepAtom,
  projectSubStepAtom,
} from "../atoms";
import { getCategoryDescendantByName } from "@/service";
import { getProjectProgress } from "../service";
import StepCard from "./StepCard";

const { Step } = Steps;

const ProjectProgressForm = function(props) {
  const curProjectRecord = useRecoilValue(projectDetailAtom);
  const curProjectFlow = useRecoilValue(projectMajorFlowAtom);
  const curMainStep = useRecoilValue(projectMajorStepAtom);

  if (curProjectRecord) {
    return (
      <div>
        <Steps current={curMainStep}>
          {curProjectFlow?.map((item) => (
            <Step key={item.name} title={item.name} />
          ))}
        </Steps>
        <StepCard record={curProjectRecord} {...props} />
      </div>
    );
  }
  return <p>请在左侧选择一个项目</p>;

}

export default ProjectProgressForm;
