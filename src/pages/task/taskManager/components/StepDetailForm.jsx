import { useRef } from 'react';
import { Button, message, TreeSelect, Popconfirm } from 'antd';

// import ProCard from '@ant-design/pro-card';
import { Suspense } from 'react';
import ProForm, {
  ProFormTextArea,
  ProFormCheckbox,
  ProFormDependency,
  ProFormSelect,
} from '@ant-design/pro-form';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useCreation, useSafeState, useUpdate, useUpdateEffect } from 'ahooks';
import _ from 'lodash';
import PageLoading from '@/components/PageLoading';

import Access from '@/components/Access';
// import paramConfig from '@/config/params';
import OrganizationUser from '@/pages/system/categoryManager/components/OrganizationUser';
import {
  taskRecordAtom,
  taskMajorStepAtom,
  taskSubStepAtom,
  taskStepDetailAtom,
  taskBrowseModeAtom,
  taskBrowseMajorStepAtom,
  taskBrowseSubStepAtom,
  taskBrowserStepTreeDataAtom,
} from '../atoms';
import { updateTaskStepDetail } from '../service';
import UploadFilesForm from './UploadFilesForm';
import BrowseFilesTable from './BrowseFilesTable';


// details 为了方便计算和提取分析。对mainStep 和 subStep 进行编码。 code  = mainStep * 100 + subStep
// 提取 主 和 当前步骤  则 为 {mainStep,subStep} = mode(code,100); 余数和莫
// curMainStep curSubStep 以js数组的0开始计算的。所以实际提取的 -1 ，生成编号的时候+ 1

// 需要生成value编号，以便 跳转步骤使用
// 编号的编码规则 100 * mainstep + substep
// 只支持2级目录 因为任务模板 暂定两级，3级不好用step图的方式表示
// 100
// 200
// 300
//  301
//  302

const getCodeFromStep = (mainStep, subStep, step = 100) =>
  (mainStep + 1) * step + subStep + 1;

const getStepFromCode = (code, step = 100) => [
  Math.floor(code / step) - 1,
  (code % step) - 1,
];

const getStepFromCodeWithoutMinus = (code, step = 100) => [
  Math.floor(code / step),
  code % step,
];

const gencode = (stepType, index, startNum) =>
  stepType === 'main' ? (index + 1) * 100 : startNum + index + 1;

const StepDetailForm = function (props) {

  const { record } = props;
  const stepDetailFromRef = useRef();

  const curSubStep = useRecoilValue(taskSubStepAtom);
  const curMainStep = useRecoilValue(taskMajorStepAtom);
  const curTaskStepDetail = useRecoilValue(taskStepDetailAtom);

  const [selectTask, setSelectTask] = useRecoilState(taskRecordAtom);

  const [taskBrowseMode, setBrowseMode] = useRecoilState(taskBrowseModeAtom);

  const [taskBrowseMajorStep, setBrowseMajorStep] = useRecoilState(
    taskBrowseMajorStepAtom,
  );

  const [taskBrowseSubStep, setBrowseSubStep] = useRecoilState(
    taskBrowseSubStepAtom,
  );

  const hasDigiFiles = useRef({
    auto: true,
    value: true,
  });

  const taskBrowserStepTreeData = useRecoilValue(
    taskBrowserStepTreeDataAtom,
  ).filterTree;
  const { stepList } = useRecoilValue(taskBrowserStepTreeDataAtom);

  const taskBrowseBtnEnable = useCreation(() => {
    const smallest = stepList[0];
    const biggest = stepList[stepList.length - 1];
    const curNumber = getCodeFromStep(curMainStep, curSubStep);
    console.log(
      'taskBrowseBtnEnable :curMainStep curSubStep',
      curMainStep,
      curSubStep,
    );
    // console.log(curNumber,biggest,smallest);
    if (smallest === biggest) {
      return {
        enableLastBtn: false,
        enableNextBtn: false,
        enableFinishBtn: true,
      };
    }
    if (curNumber === smallest) {
      return {
        enableLastBtn: false,
        enableNextBtn: true,
        enableFinishBtn: false,
      };
    }
    if (curNumber < biggest) {
      return {
        enableLastBtn: true,
        enableNextBtn: true,
        enableFinishBtn: false,
      };
    }
    if (curNumber === biggest) {
      return {
        enableLastBtn: true,
        enableNextBtn: false,
        enableFinishBtn: true,
      };
    }
  }, [curTaskStepDetail]);

  useUpdateEffect(() => {
    stepDetailFromRef.current.setFieldsValue(curTaskStepDetail);
    hasDigiFiles.current = {
      auto: true,
      value: curTaskStepDetail.hasElectronicFiles,
    };
  }, [curTaskStepDetail]);

  const handleFinishStep = async () => {
    console.log(stepDetailFromRef);
    const res = await updateTaskStepDetail(
      {
        ...stepDetailFromRef.current.getFieldsValue(),
        act: 'finish',
      },
      record?.id,
      curMainStep,
      curSubStep,
    );
    message.success('提交成功');
    // 同步更新下
    setSelectTask(record);
    return true;
  };

  // const handleUpdateStep = async () => {
  //   console.log(stepDetailFromRef.current.getFieldsValue());
  //   const res = await updateTaskStepDetail({

  //   }, record?.id);
  //   message.success('提交成功');
  //   return true;
  // }

  const update = useUpdate();
  const onBrowserStepChange = (value, label) => {
    console.log(value);
    if (value) {
      const [toMainStep, toSubStep] = getStepFromCode(value);
      setBrowseMode(true);
      setBrowseMajorStep(toMainStep);
      setBrowseSubStep(toSubStep);
    }
  };

  const handleHasDigiFilesChange = (e) => {
    console.log(hasDigiFiles, e.target.checked);
    if (hasDigiFiles.current.value !== e.target.checked) {
      hasDigiFiles.current = {
        auto: false,
        value: e.target.checked,
      };
      update();
    }
  };

  const taskBrowserStep = (act) => {
    const curStepCode = getCodeFromStep(curMainStep, curSubStep);
    const curStepPosition = _.findIndex(
      stepList,
      (value, index) => value === curStepCode,
    );
    const taskBrowseNextCode =
      act === 'last'
        ? stepList[curStepPosition - 1]
        : stepList[curStepPosition + 1];
    const [toMainStep, toSubStep] = getStepFromCode(taskBrowseNextCode);
    setBrowseMode(true);
    setBrowseMajorStep(toMainStep);
    setBrowseSubStep(toSubStep);
  };

  console.log(curMainStep,curSubStep);

  return (
    <ProForm
      layout="horizontal"
      formRef={stepDetailFromRef}
      onFinish={async (values) => {
        const res = await updateTaskStepDetail(
          {
            ...values,
            act: 'update',
          },
          record?.id,
          curMainStep,
          curSubStep,
        );
        message.success('提交成功');
        return true;
      }}
      initialValues={{
        ...curTaskStepDetail,
      }}
      submitter={{
        key: 'submitter',
        // 完全自定义整个区域
        render: (props, doms) => {
          const { form } = props;
          return [
            <Button
              type="primary"
              key="taskSubmit"
              onClick={() => form.submit()}
            >
              提交
            </Button>,
            taskBrowseBtnEnable.enableLastBtn ? (
              <Button
                type="primary"
                key="lookLast"
                onClick={() => taskBrowserStep('last')}
              >
                查看上一步
              </Button>
            ) : (
              <></>
            ),
            taskBrowseBtnEnable.enableNextBtn ? (
              <Button
                type="primary"
                key="lookNext"
                onClick={() => taskBrowserStep('next')}
              >
                查看下一步
              </Button>
            ) : (
              <></>
            ),
            taskBrowseBtnEnable.enableFinishBtn ? (
              <Popconfirm
                title="完成后当前步骤信息不再允许修改，确认完成此步?"
                onConfirm={handleFinishStep}
              >
                <Button type="dashed" danger key="finish">
                  完成此步
                </Button>
              </Popconfirm>
            ) : (
              <></>
            ),
            <TreeSelect
              style={{
                width: 280,
              }}
              // defaultExpandAll={true}
              // size={'large'}
              // dropdownRender={() => <p>hehlo</p>}
              key="viewStep"
              placeholder="查看指定步骤"
              onChange={onBrowserStepChange}
              treeData={taskBrowserStepTreeData}
              // onDropdownVisibleChange={onLoadStepData}
              // value={}
              treeCheckable={false}
              // showCheckedStrategy={SHOW_PARENT}
              // showCheckedStrategy={TreeSelect.SHOW_ALL}
              // maxTagCount={}
              allowClear
              // multiple
            />,
          ];
        },
      }}
    >
      <Suspense fallback={<PageLoading />}>
        <BrowseFilesTable />
      </Suspense>
      <Access accessible="xplat:task:assign:user" fallback={<></>} >
        {curMainStep === 1 && curSubStep === 0 ? <OrganizationUser label="分配人员"/> : <></>}
      </Access>
      <ProFormSelect
        options={[
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
            label: '已完成',
          },
        ]}
        placeholder="请选择步骤状态"
        // fieldProps={{
        //   defaultValue: 1,
        // }}
        // name={name}
        name="status"
        label="步骤状态"
      />

      <ProForm.Group>
        <ProFormCheckbox
          fieldProps={{
            onChange: handleHasDigiFilesChange,
          }}
          name="hasElectronicFiles"
          // name={name}
          label="电子文档"
          // layout='horizontal'
        />
        <ProFormCheckbox
          name="hasPaperFiles"
          // name={name}
          label="纸质文档"
          // layout='horizontal'
        />
      </ProForm.Group>
      {/* <ProFormDependency name={['hasDigiFiles']}>
          {({ name }) => {
            console.log(name);
            return name ? <UploadFilesForm record={record} /> :<></>;
          }}
        </ProFormDependency> */}
      <Suspense fallback={<PageLoading />}>
        {(
          hasDigiFiles.current.auto
            ? curTaskStepDetail?.hasElectronicFiles
            : hasDigiFiles.current.value
        ) ? (
          <UploadFilesForm record={record} />
        ) : (
          <></>
        )}
      </Suspense>
      <ProFormTextArea
        name="remark"
        row={4}
        label="备注信息"
        placeholder="任务进度需要交代的备注信息"
      />
    </ProForm>
  );
};

export default StepDetailForm;
