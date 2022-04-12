import ProTable from '@ant-design/pro-table';
import { Button, Space } from 'antd';
import { useSafeState } from 'ahooks';
import { getResClasses, getResClassModules } from './service';
import CreateResClassModal from './components/CreateResClassModal';
import ResModuleTable from './components/ResModuleTable';
import CreateResModuleModal from './components/CreateResModuleModal';

// 资源类别表格
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
    title: '操作',
    align: 'center',
    width: 320,
    valueType: 'option',
    render: (_, record) => (
      <Space size="small">
        <Button type="primary" onClick={() => modifyModuleHandler(record)}>
          编辑
        </Button>
        <Button
          type="primary"
          danger
          onClick={() => deleteRowModuleHandler(record)}
        >
          删除
        </Button>
        <CreateResModuleModal record={record} title="新增子模块" />
      </Space>
    ),
  },
  {
    title: '类别名称',
    width: 150,
    dataIndex: 'className',
    align: 'right',
    key: 'className',
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
    title: '状态',
    dataIndex: 'status',
    width: 80,
    align: 'right',
    key: 'status',
    render: (_, record) => {
      if (record.status) {
        return '正常';
      }
      return '禁用';
    },
  },
  {
    title: '描述',
    dataIndex: 'remark',
    key: 'remark',
    align: 'left',
  },
];

const ResourceManager = function () {
  const [curExpandedRowKey, setCurExpandedRow] = useSafeState([]);
  const [resClassModuleData, setResClassModuleData] = useSafeState();
  const handerExpand = async (expanded, record) => {
    if (expanded) {
      const res = await getResClassModules(record?.id);
      setResClassModuleData(res.data);
      setCurExpandedRow([record.id]);
    } else {
      setCurExpandedRow([]);
    }
  };
  return (
    <ProTable
      columns={ResTypeColumns}
      // 第一个参数 params 查询表单和 params 参数的结合
      // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
      request={async (params, sort, filter) => {
        const res = await getResClasses(params);
        return Promise.resolve({
          total: res.data.meta.itemCount,
          data: res.data.data,
          success: true,
        });
      }}
      bordered
      rowKey="id"
      expandable={{
        expandedRowRender: (record) => (
          <ResModuleTable record={record} dataSource={resClassModuleData} />
        ),
        // expandRowByClick:true,
        expandedRowKeys: curExpandedRowKey,
        indentSize: 240,
      }}
      onExpand={handerExpand}
      toolBarRender={() => [<CreateResClassModal />]}
    />
  );
};

export default ResourceManager;
