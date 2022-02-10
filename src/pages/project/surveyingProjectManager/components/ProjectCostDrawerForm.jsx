import { Suspense } from "react";
import { Button, message } from "antd";
import ProForm, {
  ProFormText,
  ProFormDateRangePicker,
  ProFormDatePicker,
  ProFormTextArea,
  ProFormSelect,
  ProFormDigit,
  ProFormList,
  ProFormGroup,
  ProFormFieldSet,
  DrawerForm,
} from "@ant-design/pro-form";
import { useRecoilValue } from "recoil";
import PageLoading from "@/components/PageLoading";
import { getProjectCost, updateProjectCost } from "../service";
import {
  projectMajorFlowAtom,
  projectMajorStepAtom,
  projectSubStepAtom,
} from "../atoms";
import { getCategoryDescendantByName } from "@/service";
import paramConfig from "@/config/params";

const ProjectCostDrawerForm = function(props) {
  // const { record } = props;
  // record中， 带了 cost 信息
  const { record, title } = props;
  return (
    <DrawerForm
      // formRef={formRef}
      title={record ? `${record.name} 项目经费详情` : "项目经费表单"}
      trigger={
        <Button type="primary">
          {/* <PlusOutlined /> */}
          {title || "新建项目经费"}
        </Button>
      }
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
      }}
      initialValues={{
        expectedBuget: record?.cost?.expectedBuget,
        approvedBuget: record?.cost?.approvedBuget,
        corperCost: record?.cost?.corperCost,
        equipmentCost: record?.cost?.equipmentCost,
        equipmentDetail: record?.cost?.equipmentDetail,
        materialCostDetail: record?.cost?.materialCostDetail,
        remark: record?.cost?.remark,
      }}
      onFinish={async (values) => {
        const res = await updateProjectCost(values, record?.id);
        message.success("提交成功");
        return true;
      }}
    >
      <ProForm.Group title="经费使用情况（单位万）">
        <ProFormDigit
          name="expectedBuget"
          label="预计经费"
          placeholder="申报的经费"
          fieldProps={{
            precision: 2,
            // value:record?.cost?.expectedBuget,
          }}
        />
        <ProFormDigit
          name="approvedBuget"
          label="实际审批经费(已下达)"
          placeholder="审批的经费"
          fieldProps={{
            precision: 2,
            // value:record?.cost?.approvedBuget,
          }}
        />
        <ProFormDigit
          name="equipmentCost"
          label="设备费(总)"
          placeholder="申报的经费"
          fieldProps={{
            precision: 2,
            // value:record?.cost?.equipmentCost,
          }}
        />
        <ProFormDigit
          name="corperCost"
          label="外协费(总)"
          placeholder="申报的经费"
          fieldProps={{
            precision: 2,
            // value:record?.cost?.corperCost,
          }}
        />
      </ProForm.Group>
      <ProFormTextArea
        name="equipmentDetail"
        row={4}
        label="设备购置情况"
        placeholder="设备购置使用详情"
      />
      <ProFormTextArea
        name="materialCostDetail"
        row={4}
        label="数据资料费"
        placeholder="数据资料的使用情况"
      />
      <ProFormTextArea
        name="remark"
        row={5}
        label="备注信息（请不要使用回车）"
        placeholder="项目经费需要交代的备注信息，请不要使用回车，系统会在提交的信息结尾自动添加回车"
        // fieldProps={{
        //   // showCount:true,
        //   // value:record?.cost?.remark,
        // }}
      />

      <ProFormList
        name="contractDetails"
        label="合同详情（经费单位万）"
        // rules={[
        //   {
        //     validator: async (_, value) => {
        //       if (value && value.length > 0) {
        //         return;
        //       }
        //       throw new Error('至少要有一项！');
        //     },
        //   },
        // ]}
        creatorButtonProps={{
          position: "bottom",
        }}
        // creatorRecord={{
        //   name: 'everyContractDetail',
        // }}
        initialValue={record?.cost?.contractDetails}
      >
        <ProFormGroup>
          <ProFormSelect
            name="projectCoperation"
            label="项目合作方"
            width={250}
            request={async () => {
              const res = await getCategoryDescendantByName(
                paramConfig.projectCoperation,
              );
              return res.data.map((item) => ({
                label: item.name,
                value: item.name,
                key: item.name,
              }));
            }}
            placeholder="请选择项目合作方"
          />
          <ProFormText
            required
            rules={[{ required: true, message: "合同编号不应为空" }]}
            name="contractNumber"
            label="合同编号"
            placeholder="输入合同编号"
          />
          <ProFormDateRangePicker
            rules={[{ required: true, message: "计划时间不能为空" }]}
            name="contractSpendDate"
            label="合同启止时间"
          />
          <ProFormDigit
            name="expectedBuget"
            label="计划经费"
            width={70}
            fieldProps={{ precision: 2 }}
          />
          <ProFormDigit
            name="actualCost"
            label="实际使用"
            width={70}
            fieldProps={{ precision: 2 }}
          />
          <ProFormSelect
            options={[
              {
                value: 0,
                label: "超期",
              },
              {
                value: 1,
                label: "未超期",
              },
            ]}
            placeholder="项目是否超期"
            name="isExceedTimeLimit"
            label="是否超期"
          />
          <ProFormSelect
            options={[
              {
                value: 0,
                label: "系统未应用",
              },
              {
                value: 1,
                label: "系统已应用",
              },
            ]}
            placeholder="系统是否应用"
            name="isSysInUsed"
            label="是否应用"
          />
          {/* </ProFormFieldSet> */}
        </ProFormGroup>
        <ProFormTextArea
          name="contractContent"
          row={4}
          label="外协内容"
          placeholder="外协项目的建设内容"
        />
      </ProFormList>

      <ProFormList
        name="bugetDetails"
        label="经费年度使用情况（单位万）"
        // rules={[
        //   {
        //     validator: async (_, value) => {
        //       if (value && value.length > 0) {
        //         return;
        //       }
        //       throw new Error('至少要有一项！');
        //     },
        //   },
        // ]}
        creatorButtonProps={{
          position: "bottom",
        }}
        // creatorRecord={{
        //   name: 'annualBugetDetail',
        // }}
        initialValue={record?.cost?.bugetDetails}
        // initialValue={[
        //   {
        //     year: 2021,
        //     expectedBuget: 0,
        //     actualGet: 0,
        //     actualCost: 0, //嵌套展开下实际开销
        //     equipmentCost: 0,
        //     otherCost: 0,
        //     corperCost: 0,
        //     armyUnit: 0,
        //     militaryUnit: 0,
        //     civilUnit: 0,
        //   },
        // ]}
      >
        <ProFormGroup>
          <ProFormDatePicker.Year name="year" label="年份" width={80} />
          <ProFormDigit
            name="expectedBuget"
            label="预期经费"
            width={70}
            fieldProps={{ precision: 2 }}
          />
          <ProFormDigit
            name="actualGet"
            label="实际到账"
            width={70}
            fieldProps={{ precision: 2 }}
          />
          <ProFormDigit
            name="actualCost"
            label="实际使用"
            width={70}
            fieldProps={{ precision: 2 }}
          />
        </ProFormGroup>
        <ProFormGroup>
          <ProFormDigit
            name="equipmentCost"
            label="设备费"
            width={70}
            fieldProps={{ precision: 2 }}
          />
          <ProFormDigit
            name="otherCost"
            label="其他"
            width={70}
            fieldProps={{ precision: 2 }}
          />
          {/* <ProFormFieldSet name="corper" label="外协经费详情"> */}
          <ProFormDigit
            name="corperCost"
            label="外协费(总)"
            width={70}
            fieldProps={{ precision: 2 }}
          />
          <ProFormDigit
            name="armyUnit"
            label="军队单位"
            width={70}
            fieldProps={{ precision: 2 }}
          />
          <ProFormDigit
            name="militaryUnit"
            label="军工单位"
            width={70}
            fieldProps={{ precision: 2 }}
          />
          <ProFormDigit
            name="civilUnit"
            label="民口单位"
            width={70}
            fieldProps={{ precision: 2 }}
          />
          {/* </ProFormFieldSet> */}
        </ProFormGroup>
      </ProFormList>
    </DrawerForm>
  );
}

export default ProjectCostDrawerForm;
