import { useRef } from "react";
import { Button, message, TreeSelect, Space, Tag, Tree } from "antd";
import ProForm, {
  StepsForm,
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
import ProCard from "@ant-design/pro-card";
// import { DownOutlined } from '@ant-design/icons';
import { useSafeState, useCreation, useMount } from "ahooks";
import ProList from "@ant-design/pro-list";
import _ from "lodash";
import { useRecoilValue } from 'recoil';
import { taskOrginAtom, domainClassAtom } from '@/atoms/share';
import {
  getCategoryTreeByName,
} from "@/service";
import paramConfig from "@/config/params";
import { transToAntdTreeData, filterTreesFromSelectedKey } from "@/utils/utils";
import { createTask, getTaskStepTemplate } from "../service";
import SaveTemplateModal from "./SaveTemplateModal";
// const { SHOW_PARENT } = TreeSelect;

// const transToAntdTreeData = (tree) => {
//   const toAntdTrees = (array) => array?.map((item) => {
//     const returnValue = {
//       id: item.id,
//       key: item.id,
//       value: item.id,
//       title: item.name,
//       isLeaf: item.children.length === 0,
//       // disableCheckbox:item.children.length === 0 ? true:false,
//       // selectable: item.children.length !== 0? true:false //叶子节点不可选，子步骤不会修改
//     };
//     if (item.children.length !== 0) {
//       returnValue.children = toAntdTrees(item.children);
//     }
//     return returnValue;
//   });
//   const ret = toAntdTrees(tree);
//   return ret;
// };

// const filterTreesFromSelectedKey = (tree, keys) => {
//   const cloneTree = _.cloneDeep(tree);
//   const filterTree = (data) => {
//     if (!data) return;
//     const newData = data?.filter((item) => {
//       if (item?.children?.length !== 0) {
//         item.children = filterTree(item.children);
//       }
//       return keys.find((key) => key === item.id);
//     });
//     return newData;
//   };
//   return filterTree(cloneTree);
// };

const CreateTaskStepForm = function (props) {
  const formRef = useRef();

  const allStepsTreeDataSelectedKeys = useRef();
  // treeData 用来支持模板的tree数据，依据allStepsTreeDataSelectedKeys 生成
  const [templateTreeData, setTemplateTreeData] = useSafeState([]);
  const originStepsData = useRef();
  const [allStepsTreeData, setAllStepsTreeData] = useSafeState([]);
  const [templateState, setTemplateState] = useSafeState({
    treeCheckable: true, // 默认mount的时候会加载全部步骤，这时是可编辑的，所以使用true
    selectedTempalteRec: null,
    templateStepsTreeData: [],
  });

  const taskOrgin = useRecoilValue(taskOrginAtom);
  const domainClass = useRecoilValue(domainClassAtom);

  const [stepTemplateList, setStepTemplateList] = useSafeState([]);

  const handleTreeChecked = (keys, checkEnvent) => {
    allStepsTreeDataSelectedKeys.current = [
      ...checkEnvent.halfCheckedKeys,
      ...keys,
    ];
    setTemplateTreeData(
      filterTreesFromSelectedKey(
        originStepsData.current,
        allStepsTreeDataSelectedKeys.current,
      ),
    );
  };

  useMount(async () => {
    const res = await getCategoryTreeByName(paramConfig.translateTaskFlow);
    const res1 = await getTaskStepTemplate();
    originStepsData.current = res?.data;
    // const transData = transToAntdTreeData(res.data);
    // setSteps();
    setStepTemplateList(res1?.data);
    setAllStepsTreeData(transToAntdTreeData(res?.data));
  });

  // for aysnc TreeSelect :
  // const onLoadStepData = async (rec) => {
  //   console.log('onLoadStepData',rec);
  //   if(rec.title === paramConfig.taskFlow ){
  //     const res = await getCategoryTreeByName(paramConfig.taskFlow);
  //     console.log('getCategoryTreeByName is:',res.data);
  //     const transData = transToAntdTreeData(res.data);
  //     // setSteps();
  //     setSteps({
  //       value:[],
  //       treeData:[{
  //         title:paramConfig.taskFlow,
  //         id:'taskFlowRoot',
  //         key:'taskFlowRoot',
  //         value:'taskFlowRoot',
  //         // selectable:true,
  //         children:transData
  //       }]
  //     })
  //   }
  // };

  return (
    <StepsForm
      formRef={formRef}
      onFinish={async (values) => {
        if(templateState.selectedTempalteRec?.id){
          const res = await createTask({
            ...values,
            details: {
              charger: values.charger,
            },
            stepTemplateId: templateState.selectedTempalteRec.id,
          });
          message.success("提交成功");
        }else{
          message.error("请选择任务模板")
        }
        return true;
        // return false;
      }}
      formProps={{
        layout: "horizontal",
        validateMessages: {
          required: "此项为必填项",
        },
      }}
    >
      <StepsForm.StepForm
        name="step1"
        title="选择任务模板"
        onFinish={async () => true}
      >
        <ProFormSelect
          label="任务来源"
          name="orginateFrom"
          options={taskOrgin}
        />
        <ProFormText
          rules={[{ required: true, message: "任务名不能为空" }]}
          name="name"
          label="任务名称"
          placeholder="填写任务名称"
        />
        <ProCard split="vertical" width={1200}>
          <ProCard colSpan="60%">
            <ProList
              rowKey="name"
              rowSelection={{
                type: "radio",
                onChange: (key, rec) => {
                  // onSelect:(rec,key) => {
                  console.log(rec, key);
                  if (rec.length === 0) {
                    setTemplateState({
                      treeCheckable: true, // 默认mount的时候会加载全部步骤，这时是可编辑的，所以使用true
                      selectedTempalteRec: null,
                      templateStepsTreeData: [],
                    });
                  } else {
                    setTemplateState({
                      treeCheckable: false, // 默认mount的时候会加载全部步骤，这时是可编辑的，所以使用true
                      selectedTempalteRec: rec[0],
                      templateStepsTreeData: transToAntdTreeData(
                        rec[0].details,
                      ),
                    });
                  }
                },
              }}
              headerTitle="选择任务模板"
              dataSource={stepTemplateList}
              // showActions="hover"
              // showExtra="hover"
              metas={{
                title: {
                  dataIndex: "name",
                },
                // avatar: {
                //   dataIndex: 'image',
                // },
                description: {
                  dataIndex: "remark",
                },
                // subTitle: {
                //   render: () => {
                //     return (
                //       <Space size={0}>
                //         <Tag color="blue">Ant Design</Tag>
                //         <Tag color="#5BD8A6">TechUI</Tag>
                //       </Space>
                //     );
                //   },
                // },
              }}
            />
          </ProCard>
          <ProCard colSpan="40%">
            {/* <TreeSelect  */}
            <Tree
              // value={steps.value}
              // dropdownStyle={{
              //   maxHeight:400,
              //   overflow:'auto',
              // }}

              // style={{
              //   width:200
              // }}
              showLine
              // switcherIcon={<DownOutlined />}
              checkable={templateState.treeCheckable}
              // defaultExpandAll={true}
              // dropdownRender={() => <p>hehlo</p>}
              // placeholder="按需勾选所需的步骤"
              // onChange={onStepChange}
              // loadData={onLoadStepData}
              treeData={
                templateState.treeCheckable
                  ? allStepsTreeData
                  : templateState.templateStepsTreeData
              }
              onCheck={handleTreeChecked}
              // onDropdownVisibleChange={onLoadStepData}
              treeCheckable={true}
              // showCheckedStrategy={SHOW_PARENT}
              // showCheckedStrategy={TreeSelect.SHOW_ALL}
              // maxTagCount={}
              // allowClear
              // multiple
            />
            {templateState.treeCheckable ? (
              <SaveTemplateModal templateTreeData={templateTreeData} />
            ) : (
              <></>
            )}
          </ProCard>
        </ProCard>
      </StepsForm.StepForm>
      <StepsForm.StepForm
        name="step2"
        title="填写任务元信息"
        onFinish={async () =>
          // console.log(formRef.current?.getFieldsValue());
          true
        }
      >
        <ProForm.Group>
          <ProFormSelect
            label="领域分类"
            name="domainClassification"
            // valueEnum={{
            //   '测绘工程': '测绘工程',
            //   '计算机工程': '计算机工程',
            // }}
            options={domainClass}
          />
          {/* <ProFormText
            rules={[{ required: true, message: "任务负责人不能为空" }]}
            name="charger"
            label="任务负责人"
            placeholder="任务负责人不能为空"
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
            placeholder="请选择任务状态"
            fieldProps={{
              defaultValue: 1,
            }}
            name="status"
            label="任务状态"
          /> */}
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
            placeholder="请选择任务状态"
            fieldProps={{
              defaultValue: 1,
            }}
            name="priority"
            label="优先级"
          />
          <ProFormDateRangePicker
            rules={[{ required: true, message: "计划时间不能为空" }]}
            name="expectedSpendDate"
            label="预计开始/结束时间"
          />
        </ProForm.Group>
        <ProFormTextArea
          name="remark"
          row={3}
          label="进展情况描述信息"
          placeholder="任务进展的描述信息"
        />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default CreateTaskStepForm;
