import { useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, Space, message } from 'antd';
import { useCreation, useMemoizedFn, useSafeState, useUpdate } from 'ahooks';
import _ from 'lodash';
import { getOrganizationsByParentId, deleteOrganization } from '../service';
import CreateOrganizationModal from './CreateOrganizationModal';

const handleDeleteOrganization = async (record) => {
  const res = await deleteOrganization(record.id);
  console.log(res);
  if (res.message) {
    message.error();
    ('删除失败');
  } else {
    message.success('提交成功');
  }
  return true;
};

const ResTypeColumns = [
  {
    title: '组织名称',
    dataIndex: 'name',
    align: 'left',
    key: 'name',
    width: 450,
  },
  {
    title: '操作',
    align: 'left',
    width: 300,
    valueType: 'option',
    // fibernode record index table
    render: (_, record, index) => (
      <Space size="small">
        <CreateOrganizationModal
          record={record}
          title="新增子组织"
          order={index}
          act="new"
          sort={record?.children ? record?.children?.length + 1 : 1}
        />
        <CreateOrganizationModal
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
            onClick={() => handleDeleteOrganization(record)}
          >
            删除
          </Button>
        ) : (
          ''
        )}
      </Space>
    ),
    // render: (_, record,c,d) => (
    //   <Space size="small">
    //     <CreateOrganizationModal record={record} title="新增子类别" />
    //     <Button type="primary" onClick={() => modifyModuleHandler(record)}>
    //       修改
    //     </Button>
    //     {!record.hasSub ? (
    //       <Button
    //         type="primary"
    //         danger
    //         onClick={() => deleteOrganization(record.id)}
    //       >
    //         删除
    //       </Button>
    //     ) : (
    //       ''
    //     )}
    //   </Space>
    // ),
  },
  // {
  //   title: "描述",
  //   dataIndex: "remark",
  //   key: "remark",
  //   align: "left",
  // },
];

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

const OrganizationTable = function () {
  // const treeData = useRef([]);
  // const expandedRowKey = useRef(new Map());
  const [treeData, setTreeData] = useSafeState([]);
  // const update = useUpdate();
  // const organizationTable = useRef();

  // const [curExpandedRowKey, setCurExpandedRowKey] = useSafeState([]);
  const handerExpand = async (expanded, record) => {
    // 展开 且确保没展开过。
    // if (expanded && !expandedRowKey.current.get(record.id)) {
    if (expanded) {
      const res = await getOrganizationsByParentId(record?.id);
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
        const res = await getOrganizationsByParentId('root');
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
      // onRow={rec => {
      //   return {
      //     onClick:(e) => {
      //       console.log(rec);
      //     }
      //   }}
      // }
      rowKey="id"
      pagination={false}
      toolBarRender={() => [<CreateOrganizationModal act="new" />]}
    ></ProTable>
  );
};

export default OrganizationTable;
