import { Button, message } from "antd";
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormTextArea,
  ProFormSelect,
} from "@ant-design/pro-form";
import { PlusOutlined } from "@ant-design/icons";
import { createResModuleApi } from "../service";

const CreateResApiModal = function(props) {
  const { record, title } = props;
  return (
    <ModalForm
      title={record ? `新建 ${record.moduleName} 模块接口` : "新建接口"}
      trigger={
        <Button type="primary">
          <PlusOutlined />
          {title || "新建接口"}
        </Button>
      }
      modalProps={{
        onCancel: () => console.log("run"),
      }}
      onFinish={async (values) => {
        const res = await createResModuleApi(
          record?.parentId,
          record?.id,
          values,
        );
        message.success("提交成功");
        return true;
      }}
    >
      <ProFormSelect
        required
        // rules={[{ required: true, message: '资源类型不能为空' }]}
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
          defaultValue: 3,
        }}
        name="type"
        label="资源类型"
      />
      <ProFormText
        required
        rules={[{ required: true, message: "接口名不能为空" }]}
        name="apiName"
        label="接口名称"
        placeholder="请输入接口名"
      />
      <ProFormText
        required
        name="route"
        label="后端路由"
        placeholder="后端接口的url地址(不带基址)"
      />
      <ProFormSelect
        required
        rules={[{ required: true, message: "接口方法不能为空" }]}
        options={[
          {
            value: "GET",
            label: "GET",
          },
          {
            value: "POST",
            label: "POST",
          },
          {
            value: "PATCH",
            label: "PATCH",
          },
          {
            value: "DELETE",
            label: "DELETE",
          },
        ]}
        name="method"
        label="方法"
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
        placeholder="接口备注"
      />
    </ModalForm>
  );
}

export default CreateResApiModal;
