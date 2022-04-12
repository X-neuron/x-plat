import { Button, message, TreeSelect } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormTextArea,
  ProFormSelect,
  ProFormDigit,
  ProFormCheckbox,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import Access from '@/components/Access'
import { createTaskStepTemplate } from '../service';

const SaveTemplateModal = function (props) {
  const { templateTreeData } = props;
  return (
    <ModalForm
      // width={1200}
      title="填写任务模板名称"
      trigger={
        <Access accessible="xplat:task:create:taskTempalte" fallback={<></>}  >
           <Button type="primary">
              <PlusOutlined />
              将勾选步骤存为任务模板
          </Button>
        </Access>
      }
      onFinish={async (values) => {
        if (templateTreeData?.length === 0) {
          message.warning('勾选的步骤不能为空');
          return;
        }
        const res = await createTaskStepTemplate({
          details: templateTreeData,
          ...values,
        });
        message.success('提交成功');
        return true;
      }}
    >
      <ProFormText
        required
        rules={[{ required: true, message: '名称不能为空' }]}
        name="name"
        label="任务模板名称"
        placeholder="请输入模板名称"
      />
      <ProFormTextArea
        name="remark"
        row={4}
        label="描述"
        placeholder="模板描述，方便记忆"
      />
    </ModalForm>
  );
};

export default SaveTemplateModal;
