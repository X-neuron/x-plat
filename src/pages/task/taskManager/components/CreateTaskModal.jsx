import { Button, message } from 'antd';
import ProForm, { ModalForm } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import CreateTaskStepForm from './CreateTaskStepForm';

const CreateTaskModal = function (props) {
  const { record, title, act } = props;

  return (
    <ModalForm
      title={record ? `新建 ${record.name} 子任务` : '新建任务'}
      trigger={
        <Button type="primary">
          <PlusOutlined />
          {title || '新建任务'}
        </Button>
      }
      submitter={{
        key: 'submitter',
        render: (props, defaultDoms) => [<div />],
      }}
      // modalProps={{
      //   onCancel: () => console.log('run'),
      //   okButtonProps:{ disabled: true },
      //   cancelButtonProps:{ disabled: true }
      // }}
    >
      <CreateTaskStepForm record={record} />
    </ModalForm>
  );
};

export default CreateTaskModal;
