import { Steps, Button, Space } from "antd";
import ProCard from "@ant-design/pro-card";
import { useRecoilValue } from "recoil";
import { Suspense } from "react";
import { projectSubFlowAtom, projectSubStepAtom } from "../atoms";
import StepDetailForm from "./StepDetailForm";
import PageLoading from "@/components/PageLoading";

const { Step } = Steps;
const StepCard = function(props) {
  const curProjectSubFlow = useRecoilValue(projectSubFlowAtom);
  const curSubStep = useRecoilValue(projectSubStepAtom);
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
          {curProjectSubFlow?.map((item) => (
            <Step key={item.name} title={item.name} />
          ))}
        </Steps>
      </ProCard>
      <ProCard title={`填写${record.name}项目进度`} colSpan={18}>
        <Suspense fallback={<PageLoading />}>
          <StepDetailForm record {...props} />
        </Suspense>
      </ProCard>
    </ProCard>
  );
}

export default StepCard;
