import ProTable from '@ant-design/pro-table';
import { Button, message, Space } from 'antd';
import { useSafeState } from 'ahooks';
import { createResModule, getResModuleApi } from '../service';
import ResApiTable from './ResApiTable';
import CreateResApiModal from './CreateResApiModal';

const columns = [
  // {
  //   title: 'ID',
  //   dataIndex: 'id',
  //   align: 'right' as const,
  // },
  // {
  //   title: '父节点',
  //   dataIndex: 'parentId',
  //   align: 'right' as const,
  // },
  {
    title: '操作',
    align: 'center',
    width: 300,
    render: (_, record) => (
      <Space size="small">
        <Button type="primary" onClick={() => modifyMenuHandler(record)}>
          编辑
        </Button>
        <CreateResApiModal record={record} title="新增Api接口" />
        <Button type="primary" danger onClick={() => deleteMenuHandler(record)}>
          删除
        </Button>
      </Space>
    ),
  },
  {
    title: '模块',
    dataIndex: 'moduleName',
    width: 150,
    key: 'moduleName',
    align: 'right',
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 80,
    key: 'icon',
    align: 'right',
  },
  {
    title: '前端路由',
    dataIndex: 'route',
    width: 100,
    key: 'route',
    align: 'right',
  },
  {
    title: '前端组件',
    dataIndex: 'component',
    width: 100,
    key: 'component',
    align: 'right',
  },
  {
    title: '状态',
    width: 80,
    dataIndex: 'status',
    key: 'status',
    align: 'right',
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

const ResModuleTable = function (props) {
  const { dataSource } = props;
  console.log('resmoduletable', dataSource);
  const [curExpandedRowKey, setCurExpandedRow] = useSafeState([]);
  const [resModuleApiData, setResModuleApiData] = useSafeState();
  const reshanderExpand = async (expanded, record) => {
    if (expanded) {
      const res = await getResModuleApi(record?.parentId, record?.id);
      setResModuleApiData(res.data);
      setCurExpandedRow([record.id]);
    } else {
      setCurExpandedRow([]);
    }
  };
  return (
    <ProTable
      columns={columns}
      headerTitle={false}
      search={false}
      options={false}
      pagination={false}
      dataSource={dataSource}
      rowKey="id"
      bordered
      expandable={{
        expandedRowRender: (record) => (
          <ResApiTable record={record} dataSource={resModuleApiData} />
        ),
        // expandRowByClick:true,
        expandedRowKeys: curExpandedRowKey,
        indentSize: 20,
      }}
      onExpand={reshanderExpand}
    />
  );
};

export default ResModuleTable;
