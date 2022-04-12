import ProTable from "@ant-design/pro-table";
import { Button, Space } from "antd";
import { useRecoilState } from "recoil";
import { transToAntdTreeData } from "@/utils/utils";
import { getRoles,getRolePermission } from "../service";
import CreateRoleModal from "./CreateRoleModal";
import AssignPermissionModal from "./AssignPermissionModal";
import { selectRoleTreeDataAtom } from "../atom";

const columns = [
  {
    title: "操作",
    key: "operation",
    align: "center",
    // fixed: 'left',
    valueType: "option",
    // 当前行的值，当前行数据，行索引
    render: (_, record) => (
      <Space size="small">
        <AssignPermissionModal record={record} />
        <Button
          type="primary"
          danger
          onClick={() => message.warning("等待功能完成")}
        >
          删除
        </Button>
      </Space>
    ),
  },
  {
    title: "角色名称",
    dataIndex: "name",
    align: "right",
    key: "name",
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
    title: "默认角色",
    dataIndex: "isDefault",
    align: "right",
    key: "isDefault",
    render: (_, record) => {
      if (record.isDefault) {
        return "是";
      }
      return "否";
    },
  },
  {
    title: "角色描述",
    dataIndex: "remark",
    key: "remark",
    align: "center",
  },
];

const RoleTable = function () {
  const [selectRoleTreeData,setSelectRoleTreeData] = useRecoilState(selectRoleTreeDataAtom);
  return (
    <ProTable
      columns={columns}
      // 第一个参数 params 查询表单和 params 参数的结合
      // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
      request={async (params, sort, filter) => {
        const res = await getRoles(params);
        return Promise.resolve({
          total: res.data.meta.itemCount,
          data: res.data.data,
          success: true,
        });
      }}
      rowSelection={{
        type: "radio",
        preserveSelectedRowKeys: true,
        onChange: async (key, rec) => {
          // onSelect:(rec,key) => {
          const res = await getRolePermission(rec[0].id);
          if(res.data?.permission){
            setSelectRoleTreeData(transToAntdTreeData(res.data.permission));
          }else{
            setSelectRoleTreeData([]);
          }
        },
      }}
      rowKey="id"
      toolBarRender={() => [<CreateRoleModal />]}
    ></ProTable>
  );
};

export default RoleTable;
