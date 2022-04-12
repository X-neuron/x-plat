import { useRef } from "react";
import ProTable from "@ant-design/pro-table";
import { Button, Space, message } from "antd";
import { useCreation, useMemoizedFn, useSafeState, useMount } from "ahooks";
import _ from "lodash";
// import { getOrganizationRootChildrenTreeByName, getCategoryDescendantByName, getAsyncOrganizationTreeById } from "@/service";
import paramConfig from "@/config/params";
import { getCategoriesByParentId, deleteCategory } from "./service";
import CategoryModal from "./components/CategoryModal";

const handleDeleteCategory = async (record) => {
  const res = await deleteCategory(record.id);
  console.log(res);
  if (res.message) {
    message.error();
    ("删除失败");
  } else {
    message.success("提交成功");
  }
  return true;
};

const injectChildren = (tree, id, children) => {
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
};


const ResTypeColumns = [
  // {
  //   title: 'ID',
  //   dataIndex: 'id',
  //   align: 'left',
  // },
  // {
  //   title: '父节点',
  //   dataIndex: 'parentId',
  //   align: 'left',
  // },
  {
    title: "类别名称",
    dataIndex: "name",
    align: "left",
    key: "name",
    width: 350,
  },
  {
    title: "权重",
    dataIndex: "weight",
    align: "left",
    key: "weight",
    width: 80,
  },
  {
    title: "单位",
    dataIndex: "unit",
    align: "left",
    key: "unit",
    width: 80,
  },
  {
    title: "操作",
    align: "left",
    width: 400,
    valueType: "option",
    // fibernode record index table
    render: (_, record, index) => (
      <Space size="small">
        <CategoryModal
          record={record}
          title="新增子类别"
          order={index}
          act="new"
          sort={record?.children ? record?.children?.length + 1 : 1}
        />
        <CategoryModal
          record={record}
          title="修改"
          order={index}
          act="update"
          sort={record?.sort}
        />
        {/* <Button type="primary" onClick={() => modifyModuleHandler(record)}>
          修改
        </Button> */}
        {!record.hasSub ? (
          <Button
            type="primary"
            danger
            onClick={() => handleDeleteCategory(record)}
          >
            删除
          </Button>
        ) : (
          ""
        )}
      </Space>
    ),
    // render: (_, record,c,d) => (
    //   <Space size="small">
    //     <CreateCategoryModal record={record} title="新增子类别" />
    //     <Button type="primary" onClick={() => modifyModuleHandler(record)}>
    //       修改
    //     </Button>
    //     {!record.hasSub ? (
    //       <Button
    //         type="primary"
    //         danger
    //         onClick={() => deleteCategory(record.id)}
    //       >
    //         删除
    //       </Button>
    //     ) : (
    //       ''
    //     )}
    //   </Space>
    // ),
  },
  {
    title: "描述",
    dataIndex: "remark",
    key: "remark",
    align: "left",
  },
];


const CategoryManager = function () {
  // const treeData = useRef([]);
  // const expandedRowKey = useRef(new Map());
  const [treeData, setTreeData] = useSafeState([]);

  // const update = useUpdate();
  // const categoryTable = useRef();

  // const [curExpandedRowKey, setCurExpandedRowKey] = useSafeState([]);
  const handerExpand = async (expanded, record) => {
    // 展开 且确保没展开过。
    // if (expanded && !expandedRowKey.current.get(record.id)) {
    if (expanded) {
      const res = await getCategoriesByParentId(record?.id);
      const transData = res.data.map((item) =>
        item.hasSub
          ? {
            ...item,
            children: [],
          }
          : item,
      );
      // injectChildren(treeData.current, record?.id, transData);
      setTreeData(injectChildren(treeData, record?.id, transData));
      // expandedRowKey.current.set(record.id, true);
      // update();
      // setCurExpandedRowKey([...curExpandedRowKey,record.id]);
      // console.log([...curExpandedRowKey,record.id]);
    }
  };


  return (
    <ProTable
      columns={ResTypeColumns}
      // 第一个参数 params 查询表单和 params 参数的结合
      // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
      request={async (params, sort, filter) => {
        const res = await getCategoriesByParentId("root");
        // treeData.current = res.data.map((item) => {
        //   return item.hasSub
        //     ? {
        //         ...item,
        //         children: [],
        //       }
        //     : item;
        // });
        setTreeData(
          res.data.map((item) =>
            item.hasSub
              ? {
                ...item,
                children: [],
              }
              : item,
          ),
        );
        // update();
      }}
      // dataSource={treeData.current}
      dataSource={treeData}
      onExpand={handerExpand}
      bordered
      rowKey="id"
      pagination={false}
      toolBarRender={() => [<CategoryModal act="new"/>]}
    ></ProTable>
  );
};

export default CategoryManager;
