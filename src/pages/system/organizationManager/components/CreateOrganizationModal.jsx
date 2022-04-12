import { useRef } from 'react';
import { Button, message } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormTextArea,
  ProFormSelect,
  ProFormDigit,
  ProFormCheckbox,
} from '@ant-design/pro-form';
import { PlusOutlined, TwitterCircleFilled } from '@ant-design/icons';
import { useSafeState, useUpdateEffect } from 'ahooks';

import paramConfig from '@/config/params';
import { getOrganizationDescendantByName } from '@/service';
import { createOrganization, updateOrganization } from '../service';

const CreateOrganizationModal = function (props) {
  const { record, title, act, sort } = props;
  // const [lastSortNumber, setLastSortNumber] = useSafeState(act === 'new'? 0: record?.sort);
  const formRef = useRef();

  // useUpdateEffect(() => {
  //   formRef.current.setFieldsValue({
  //     sort,
  //   });
  // }, [sort]);
  return (
    <ModalForm
      formRef={formRef}
      title={record ? `新建 ${record.name} 子组织` : '新增组织'}
      trigger={
        <Button type="primary">
          {title ? <></> : <PlusOutlined />}
          {title || '新增组织'}
        </Button>
      }
      // ini={{
      //   // record 存在 则表明新增的是子类别，否则就是 大类别
      //   sort: lastSortNumber ? lastSortNumber + 1 :record?.children?.length
      // }}
      onFinish={async (values) => {
        if (act === 'new') {
          const res = await createOrganization(values, record?.id);
        } else {
          const res = await updateOrganization(values, record?.id);
        }
        if (values.sort) {
          formRef.current.setFieldsValue({
            sort: values.sort + 1,
          });
        }
        message.success('提交成功');
        // return true;
      }}
      initialValues={
        act === 'new'
          ? {}
          : {
              ...record,
            }
      }
    >
      <ProFormText
        required
        rules={[{ required: true, message: '类别名不能为空' }]}
        name="name"
        label="组织名称"
        placeholder="请输入组织、部门名称"
      />
      <ProFormTextArea
        name="remark"
        row={4}
        label="描述"
        placeholder="类别描述备注"
      />
    </ModalForm>
  );
};

export default CreateOrganizationModal;
