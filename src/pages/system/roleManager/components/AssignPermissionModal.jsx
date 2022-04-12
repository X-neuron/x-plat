import { useRef } from "react";
import { Button, message, Tree } from "antd";
import ProForm, {
  ModalForm,
  ProFormTreeSelect,
  ProFormRadio,
} from "@ant-design/pro-form";
import { PlusOutlined } from "@ant-design/icons";
import { getAllResources } from "@/service";
import { transToAntdTreeData, filterTreesFromSelectedKey } from "@/utils/utils";
import { useSafeState, useCreation, useMount } from "ahooks";
import _ from "lodash";
import { updateRole } from "../service";

// 从树中，提取出AllowMthodList来
function getAllowMethodListFromTree(tree,keys){
  const methodList = {};
  const toAntdTrees = (array) =>
    array?.forEach((item) => {
      console.log(item);
      if(item.type === 2){
        console.log("pass",item);
        methodList[item.permission]=item.name
      }
      if (item.children.length !== 0) {
        toAntdTrees(item.children);
      }
    });
  toAntdTrees(tree);
  return methodList;
}

const AssignPermissionModal = function (props) {
  const { record, title, act, sort } = props;
  const [treeData, SetTreeData] = useSafeState();
  const [templateTreeData, setTemplateTreeData] = useSafeState([]);
  const treeDataSelectedKeys = useRef();

  const handleTreeChecked = (keys, checkEnvent) => {
    treeDataSelectedKeys.current = [...checkEnvent.halfCheckedKeys, ...keys];
    setTemplateTreeData(
      filterTreesFromSelectedKey(treeData, treeDataSelectedKeys.current),
    );
  };

  useMount(async () => {
    const res = await getAllResources();
    SetTreeData(transToAntdTreeData(res?.data));
  });

  return (
    <ModalForm
      // formRef={formRef}
      //   layout="horizontal"
      title={record ? `分配 ${record.name} 角色的应用权限` : "分配资源"}
      trigger={
        <Button type="primary">
          {title ? <></> : <PlusOutlined />}
          {title || "分配权限"}
        </Button>
      }
      onFinish={async (values) => {
        // console.log("getAllowMethodListFromTree",getAllowMethodListFromTree(templateTreeData,treeDataSelectedKeys.current));
        if(templateTreeData.length !== 0){
          const res = await updateRole(record.id,{
            permission:templateTreeData,
            allowMethodList:getAllowMethodListFromTree(templateTreeData,treeDataSelectedKeys.current),
          });
          message.success("提交成功");
        }else{
          message.error("请选择权限表单")
        }
        // const res = await createRole(record.id,templateTreeData);
        // console.log(res);
        return true;
      }}
    >
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
        checkable={true}
        // defaultExpandAll={true}
        // dropdownRender={() => <p>hehlo</p>}
        // placeholder="按需勾选所需的步骤"
        // onChange={onStepChange}
        // loadData={onLoadStepData}
        treeData={treeData}
        onCheck={handleTreeChecked}
        // onDropdownVisibleChange={onLoadStepData}
        treeCheckable={true}
        // showCheckedStrategy={SHOW_PARENT}
        // showCheckedStrategy={TreeSelect.SHOW_ALL}
        // maxTagCount={}
        // allowClear
        // multiple
      />
    </ModalForm>
  );
};

export default AssignPermissionModal;
