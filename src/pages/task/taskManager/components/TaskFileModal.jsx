import { Button, message } from 'antd';
import ProForm, { ModalForm } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import TaskFileTable from './TaskFileTable';

const TaskFileModal = function (props) {
  const { record, title } = props;

  return (
    <ModalForm
      layout="horizontal"
      // width={1200}
      title={`查询 ${record.name} 子任务文件目录`}
      trigger={<Button type="primary">{title}</Button>}
      submitter={{
        render: (props, defaultDoms) => [<div />],
      }}
      // modalProps={{
      //   onCancel: () => console.log('run'),
      //   okButtonProps:{ disabled: true },
      //   cancelButtonProps:{ disabled: true }
      // }}
    >
      <TaskFileTable record={record} />
    </ModalForm>
  );
};

export default TaskFileModal;
