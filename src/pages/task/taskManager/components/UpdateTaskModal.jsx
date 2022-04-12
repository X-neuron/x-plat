import { Button, message } from 'antd';
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
} from '@ant-design/pro-form';
import dayjs from 'dayjs';
// import { getCategoryDescendantByName } from '@/service';
import { useRecoilValue } from 'recoil';
import { originFromAtom, domainClassAtom } from '@/atoms/share';
import { updateTaskMetaMess } from '../service';


// const dateFormat = 'YYYY-MM-DD';
const UpdateTaskModal = function (props) {
  const { record } = props;

  const originFrom = useRecoilValue(originFromAtom);
  const domainClass = useRecoilValue(domainClassAtom);
  // console.log('update task',record);
  return (
    <ModalForm
      title={`修改 ${record.name} 任务元信息`}
      trigger={<Button>修改</Button>}
      modalProps={{
        onCancel: () => console.log('run'),
      }}
      onFinish={async (values) => {
        const res = await updateTaskMetaMess(values, record.id);
        console.log(res);
        message.success('提交成功');
        return true;
      }}
      initialValues={{
        ...record,
        expectedSpendDate: [record.expectedStartDate, record.expectedEndDate],
      }}
    >
      <ProFormSelect
        label="任务来源"
        name="orginateFrom"
        options={originFrom}
        // request={async () => {
        //   const res = await getCategoryDescendantByName(paramConfig.taskOrigin);
        //   // 自动丢弃 子类
        //   return res.data.map((item) => ({
        //     label: item.name,
        //     value: item.name,
        //     key: item.name,
        //   }));
        // }}
        // fieldProps={{
        //   defaultValue: record.orginateFrom,
        // }}
      />
      <ProFormText
        rules={[{ required: true, message: '任务名不能为空' }]}
        name="name"
        label="任务名称"
        placeholder="填写任务名称"
        // fieldProps={{
        //   defaultValue: record.name,
        // }}
      />
      <ProForm.Group>
        <ProFormSelect
          label="领域分类"
          name="domainClassification"
          options={domainClass}
        />
        <ProFormText
          rules={[{ required: true, message: '任务负责人不能为空' }]}
          name="charger"
          label="任务负责人"
          placeholder="任务负责人不能为空"
          // fieldProps={{
          //   defaultValue: record.charger,
          // }}
        />
        <ProFormSelect
          options={[
            {
              value: 0,
              label: '等待启动',
            },
            {
              value: 1,
              label: '正常进行',
            },
            {
              value: 2,
              label: '暂停',
            },
            {
              value: 3,
              label: '取消',
            },
          ]}
          placeholder="请选择任务状态"
          // fieldProps={{
          //   defaultValue: 1,
          // }}
          name="status"
          label="任务状态"
          // fieldProps={{
          //   defaultValue: record.status,
          // }}
        />
        <ProFormSelect
          options={[
            {
              value: 0,
              label: '不重要',
            },
            {
              value: 1,
              label: '一般',
            },
            {
              value: 2,
              label: '重要',
            },
            {
              value: 3,
              label: '紧急',
            },
            {
              value: 4,
              label: '十分紧急',
            },
          ]}
          placeholder="请选择任务状态"
          // fieldProps={{
          //   defaultValue: record.priority,
          // }}
          name="priority"
          label="优先级"
        />
      </ProForm.Group>
      <ProFormTextArea
        name="remark"
        row={3}
        label="进展情况描述信息"
        placeholder="任务进展的描述信息"
        // fieldProps={{
        //   defaultValue: record.remark,
        // }}
      />
    </ModalForm>
  );
};

export default UpdateTaskModal;
