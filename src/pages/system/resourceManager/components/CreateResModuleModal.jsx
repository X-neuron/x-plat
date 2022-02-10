import { Button, message } from "antd";
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormTextArea,
  ProFormSelect,
} from "@ant-design/pro-form";
import { PlusOutlined } from "@ant-design/icons";
import { createResClassModule } from "../service";

const CreateResModuleModal = function(props) {
  const { record, title } = props;
  return (
    <ModalForm
      title={record ? `新建 ${record.className} 资源模块` : "新建模块"}
      trigger={
        <Button type="primary">
          <PlusOutlined />
          {title || "新建模块"}
        </Button>
      }
      modalProps={{
        onCancel: () => console.log("run"),
      }}
      onFinish={async (values) => {
        const res = await createResClassModule(record.id, values);
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
          defaultValue: 2,
        }}
        name="type"
        label="资源类型"
      />
      <ProFormText
        required
        name="moduleName"
        label="模块名称"
        placeholder="模块名不能为空"
      />
      <ProFormText
        required
        rules={[{ required: true, message: "前端路由不能为空" }]}
        name="route"
        label="前端路由"
        placeholder="该配置对模块而言仅对前端有效,与资源类别的route一起在前端使用"
      />
      <ProFormText
        required
        rules={[{ required: true, message: "前端组件不能为空" }]}
        name="component"
        label="前端组件"
        placeholder="为该模块配置对应的前端组件名称"
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
        placeholder="模块备注"
      />
    </ModalForm>
  );
}

export default CreateResModuleModal;
