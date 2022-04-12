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
  ProFormRadio,
  ProFormDependency,
} from "@ant-design/pro-form";
import { PlusOutlined, TwitterCircleFilled } from "@ant-design/icons";
import { useSafeState, useUpdateEffect } from "ahooks";

import paramConfig from "@/config/params";
import { getResourceDescendantByName } from "@/service";
import { createResource, updateResource } from "../service";

const CreateResModal = function (props) {
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
      //   layout="horizontal"
      title={record ? `新建 ${record.name} 的子资源` : "新建资源类别"}
      trigger={
        <Button type="primary">
          {title ? <></> : <PlusOutlined />}
          {title || "新增资源"}
        </Button>
      }
      // ini={{
      //   // record 存在 则表明新增的是子类别，否则就是 大类别
      //   sort: lastSortNumber ? lastSortNumber + 1 :record?.children?.length
      // }}
      onFinish={async (values) => {
        console.log(formRef.current);
        console.log(formRef.current.getFieldsValue());
        if (act === "new") {
          const res = await createResource(values, record?.id);
        } else {
          const res = await updateResource(values, record?.id);
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
      <ProFormRadio.Group
        required
        options={[
          {
            value: 0,
            label: "类别",
          },
          {
            value: 1,
            label: "模块",
          },
          {
            value: 2,
            label: "接口",
          },
        ]}
        // disabled={record ? false : true }
        // fieldProps={{
        //     defaultValue: 0,
        //   }}
        name="type"
        label="资源类型"
      />
      <ProFormText
        required
        name="name"
        label="资源名称"
        placeholder="资源名称不应当为空"
      />
      <ProFormDependency name={["type"]}>
        {({ type }) => {
          if (!type) {
            return (
              <>
                <ProFormText
                  required
                  rules={[{ required: true, message: "前端路由不能为空" }]}
                  name="route"
                  label="前端路由"
                  placeholder="该配置对模块而言仅对前端有效,与资源类别的route一起在前端使用"
                />
                <ProFormText
                  name="icon"
                  label="图标"
                  placeholder="图标可为antd icon字符串或自定义svg的url地址"
                />
              </>
            );
          }
          if (type === 1) {
            return (
              <>
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
              </>
            );
          }
          return (
            <>
              <ProFormText
                required
                rules={[
                  { required: true, message: "接口需要的权限不应当为空" },
                ]}
                name="permission"
                label="权限编码"
                placeholder="接口需要的权限.eg:aws:sys:user:deleteAll"
              />
              {/* <ProFormText
                    required
                    name="route"
                    label="后端路由"
                    placeholder="后端接口的url地址(不带基址)"
                  /> */}
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
                fieldProps={{
                  defaultValue: "GET",
                }}
                name="method"
                label="方法"
              />
            </>
          );


        }}
      </ProFormDependency>
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
};

export default CreateResModal;
