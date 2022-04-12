import EditableProTable from "@ant-design/pro-table";
import { Button, message, Space, Popconfirm } from "antd";
import { useSafeState } from "ahooks";
import { useRef } from "react";
import { getOrganizationTreeByName, getAllRoles } from "@/service";
import paramConfig from "@/config/params";
import { transToAntdTreeData } from "@/utils/utils";
import { getAccounts, updateAccountMess } from "../service";

// const transToAntdTreeData = (tree) => {
//   const toAntdTrees = (array) => array?.map((item) => {
//     const returnValue = {
//       id: item.id,
//       key: item.id,
//       value: item.id,
//       title: item.name,
//       isLeaf: item.children.length === 0,
//       // disableCheckbox:item.children.length === 0 ? true:false,
//       // selectable: item.children.length !== 0? true:false //叶子节点不可选，子步骤不会修改
//     };
//     if (item.children.length !== 0) {
//       returnValue.children = toAntdTrees(item.children);
//     }
//     return returnValue;
//   });
//   const ret = toAntdTrees(tree);
//   return ret;
// };

const UserTable = function () {
  const [editableKeys, setEditableRowKeys] = useSafeState([]);
  const [dataSource, setDataSource] = useSafeState([]);
  const fileTreeTable = useRef();
  const columns = [
    //   {
    //     title: "操作",
    //     key: "operation",
    //     align: "center",
    //     fixed: "center",
    //     valueType: "option",
    //     // 当前行的值，当前行数据，行索引
    //     render: (_, record) => (
    //       <Space size="small">
    //         <Button type="primary" onClick={() => dispatchRole(record)}>
    //             分配角色
    //         </Button>
    //         <Button type="primary" onClick={() => dispatchRole(record)}>
    //             分配部门
    //         </Button>
    //         <Button onClick={() => resetPasswordRow(record)}>重置密码</Button>
    //         <Button type="primary" danger onClick={() => deleteRow(record)}>
    //             删除
    //         </Button>
    //       </Space>
    //     ),
    //   },
    {
      title: "用户名",
      dataIndex: "account",
      editable: false,
      align: "right",
      key: "account",
    },
    {
      title: "手机号码",
      dataIndex: "phoneNumber",
      align: "center",
      editable: false,
      key: "phoneNumber",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      align: "right",
      editable: false,
      key: "email",
    },
    {
      title: "昵称",
      dataIndex: "nickName",
      align: "right",
      editable: false,
      key: "nickName",
    },
    {
      title: "状态",
      dataIndex: "status",
      align: "center",
      key: "status",
      valueType: "select",
      valueEnum: {
        1: {
          text: "正常",
          status: 1,
        },
        0: {
          text: "禁用",
          status: 0,
        },
      },
      // render: (_, record) => {
      // if (record.status) {
      //     return "正常";
      // }
      // return "禁用";

      // },
    },
    {
      title: "所属部门",
      dataIndex: "department",
      width: 150,
      align: "center",
      valueType: "treeSelect",
      fieldProps: {
        showArrow: false,
        // filterTreeNode: true,
        // showSearch: true,
        dropdownMatchSelectWidth: false,
        // labelInValue: true,
        // autoClearSearchValue: true,
        // multiple: true,
        // treeNodeFilterProp: "title",
        // fieldNames: {
        //   label: "title",
        // },
      },
      request: async () => {
        const res = await getOrganizationTreeByName(paramConfig.orgRootNode);
        return transToAntdTreeData(res.data);
      },
      render: (_, record) => record.organizations[0]?.name,
    },
    {
      title: "系统角色",
      dataIndex: "role",
      width: 120,
      align: "center",
      valueType: "select",
      request: async () => {
        const res = await getAllRoles();
        console.log(res.data);
        return res.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
      },
      render: (_, record) => record.roles[0]?.name,
    },
    {
      title: "账户类型",
      dataIndex: "type",
      editable: false,
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
      valueType: "select",
      valueEnum: {
        true: {
          text: "是",
          isSuper: true,
        },
        false: {
          text: "否",
          isSuper: false,
        },
      },
      render: (_, record) => {
        if (record.isSuper) {
          return "是";
        }
        return "否";
      },
    },
    {
      title: "操作",
      valueType: "option",
      // width: 150,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          title="删除后不可恢复，确认删除?"
          onConfirm={async () => {
            message.error("删除用户功能暂不开放");
            //   const res = await deleteUser(record);
            //   if (res) {
            //     setDataSource(
            //       dataSource.filter((item) => item.id !== record.id),
            //     );
            //   }
          }}
        >
          <Button type="dashed" danger>
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <EditableProTable
      actionRef={fileTreeTable}
      columns={columns}
      // 第一个参数 params 查询表单和 params 参数的结合
      // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
      request={async (params, sort, filter) => {
        const res = await getAccounts(params);
        return Promise.resolve({
          total: res.data.meta.itemCount,
          data: res.data.data,
          success: true,
        });
      }}
      value={dataSource}
      rowKey="id"
      editable={{
        type: "multiple",
        editableKeys,
        onSave: async (rowKey, record, row) => {
          // await waitTime(2000);
          console.log(record);
          if (record.id) {
            const res = await updateAccountMess(record.id, {
              isSuper: JSON.parse(record.isSuper),
              status: JSON.parse(record.status),
              organizations: record.department, // 部门的id 目前暂只支持1个部门。后期修改多部门
              roles: record.role,
            });
            if (res.data) {
              message.info("修改成功");
            }
          }
        },
        onChange: setEditableRowKeys,
      }}
    />
  );
};

export default UserTable;
