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
import paramConfig from "@/config/params";
import { useRecoilValue } from 'recoil';
import { originFromAtom, domainClassAtom } from '@/atoms/share';
import { transToAntdTreeData, filterTreesFromSelectedKey } from "@/utils/utils";
import { getCategoryTreeByName } from "@/service";

import { createProject, getProjectStepTemplate } from "../service";
import SaveTemplateModal from "./SaveTemplateModal";
// import { projectOrgAtom } from "../atoms";

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

const CreateSurveryingProjectStepForm = function (props) {
  const formRef = useRef();

  // const projectOrg = useRecoilValue(projectOrgAtom);

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

  const originFrom = useRecoilValue(originFromAtom);
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
    const res = await getCategoryTreeByName(paramConfig.projectFlow);
    const res1 = await getProjectStepTemplate();
    originStepsData.current = res?.data;
    // const transData = transToAntdTreeData(res.data);
    // setSteps();
    setStepTemplateList(res1?.data);
    setAllStepsTreeData(transToAntdTreeData(res?.data));
  });

  // for aysnc TreeSelect :
  // const onLoadStepData = async (rec) => {
  //   console.log('onLoadStepData',rec);
  //   if(rec.title === paramConfig.projectFlow ){
  //     const res = await getCategoryTreeByName(paramConfig.projectFlow);
  //     console.log('getCategoryTreeByName is:',res.data);
  //     const transData = transToAntdTreeData(res.data);
  //     // setSteps();
  //     setSteps({
  //       value:[],
  //       treeData:[{
  //         title:paramConfig.projectFlow,
  //         id:'projectFlowRoot',
  //         key:'projectFlowRoot',
  //         value:'projectFlowRoot',
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
        const res = await createProject({
          ...values,
          stepTemplateId: templateState.selectedTempalteRec.id,
        });
        message.success("提交成功");
        return true;
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
        title="选择项目模板"
        onFinish={async () => true}
      >
        {/* <ProFormText
          name="orginateFrom"
          label="项目来源"
          placeholder="eg:927 海丝路、重大专项等.."
        /> */}
        <ProFormSelect
          label="项目来源"
          name="orginateFrom"
          options={originFrom}
          // request={async () => {
          //   const res = await getCategoryDescendantByName(
          //     paramConfig.projectOrigin,
          //   );
          //   // 自动丢弃 子类
          //   return res.data.map((item) => ({
          //     label: item.name,
          //     value: item.name,
          //     key: item.name,
          //   }));
          // }}
        />
        <ProFormText
          rules={[{ required: true, message: "项目名不能为空" }]}
          name="name"
          label="项目名称"
          placeholder="填写项目名称"
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
              headerTitle="选择项目模板"
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
        title="填写项目元信息"
        onFinish={async () =>
          // console.log(formRef.current?.getFieldsValue());
          true
        }
      >
        <ProFormText
          name="externalNumber"
          label="外部编号"
          placeholder="某专项对该项目的编号"
        />
        <ProFormText
          name="internalNumber"
          label="内部编号"
          placeholder="内部项目管理所使用的编号.."
        />
        <ProFormText
          name="researchUnit"
          label="承研单位"
          placeholder="合作研制的单位"
        />
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
          {/* <ProFormSelect
            label="使用流程类别"
            name="flowType"
            request={async () => {
              const res = await getCategoryDescendantByName(
                paramConfig.workFlow,
              );
              // 自动丢弃 子类
              return res.data.map((item) => {
                return {
                  label: item.name,
                  value: item.name,
                  key: item.name,
                };
              });
            }}
          /> */}
          <ProFormText
            rules={[{ required: true, message: "项目负责人不能为空" }]}
            name="charger"
            label="项目负责人"
            placeholder="项目负责人不能为空"
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
            fieldProps={{
              defaultValue: 1,
            }}
            name="status"
            label="项目状态"
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
        <ProFormText
          name="relys"
          label="申报依据文件"
          placeholder="比如：海参直[2019]1318"
        />
        <ProFormText
          name="keys"
          label="可用于快速检索的关键字"
          placeholder="关键字"
        />
        <ProFormTextArea
          name="workContent"
          row={4}
          label="建设内容"
          placeholder="项目建设的目标或内容"
        />
        <ProFormTextArea
          name="remark"
          row={3}
          label="进展情况描述信息"
          placeholder="项目进展的描述信息"
        />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default CreateSurveryingProjectStepForm;
