import ProTable from "@ant-design/pro-table";
import { Button, Space } from "antd";
import { getUsers } from "./service";

const columns = [
  {
    title: "操作",
    key: "operation",
    align: "center",
    fixed: "center",
    valueType: "option",
    // 当前行的值，当前行数据，行索引
    render: (_, record) => (
      <Space size="small">
        <Button type="primary" onClick={() => modifyRow(record)}>
            编辑
        </Button>
        <Button type="primary" onClick={() => dispatchRole(record)}>
            分配角色
        </Button>
        <Button type="primary" onClick={() => dispatchRole(record)}>
            分配部门
        </Button>
        <Button onClick={() => resetPasswordRow(record)}>重置密码</Button>
        <Button type="primary" danger onClick={() => deleteRow(record)}>
            删除
        </Button>
      </Space>
    ),
  },
  {
    title: "用户名",
    dataIndex: "account",
    align: "right",
    key: "account",
  },
  {
    title: "手机号码",
    dataIndex: "phoneNumber",
    align: "center",
    key: "phoneNumber",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    align: "right",
    key: "email",
  },
  {
    title: "昵称",
    dataIndex: "nickName",
    align: "right",
    key: "nickName",
  },
  {
    title: "状态",
    dataIndex: "status",
    align: "center",
    key: "status",
    render: (_, record) => {
      if (record.status) {
        return "正常";
      }
      return "禁用";

    },
  },
  {
    title: "账户类型",
    dataIndex: "type",
    align: "right",
    key: "type",
    render: (_, record) => {
      if (record.accountType) {
        return "普通账户";
      }
      return "APP应用账户";

    },
  },
  {
    title: "是否超管",
    dataIndex: "isSuper",
    align: "center",
    render: (_, record) => {
      if (record.isSuper) {
        return "是";
      }
      return "否";

    },
  },
];

const UserManager = function() {
  return (
    <ProTable
      columns={columns}
      // 第一个参数 params 查询表单和 params 参数的结合
      // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
      request={async (params, sort, filter) => {
        const res = await getUsers(params);
        return Promise.resolve({
          total: res.data.meta.itemCount,
          data: res.data.data,
          success: true,
        });
      }}
      rowKey="id"
    ></ProTable>
  );
}

export default UserManager;
