import ProTable from "@ant-design/pro-table";

import { Button, message, Space } from "antd";

const columns = [
  {
    title: "操作",
    align: "right",
    width: 300,
    render: (_, record) => (
      <Space size="small">
        <Button type="primary" onClick={() => modifyApiHandler(record)}>
          编辑
        </Button>
        <Button type="primary" danger onClick={() => deleteApiHandler(record)}>
          删除
        </Button>
      </Space>
    ),
  },
  {
    title: "接口名称",
    width: 150,
    dataIndex: "apiName",
    key: "apiName",
    align: "right",
  },
  {
    title: "请求方式",
    dataIndex: "method",
    key: "method",
    align: "right",
  },
  {
    title: "后端路由",
    dataIndex: "route",
    key: "method",
    align: "right",
  },
  {
    title: "状态",
    dataIndex: "status",
    width: 80,
    align: "right",
    render: (_, record) => {
      if (record.status) {
        return "正常";
      }
      return "禁用";

    },
  },
  {
    title: "描述",
    dataIndex: "remark",
    align: "left",
  },
];

const ResApiTable = function(props) {
  const { record, dataSource } = props;
  // console.log(record, dataSource);
  return (
    <ProTable
      columns={columns}
      headerTitle={false}
      search={false}
      options={false}
      pagination={false}
      bordered
      rowKey="id"
      dataSource={dataSource}
    />
  );
}
export default ResApiTable;
