import { Button, message } from "antd";
import ProForm, { ModalForm } from "@ant-design/pro-form";
import { PlusOutlined } from "@ant-design/icons";
import CreateSurveryingProjectStepForm from "./CreateSurveryingProjectStepForm";

const CreateSurveryingProjectModal = function(props) {
  const { record, title, act } = props;

  return (
    <ModalForm
      title={record ? `新建 ${record.name} 子项目` : "新建项目"}
      trigger={
        <Button type="primary">
          <PlusOutlined />
          {title || "新建项目"}
        </Button>
      }
      submitter={{
        key: "submitter",
        render: (props, defaultDoms) => [<div />],
      }}
      // modalProps={{
      //   onCancel: () => console.log('run'),
      //   okButtonProps:{ disabled: true },
      //   cancelButtonProps:{ disabled: true }
      // }}
    >
      <CreateSurveryingProjectStepForm record={record} />
    </ModalForm>
  );
}

export default CreateSurveryingProjectModal;
