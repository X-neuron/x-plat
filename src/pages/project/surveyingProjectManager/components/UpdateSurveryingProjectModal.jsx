import { Button, message } from "antd";
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormDatePicker,
  ProFormTextArea,
  ProFormSelect,
  ProFormDigit,
  ProFormList,
  ProFormGroup,
  ProFormFieldSet,
} from "@ant-design/pro-form";
import dayjs from "dayjs";
import { updateProjectMetaMess } from "../service";
import { getCategoryDescendantByName } from "@/service";

// const dateFormat = 'YYYY-MM-DD';
const UpdateSurveryingProjectModal = function(props) {
  const { record } = props;
  // console.log('update project',record);
  return (
    <ModalForm
      title={`修改 ${record.name} 项目元信息`}
      trigger={<Button>修改</Button>}
      modalProps={{
        onCancel: () => console.log("run"),
      }}
      onFinish={async (values) => {
        const res = await updateProjectMetaMess(values, record.id);
        console.log(res);
        message.success("提交成功");
        return true;
      }}
      initialValues={{
        ...record,
        expectedSpendDate: [record.expectedStartDate, record.expectedEndDate],
      }}
    >
      <ProFormSelect
        label="项目来源"
        name="orginateFrom"
        request={async () => {
          const res = await getCategoryDescendantByName(
            paramConfig.projectOrigin,
          );
          // 自动丢弃 子类
          return res.data.map((item) => ({
            label: item.name,
            value: item.name,
            key: item.name,
          }));
        }}
        // fieldProps={{
        //   defaultValue: record.orginateFrom,
        // }}
      />
      <ProFormText
        rules={[{ required: true, message: "项目名不能为空" }]}
        name="name"
        label="项目名称"
        placeholder="填写项目名称"
        // fieldProps={{
        //   defaultValue: record.name,
        // }}
      />
      <ProFormText
        name="externalNumber"
        label="外部编号"
        placeholder="某专项对该项目的编号"
        // fieldProps={{
        //   defaultValue: record.externalNumber,
        // }}
      />
      <ProFormText
        name="internalNumber"
        label="内部编号"
        placeholder="内部项目管理所使用的编号.."
        // fieldProps={{
        //   defaultValue: record.internalNumber,
        // }}
      />
      <ProFormText
        name="researchUnit"
        label="承研单位"
        placeholder="合作研制的单位"
        // fieldProps={{
        //   defaultValue: record.researchUnit,
        // }}
      />
      <ProForm.Group>
        <ProFormSelect
          label="领域分类"
          name="domainClassification"
          // valueEnum={{
          //   '测绘工程': '测绘工程',
          //   '计算机工程': '计算机工程',
          // }}
          request={async () => {
            const res = await getCategoryDescendantByName(
              paramConfig.domainCategory,
            );
            // 自动丢弃 子类
            return res?.data.map((item) => ({
              label: item.name,
              value: item.name,
              key: item.name,
            }));
          }}
          // fieldProps={{
          //   defaultValue: record.domainClassification,
          // }}
        />
        <ProFormText
          rules={[{ required: true, message: "项目负责人不能为空" }]}
          name="charger"
          label="项目负责人"
          placeholder="项目负责人不能为空"
          // fieldProps={{
          //   defaultValue: record.charger,
          // }}
        />
        <ProFormSelect
          options={[
            {
              value: 0,
              label: "等待启动",
            },
            {
              value: 1,
              label: "正常进行",
            },
            {
              value: 2,
              label: "暂停",
            },
            {
              value: 3,
              label: "取消",
            },
          ]}
          placeholder="请选择项目状态"
          // fieldProps={{
          //   defaultValue: 1,
          // }}
          name="status"
          label="项目状态"
          // fieldProps={{
          //   defaultValue: record.status,
          // }}
        />
        <ProFormSelect
          options={[
            {
              value: 0,
              label: "不重要",
            },
            {
              value: 1,
              label: "一般",
            },
            {
              value: 2,
              label: "重要",
            },
            {
              value: 3,
              label: "紧急",
            },
            {
              value: 4,
              label: "十分紧急",
            },
          ]}
          placeholder="请选择项目状态"
          // fieldProps={{
          //   defaultValue: record.priority,
          // }}
          name="priority"
          label="优先级"
        />
        <ProFormDateRangePicker
          // rules={[{ required: true, message: '计划时间不能为空' }]}
          name="expectedSpendDate"
          label="预计开始/结束时间"
          // fieldProps={{
          //   defaultValue: record.expectedSpendDate
          // }}
        />
      </ProForm.Group>
      <ProFormText
        name="keys"
        label="可用于快速检索的关键字"
        placeholder="关键字"
        // fieldProps={{
        //   defaultValue: record.keys,
        // }}
      />
      <ProFormTextArea
        name="workContent"
        row={6}
        label="建设内容"
        placeholder="项目建设的目标或内容"
        // fieldProps={{
        //   defaultValue: record.workContent,
        // }}
      />
      <ProFormTextArea
        name="remark"
        row={3}
        label="进展情况描述信息"
        placeholder="项目进展的描述信息"
        // fieldProps={{
        //   defaultValue: record.remark,
        // }}
      />
    </ModalForm>
  );
}

export default UpdateSurveryingProjectModal;
