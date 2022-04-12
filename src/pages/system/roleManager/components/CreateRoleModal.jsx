import { Button, message } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import { createRole } from '../service';

const CreateRoleModal = function () {
  return (
    <ModalForm
      title="新建角色"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          新建角色
        </Button>
      }
      modalProps={{
        onCancel: () => console.log('run'),
      }}
      onFinish={async (values) => {
        const res = await createRole(values);
        console.log(res);
        message.success('提交成功');
        return true;
      }}
    >
      <ProFormText
        required
        rules={[{ required: true, message: '角色名称不能为空' }]}
        name="name"
        label="角色名称"
        placeholder="角色名不能为空"
      />
      <ProFormSelect
        options={[
          {
            value: 1,
            label: '正常',
          },
          {
            value: 0,
            label: '禁止',
          },
        ]}
        placeholder="请选择资源状态"
        fieldProps={{
          defaultValue: 1,
        }}
        name="status"
        label="状态"
      />
      <ProFormSelect
        options={[
          {
            value: '0',
            label: '不是默认',
          },
          {
            value: '1',
            label: '设为默认',
          },
        ]}
        placeholder="请选择角色状态"
        name="isDefault"
        label="是否为默认角色"
      />
      <ProFormTextArea
        name="remark"
        row={4}
        label="描述"
        placeholder="角色备注"
      />
    </ModalForm>
  );
};

export default CreateRoleModal;
