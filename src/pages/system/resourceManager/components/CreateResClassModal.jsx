import { Button, message } from "antd";
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormTextArea,
  ProFormSelect,
} from "@ant-design/pro-form";
import { PlusOutlined } from "@ant-design/icons";
import { createResClass } from "../service";

const CreateResClassModal = function() {
  return (
    <ModalForm
      title="新建资源类别"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          新建资源类别
        </Button>
      }
      modalProps={{
        onCancel: () => console.log("run"),
      }}
      onFinish={async (values) => {
        const res = await createResClass(values);
        console.log(res);
        message.success("提交成功");
        return true;
      }}
    >
      <ProFormSelect
        options={[
          {
            value: 1,
            label: "类别",
          },
          {
            value: 2,
            label: "模块",
          },
          {
            value: 3,
            label: "接口",
          },
        ]}
        disabled={true}
        fieldProps={{
          defaultValue: 1,
        }}
        name="type"
        label="资源类型"
      />
      <ProFormText
        required
        name="className"
        label="资源类别名称"
        placeholder="类别名不能为空"
      />
      <ProFormText
        required
        rules={[{ required: true, message: "前端路由不能为空" }]}
        name="route"
        label="前端路由"
        placeholder="该配置对资源类别而言仅对前端有效"
      />
      <ProFormText
        name="icon"
        label="图标"
        placeholder="图标可为antd icon字符串或自定义svg的url地址"
      />
      <ProFormSelect
        options={[
          {
            value: 1,
            label: "正常",
          },
          {
            value: 0,
            label: "禁止",
          },
        ]}
        placeholder="请选择资源状态"
        fieldProps={{
          defaultValue: 1,
        }}
        name="status"
        label="状态"
      />

      <ProFormTextArea
        name="remark"
        row={4}
        label="描述"
        placeholder="资源分类备注"
      />
    </ModalForm>
  );
}

export default CreateResClassModal;
