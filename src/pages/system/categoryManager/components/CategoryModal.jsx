import { useRef } from "react";
import { Button, message } from "antd";
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormTextArea,
  ProFormSelect,
  ProFormDigit,
  ProFormCheckbox,
  ProFormTreeSelect,
} from "@ant-design/pro-form";
import { PlusOutlined, TwitterCircleFilled } from "@ant-design/icons";

import { useRecoilValue } from "recoil";
import { createCategory, updateCategory } from "../service";
import OrganizationUser from "./OrganizationUser";
import { categoryUnitAtom } from "../atoms";



const CategoryModal = function (props) {
  const { record, title, act, sort,state } = props;
  // const [lastSortNumber, setLastSortNumber] = useSafeState(act === 'new'? 0: record?.sort);
  const formRef = useRef();

  const categoryUnit = useRecoilValue(categoryUnitAtom);
  // useUpdateEffect(() => {
  //   formRef.current.setFieldsValue({
  //     sort,
  //   });
  // }, [sort]);

  return (
    <ModalForm
      formRef={formRef}
      title={record ? `新建 ${record.name} 子类别` : "新增类别"}
      trigger={
        <Button type="primary">
          {title ? <></> : <PlusOutlined />}
          {title || "新增类别"}
        </Button>
      }
      // ini={{
      //   // record 存在 则表明新增的是子类别，否则就是 大类别
      //   sort: lastSortNumber ? lastSortNumber + 1 :record?.children?.length
      // }}
      onFinish={async (values) => {
        if (act === "new") {
          const res = await createCategory(values, record?.id);
        } else {
          const res = await updateCategory(values, record?.id);
        }
        if (values.sort) {
          formRef.current.setFieldsValue({
            sort: values.sort + 1,
          });
        }
        message.success("提交成功");
        // return true;
      }}
      initialValues={
        act === "new"
          ? {}
          : {
            ...record,
          }
      }
    >
      <ProFormText
        required
        rules={[{ required: true, message: "类别名不能为空" }]}
        name="name"
        label="类别名称"
        placeholder="请输入类别名称"
      />
      <ProForm.Group title="类型计量配置">
        <ProFormDigit
          name="weight"
          label="权重"
          placeholder="可用于描述工作类型麻烦程度，比如用于公天计算"
        />
        <ProFormSelect
          name="unit"
          label="单位"
          options={categoryUnit}
          placeholder="默认单位为 天"
        />
        <OrganizationUser />
        <ProFormDigit name="sort" label="序号" placeholder="可用于步骤推算" />
        <ProFormCheckbox
          name="isSys"
          label="用于系统配置"
          // options={['A', 'B', 'C', 'D', 'E', 'F']}
        />
      </ProForm.Group>
      <ProFormTextArea
        name="remark"
        row={4}
        label="描述"
        placeholder="类别描述备注"
      />
    </ModalForm>
  );
};

export default CategoryModal;
