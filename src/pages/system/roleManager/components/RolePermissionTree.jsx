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
import { useSafeState, useUpdateEffect,  } from "ahooks";
import { useRecoilValue } from "recoil";
import { updateRole,getRolePermission } from "../service";
import { selectRoleTreeDataAtom } from "../atom";

const RolePermissionTree = function (props) {
  // const [treeData, SetTreeData] = useSafeState();
  const treeData = useRecoilValue(selectRoleTreeDataAtom);
  // console.log(selectRole);

  // useUpdateEffect(async () => {
  //   if(selectRole){
  //     const res = await getRolePermission(selectRole);
  //     console.log(res.data);
  //     if(res.data?.permission){
  //       SetTreeData(transToAntdTreeData(res.data.permission));
  //     }else{
  //       SetTreeData([]);
  //     }
  //   }
  // });

  return (
  // <ProForm
  //   onFinish={async (values) => {
  //     if(templateTreeData.length !== 0){
  //       const res = await updateRole(record.id,{
  //         permission:templateTreeData
  //       });

    //     }else{
    //       message.error("请选择权限表单")
    //     }
    //     // const res = await createRole(record.id,templateTreeData);
    //     // console.log(res);
    //     message.success("提交成功");
    //     return true;
    //   }}
    // >
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
      checkable={false}
      // defaultExpandAll={true}
      // dropdownRender={() => <p>hehlo</p>}
      // placeholder="按需勾选所需的步骤"
      // onChange={onStepChange}
      // loadData={onLoadStepData}
      treeData={treeData}
      defaultExpandAll={true}
      autoExpandParent={true}
      // onCheck={handleTreeChecked}
      // onDropdownVisibleChange={onLoadStepData}
      // treeCheckable={true}
      // showCheckedStrategy={SHOW_PARENT}
      // showCheckedStrategy={TreeSelect.SHOW_ALL}
      // maxTagCount={}
      // allowClear
      // multiple
    />
    // </ProForm>
  );
};

export default RolePermissionTree;
