import { useEffect, useRef } from "react";
// import ProTable from '@ant-design/pro-table';
import { EditableProTable } from "@ant-design/pro-table";
import { Button, Space, Popconfirm, message, Upload } from "antd";
import { useRecoilValue } from "recoil";
import { useSafeState } from "ahooks";
import MySwitch from "./MySwitch";
import {
  getProjectFiles,
  deleteProjectFile,
  getProjectFileUrl,
  updateProjectFileMess,
  createProjectFileMess,
} from "../service";
import { projectRecordAtom, codeIndexAtom, fileFeatureAtom } from "../atoms";
import { loginStateAtom } from "@/atoms/login";
// import { downloadFile } from '@/utils/utils'
import paramConfig from "@/config/params";

const downLoadFile = async (record) => {
  const res = await getProjectFileUrl(record.projects[0]?.id, record.id);
  // console.log('downloadfile ',record,res);
  if (res.data) {
    window.open(res.data);
    // downloadFile(res.data,record.name)
  } else {
    message.info(res.message);
  }
};

const deleteFile = async (record) => {
  const res = await deleteProjectFile(record.projects[0]?.id, record.id);
  if (res.message) {
    message.info(res.message);
    return false;
  }
  message.info("删除成功！");
  return true;

  // if(res.)
};

const BrowseFilesTable = function(props) {
  const fileTreeTable = useRef();
  const selectProject = useRecoilValue(projectRecordAtom);
  const codeIndex = useRecoilValue(codeIndexAtom);
  const fileFeature = useRecoilValue(fileFeatureAtom);
  const user = useRecoilValue(loginStateAtom);

  const columns = [
    {
      title: "文件名",
      copyable: true,
      dataIndex: "name",
      align: "right",
      // editable:false,
      key: "name",
      formItemProps: (form, { rowIndex }) => ({
        rules:
            rowIndex > 2 ? [{ required: true, message: "此项为必填项" }] : [],
      }),
    },
    {
      title: "类型",
      width: 60,
      dataIndex: "type",
      align: "right",
      editable: false,
      key: "type",
    },
    {
      title: "纸质版",
      dataIndex: "hasPaper",
      width: 70,
      align: "center",
      key: "hasPaper",
      editable: false,
      // valueType: 'select',
      // valueEnum:{
      //   "true": '有',
      //   "false": '无',
      // },
      render: (_, record) => (
        <MySwitch
          record={record}
          valueKey="hasPaper"
          size="small"
          key={record.id}
        />
      ),
    },
    {
      title: "电子版",
      dataIndex: "hasElectronic",
      width: 70,
      align: "center",
      key: "hasElectronic",
      editable: false,
      // valueType: 'select',
      // valueEnum:{
      //   "true": '有',
      //   "false": '无',
      // },
      render: (_, record) => (
        <MySwitch
          record={record}
          valueKey="hasElectronic"
          size="small"
          key={record.id}
        />
      ),
    },
    {
      title: "数量",
      dataIndex: "paperNumber",
      width: 80,
      key: "paperNumber",
      valueType: "digit",
    },
    {
      title: "创建时间",
      width: 120,
      dataIndex: "issueDate",
      key: "issueDate",
      valueType: "date",
    },
    {
      title: "大小",
      width: 80,
      dataIndex: "size",
      align: "right",
      editable: false,
      key: "size",
    },

    // {
    //   title: '分类',
    //   dataIndex: 'category',
    //   align: 'right',
    //   key: 'category',
    // },
    // {
    //   title: '操作',
    //   key: 'operation',
    //   align: 'left',
    //   fixed: 'left',
    //   valueType: 'option',
    //   // 当前行的值，当前行数据，行索引
    //   render: (_, record) => {
    //     return (
    //       <Space size="small" key={record.id}>
    //         <Popconfirm
    //           title="删除后不可恢复，确认删除?"
    //           onConfirm={() => deleteFile(record)}
    //         >
    //           <Button type="dashed" danger>
    //             删除
    //           </Button>
    //         </Popconfirm>
    //         <Button type="primary" onClick={() => downLoadFile(record)}>
    //           下载
    //         </Button>
    //       </Space>
    //     );
    //   },
    // },
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
        record.id ? (
          <Popconfirm
            title="删除后不可恢复，确认删除?"
            onConfirm={async () => {
              const res = await deleteFile(record);
              if (res) {
                setDataSource(
                  dataSource.filter((item) => item.id !== record.id),
                );
              }
            }}
          >
            <Button type="dashed" danger>
              删除
            </Button>
          </Popconfirm>
        ) : (
          <p>请刷新</p>
        ),
        record.id ? (
          record.hash ? (
            <Button onClick={() => downLoadFile(record)}>下载</Button>
          ) : (
            <Upload
              headers={{
                authorization: `Bearer ${localStorage.getItem("xplat-token")}`,
              }}
              action={`${paramConfig.requestBaseUrl}/file/${record.id}`}
              // data={{
              //   // 上传的额外参数
              //   // uploaderAccount: user.account,
              //   // uploaderName: user.name,
              //   // codeIndex,
              //   // category: record?.domainClassification,
              //   // feature: fileFeature,
              //   // refId: record.id,
              // }}
            >
              <Button>上传</Button>
            </Upload>
          )
        ) : (
          <p>请刷新</p>
        ),
      ],
    },
  ];

  const [editableKeys, setEditableRowKeys] = useSafeState([]);
  const [dataSource, setDataSource] = useSafeState([]);
  // const [treeData,setTreeData] = useSafeState();
  useEffect(async () => {
    console.log("filetreetable is:", fileTreeTable.current);
    fileTreeTable.current.reload();
  }, [selectProject, codeIndex]);
  return (
    <EditableProTable
      columns={columns}
      actionRef={fileTreeTable}
      // 第一个参数 params 查询表单和 params 参数的结合
      // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
      request={async (params, sort, filter) => {
        const res = await getProjectFiles(selectProject.id, {
          ...params,
          codeIndex,
        }); // 不带id 分页获取根的
        return Promise.resolve({
          total: res.data.meta.itemCount,
          data: res.data.data,
          success: true,
        });
      }}
      value={dataSource}
      onChange={setDataSource}
      pagination={{
        pageSize: 10,
        show: true,
      }}
      search={false}
      // treeData={treeData}
      // options={false}
      // onRow={(rec) => {
      //   return {
      //     onClick: (e) => {
      //       console.log(rec);
      //     }, // 点击行
      //   };
      // }}
      rowKey="id"
      editable={{
        type: "multiple",
        editableKeys,
        onSave: async (rowKey, record, row) => {
          console.log(
            "edit table is:,selectproject is",
            rowKey,
            record,
            row,
            selectProject,
          );
          // await waitTime(2000);
          if (record.id) {
            const res = await updateProjectFileMess(
              selectProject.id,
              record.id,
              {
                paperNumber: record.paperNumber,
                issueDate: record.issueDate,
              },
            );
            if (res.data) {
              message.info("修改成功");
            }
          } else {
            const res = await createProjectFileMess(selectProject.id, {
              name: record.name,
              codeIndex,
              feature: fileFeature,
              uploaderAccount: user.account,
              uploaderName: user.name,
              category: selectProject.domainClassification,
              paperNumber: record.paperNumber,
              issueDate: record.issueDate,
            });
            if (res.data) {
              message.info("修改成功");
              fileTreeTable.current.reload();
            }
          }
        },
        onChange: setEditableRowKeys,
      }}
      toolBarRender={() => [
        <Button
          onClick={() => {
            fileTreeTable.current.reload();
            setDataSource([]);
            setEditableRowKeys([]);
          }}
        >
          刷新
        </Button>,
      ]}
    />
  );
}

export default BrowseFilesTable;
