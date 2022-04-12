import ProTable from '@ant-design/pro-table';
import { Button, Space, Popconfirm } from 'antd';
import { useSafeState } from 'ahooks';
import { getResource, getResourceByParentId, deleteResource } from './service';

import CreateResModal from './components/CreateResModal';

// 资源类别表格
const ResTypeColumns = [
  {
    title: '资源名称',
    width: 150,
    dataIndex: 'name',
    align: 'left',
    key: 'name',
  },
  {
    title: '图标',
    valueType: 'option',
    dataIndex: 'icon',
    align: 'right',
    width: 80,
    key: 'icon',
  },
  {
    title: '前端路由',
    dataIndex: 'route',
    width: 240,
    align: 'right',
    key: 'route',
  },
  {
    title: '前端组件',
    dataIndex: 'component',
    width: 240,
    align: 'right',
    key: 'component',
  },
  {
    title: '权限',
    dataIndex: 'permission',
    width: 240,
    align: 'right',
    key: 'permission',
  },
  {
    title: '方法',
    dataIndex: 'method',
    width: 240,
    align: 'right',
    key: 'method',
  },

  // {
  //   title: "状态",
  //   dataIndex: "status",
  //   width: 80,
  //   align: "right",
  //   key: "status",
  //   render: (_, record) => {
  //     if (record.status) {
  //       return "正常";
  //     }
  //     return "禁用";

  //   },
  // },
  // {
  //   title: "描述",
  //   dataIndex: "remark",
  //   key: "remark",
  //   align: "left",
  // },
  {
    title: '操作',
    align: 'center',
    width: 320,
    valueType: 'option',
    render: (_, record) => (
      <Space size="small">
        {/* <CreateResModal
          record={record}
          title="修改"
          act="update"
        /> */}
        <Popconfirm
          title="删除后不可恢复，确认删除?"
          onConfirm={async () => {
            const res = await deleteResource(record);
            // if (res) {
            //   setDataSource(
            //     dataSource.filter((item) => item.id !== record.id),
            //   );
            // }
          }}
        >
          <Button type="dashed" danger>
            删除
          </Button>
        </Popconfirm>
        <CreateResModal record={record} title="新建子资源" act="new" />
      </Space>
    ),
  },
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

const ResourceManager = function () {
  const [treeData, setTreeData] = useSafeState([]);
  // const update = useUpdate();
  // const organizationTable = useRef();

  // const [curExpandedRowKey, setCurExpandedRowKey] = useSafeState([]);
  const handerExpand = async (expanded, record) => {
    // 展开 且确保没展开过。
    // if (expanded && !expandedRowKey.current.get(record.id)) {
    if (expanded) {
      const res = await getResourceByParentId(record?.id);
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
        const res = await getResource('root');
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
      dataSource={treeData}
      onExpand={handerExpand}
      bordered
      rowKey="id"
      pagination={false}
      toolBarRender={() => [<CreateResModal act="new" />]}
    />
  );
};

export default ResourceManager;
