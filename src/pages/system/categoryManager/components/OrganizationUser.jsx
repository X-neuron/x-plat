
import {
  ProFormTreeSelect,
} from "@ant-design/pro-form";

import { getOrganizationUserTreeById, getAsyncOrganizationTreeById,getOrganizationsAndUserTreeById } from "@/service";
import { useRecoilValue } from "recoil";
import _ from "lodash";
import { useSafeState } from "ahooks";
import { transToAntdTreeNodeData,transToAntdTreeLeafData } from "@/utils/utils";
import { orgUserAtom } from "../atoms";


const injectChildren = (tree, id, children) => {
  if(children){
    let findDone = false;
    const findAndInsert = (data) => {
      if (!findDone) {
        data.forEach((item) => {
          if (item.id === id) {
            item.children = children;
            findDone = true;
          } else if (item?.children) {
            findAndInsert(item.children);
          }
        });
      }
    };
    findAndInsert(tree);
    return [...tree];
  }
  return tree;

};



const genTreeNode = (parentId, isLeaf = false) => {
  const random = Math.random().toString(36).substring(2, 6);
  return {
    id: random,
    pId: parentId,
    value: random,
    title: isLeaf ? "Tree Node" : "Expand to load",
    isLeaf,
  };
};

// 由于recoil 数据的订阅机制，所以要手工消除下
const safeclone = (treeArrray) => {
  if(treeArrray.length === 0){
    return
  }
  const data = [];
  const cloneObj = (curObj) => {
    const newData = { 
      id: curObj.id,
      key: curObj.id,
      pi:curObj.pid,
      value: curObj.id,
      title: curObj.name,
      isLeaf: curObj.isLeaf,
      // disableCheckbox:item.children.length === 0 ? true:false,
      selectable: curObj.selectable // 叶子节点不可选，子步骤不会修改
     };
    
    if (curObj.children) {
      const newChildren = [];
      newData.children.forEach((item) => {
        newData.push(cloneObj(item));
      });
      newData.children = newChildren;
    }
    return newData;
  };
  treeArrray.forEach((item) => {
    data.push(cloneObj(item));
  });

  return data;
}

// 异步加载树treeselect
function OrganizationUser(props) {
  // const { record } = props;

  const { label } = props;
  const treeData = useRecoilValue(orgUserAtom);

  // // const [curTreeData,setCurTreeData] = useSafeState(transToAntdTreeNodeData(treeData));
  // console.log('treeData',treeData);
  const [curTreeData,setCurTreeData] = useSafeState(safeclone(treeData));
  // console.log('safeclone',safeclone(treeData));
  // const [curTreeData,setCurTreeData] = useSafeState(_.clone(treeData));
  // console.log(curTreeData);
  // const [curTreeData,setCurTreeData] = useSafeState([
  //   {
  //       "id": "2c30417c-fd94-4147-b58f-612acb11e1de",
  //       "key": "2c30417c-fd94-4147-b58f-612acb11e1de",
  //       "pid": 0,
  //       "name": "闲聊室",
  //       "value": "2c30417c-fd94-4147-b58f-612acb11e1de",
  //       "title": "闲聊室",
  //       "isLeaf": false,
  //       "selectable": false
  //   },
  //   {
  //       "id": "fb051cf7-1b44-4aa8-aa7e-0b519fdf37c9",
  //       "key": "fb051cf7-1b44-4aa8-aa7e-0b519fdf37c9",
  //       "pid": 0,
  //       "name": "棋牌室",
  //       "value": "fb051cf7-1b44-4aa8-aa7e-0b519fdf37c9",
  //       "title": "棋牌室",
  //       "isLeaf": false,
  //       "selectable": false
  //   },
  //   {
  //       "id": "a6bfa569-31bc-448c-b2d9-d1fba1bfba19",
  //       "key": "a6bfa569-31bc-448c-b2d9-d1fba1bfba19",
  //       "pid": 0,
  //       "name": "麻将室",
  //       "value": "a6bfa569-31bc-448c-b2d9-d1fba1bfba19",
  //       "title": "麻将室",
  //       "isLeaf": false,
  //       "selectable": false
  //   }
  //   ]);

  // 看明白了这货 只能支持一次请求... 有机会发pr了。
  const onLoadData = async ({ id }) => {
    // const org = await getAsyncOrganizationTreeById(id);
    // const user = await getOrganizationUserTreeById(id);
    const orgUser = await getOrganizationsAndUserTreeById(id);
    // console.log(orgUser);
    const org = transToAntdTreeNodeData(orgUser.data.org,id);
    const user = transToAntdTreeLeafData(orgUser.data.user,id);

    // console.log([...transToAntdTreeNodeData(org.data.org,id),...transToAntdTreeLeafData(user.data.user,id)]);
    // console.log(orgUser.data.org,orgUser.data.user);
  //   console.log('transToAntdTreeNodeData',transToAntdTreeNodeData(orgUser.data.org,id));
  //   console.log('transToAntdTreeLeafData',transToAntdTreeLeafData(orgUser.data.user,id));
  //   console.log([...[],...[
  //     {
  //         "id": "4b63f2b5-a699-47ed-a680-3d5f33d3dd9b",
  //         "key": "4b63f2b5-a699-47ed-a680-3d5f33d3dd9b",
  //         "pid": "a6bfa569-31bc-448c-b2d9-d1fba1bfba19",
  //         "name": "新规处",
  //         "value": "4b63f2b5-a699-47ed-a680-3d5f33d3dd9b",
  //         "title": "新规处",
  //         "isLeaf": false,
  //         "selectable": false
  //     },
  //     {
  //         "id": "47a31a90-febe-449c-8092-3505767d7036",
  //         "key": "47a31a90-febe-449c-8092-3505767d7036",
  //         "pid": "a6bfa569-31bc-448c-b2d9-d1fba1bfba19",
  //         "name": "矛盾处",
  //         "value": "47a31a90-febe-449c-8092-3505767d7036",
  //         "title": "矛盾处",
  //         "isLeaf": false,
  //         "selectable": false
  //     }
  // ]]);
    // console.log([...[],...[]]);
    // console.log("injectChildren",injectChildren(curTreeData,id,[...transToAntdTreeNodeData(org.data),...transToAntdTreeLeafData(user.data)]));
    setCurTreeData(injectChildren(curTreeData,id,org.concat(user)));
    // setCurTreeData(injectChildren(curTreeData,id,[...transToAntdTreeNodeData(org.data)]));
    // console.log(injectChildren(curTreeData,id,[
    //   genTreeNode(id, false),
    //   genTreeNode(id, true),
    //   genTreeNode(id, true),
    // ]));
    // setCurTreeData(injectChildren(curTreeData,id,[
    //   ...(await getData(id))
    // ]));
    // setCurTreeData(injectChildren(curTreeData,id,[
    //   genTreeNode(id, false),
    //   genTreeNode(id, true),
    //   genTreeNode(id, true),
    // ]));
  };

  return (
    <ProFormTreeSelect
      name="participant"
      // label="指定参与人"
      label={label??"指定参与人"}
      width={300}
      fieldProps={{
        // placeholder: record.participant?.toString(),
        // treeCheckable: true,
        // showArrow: false,
        // filterTreeNode: true,
        // showSearch: true,
        // dropdownMatchSelectWidth: false,
        // labelInValue: true,
        // autoClearSearchValue: true,
        multiple: true,
        // treeNodeFilterProp: "title",
        // fieldNames: {
        //   label: 'title',
        // },
        // default:record.participant?.toString(),
        options:curTreeData,
        // options:latesdTreeData.current,
        loadData:onLoadData,

      }}

      placeholder="选择参与人员"
    />);
}

export default OrganizationUser;
