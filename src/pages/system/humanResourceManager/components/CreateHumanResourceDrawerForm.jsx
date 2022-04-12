import { Button, message } from "antd";
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormTextArea,
  ProFormSelect,
  ProFormList,
  ProFormGroup,
  ProFormFieldSet,
  ProFormDatePicker,
} from "@ant-design/pro-form";
import { PlusOutlined } from "@ant-design/icons";
import { createHumanResources, updateHumanResources } from "../service";

const CreateHumanResourceDrawerForm = function (props) {
  const { record, title, act } = props;
  return (
    <DrawerForm
      title="新建人力资源"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          新建人力资源
        </Button>
      }
      title={record ? `${record.name} 个人详细信息` : "新建人力资源"}
      trigger={
        <Button type="primary">
          {/* <PlusOutlined /> */}
          {title || "新建人力资源"}
        </Button>
      }
      initialValues={{
        ...record,
        // expectedBuget: record?.cost?.expectedBuget,
        // approvedBuget: record?.cost?.approvedBuget,
        // corperCost: record?.cost?.corperCost,
        // equipmentCost: record?.cost?.equipmentCost,
        // remark: record?.cost?.remark,
      }}
      onFinish={async (values) => {
        let res;
        console.log(act, values, record?.id);
        if (act === "new") {
          res = await createHumanResources(values);
        } else {
          res = await updateHumanResources(values, record?.id);
        }
        console.log(res);
        message.success("提交成功");
        return true;
      }}
    >
      <ProForm.Group title="个人基本信息">
        <ProFormText
          required
          name="name"
          label="姓名"
          placeholder="姓名不能为空"
        />
        <ProFormSelect
          required
          options={[
            {
              value: "男",
              label: "男",
            },
            {
              value: "女",
              label: "女",
            },
          ]}
          name="gender"
          label="性别"
        />
        {/* <ProFormSelect
          options={[
            {
              value: '党员',
              label: '党员',
            },
            {
              value: '团员',
              label: '团员',
            },
            {
              value: '群众',
              label: '群众',
            },
          ]}
          placeholder="请选择政治面貌"
          // fieldProps={{
          //   defaultValue: 1,
          // }}
          // name={name}
          name="politic"
          label="政治面貌"
        /> */}
        <ProFormText name="IDnumber" label="身份证号" />
        <ProFormDatePicker
          // required
          name="birthday"
          label="生日"
        />
        {/* <ProFormSelect
          name="nation"
          label="民族"
          request={async () => {
            const res = await getCategoryDescendantByName(
              paramConfig.nation,
            );
            return res.data.map((item) => {
              return {
                label: item.name,
                value: item.name,
                key: item.name,
              };
            });
          }}
          // placeholder="默认单位为 天"
        /> */}
      </ProForm.Group>
      <ProFormTextArea
        name="remark"
        row={6}
        label="现状描述信息"
        placeholder="该信息通常用于一些零碎信息的补充，比如，xxx现在是 xxx CEO 从事过xxx项目的研发，在xxx领域有这丰富的经验"
      />
      <ProFormList
        name="educationDetails"
        label="个人教育经历"
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
        //   name: 'educationDetail',
        // }}
        initialValue={record?.educationDetails}
      >
        <ProFormGroup>
          <ProFormDateRangePicker name="yearRange" label="时间" />
          <ProFormText name="school" label="学校" />
          <ProFormText name="profession" label="专业" />
          <ProFormSelect
            options={[
              {
                value: "全日制",
                label: "全日制",
              },
              {
                value: "在职",
                label: "在职",
              },
              {
                value: "线上",
                label: "线上",
              },
            ]}
            placeholder="请选择教育类型"
            // fieldProps={{
            //   defaultValue: 1,
            // }}
            // name={name}
            name="educationType"
            label="教育类型"
          />
          <ProFormSelect
            options={[
              {
                value: "小学",
                label: "小学",
              },
              {
                value: "初中",
                label: "初中",
              },
              {
                value: "高中",
                label: "高中",
              },
              {
                value: "学士",
                label: "学士",
              },
              {
                value: "硕士",
                label: "硕士",
              },
              {
                value: "博士",
                label: "博士",
              },
              {
                value: "博士后",
                label: "博士后",
              },
            ]}
            placeholder="选择学位"
            // fieldProps={{
            //   defaultValue: 1,
            // }}
            // name={name}
            name="academicDegree"
            label="学位"
          />
        </ProFormGroup>
      </ProFormList>
      <ProFormList
        name="corperDetails"
        label="个人任职经历"
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
        //   name: 'corperDetail',
        // }}
        initialValue={record?.corperDetails}
      >
        <ProFormGroup>
          <ProFormDateRangePicker name="yearRange" label="时间" />
          <ProFormText name="company" label="公司/单位" />
          <ProFormText name="department" label="部门" />
          <ProFormText name="managerLevel" label="行政职位" />
          <ProFormText name="professionLevel" label="专业职位" />
        </ProFormGroup>
      </ProFormList>
      <ProFormList
        name="bankDetails"
        label="银行卡信息"
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
        //   name: 'bankDetail',
        // }}
        initialValue={record?.bankDetails}
      >
        <ProFormGroup>
          <ProFormText name="bankName" label="银行名称" />
          <ProFormText name="bankAccount" label="卡号" />
          <ProFormText name="accountBank" label="开户行名称" />
        </ProFormGroup>
      </ProFormList>
      <ProFormList
        name="connectDetails"
        label="联系方式详细信息"
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
        //   name: 'connectDetail',
        // }}
        initialValue={record?.connectDetails}
      >
        <ProFormGroup>
          <ProFormText name="phone" label="手机" />
          <ProFormText name="landline" label="固定电话" />
          <ProFormText name="mail" label="邮箱" />
          <ProFormText name="address" label="住址" />
        </ProFormGroup>
      </ProFormList>
    </DrawerForm>
  );
};

export default CreateHumanResourceDrawerForm;
