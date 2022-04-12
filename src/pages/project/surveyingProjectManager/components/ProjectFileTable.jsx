import { useEffect, useRef } from 'react';
// import ProTable from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { FileWordOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, Switch, message, Upload } from 'antd';
// import MySwitch from './MySwitch';
import { TemplateHandler } from 'easy-template-x';
import { useSafeState } from 'ahooks';
// import { projectRecordAtom } from '../atoms';
// import { useRecoilValue } from 'recoil';
import { saveFilefromBlob } from '@/utils/utils';
import paramConfig from '@/config/params';
import {
  getProjectFiles,
  downloadProjectFileListTemplate,
  getProjectFileUrl,
  updateProjectFileMess,
} from '../service';

// import { useSafeState } from 'ahooks';
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

const exportword = async (project, table) => {
  console.log(table);
  const res = await downloadProjectFileListTemplate(
    'public/template/projectFileListTemplate.docx',
  );

  const templateFile = new Blob([res]);
  const handler = new TemplateHandler();
  const docx = await handler.process(templateFile, {
    zhuanxiang: project.orginateFrom,
    projectName: project.name,
    file: table.map((item) => ({
      a: item.name,
      b: item.paperNumber,
      c: item.issueDate,
      d: project.remark,
    })),
  });

  saveFilefromBlob('project.name' + '查询文件清单' + '.docx', docx);
};

const columns = [
  {
    title: '文件名',
    dataIndex: 'name',
    align: 'right',
    // copyable: true,
    editable: false,
    key: 'name',
  },
  {
    title: '类型',
    width: 60,
    dataIndex: 'type',
    align: 'right',
    editable: false,
    key: 'type',
  },
  {
    title: '纸质版',
    dataIndex: 'hasPaper',
    width: 70,
    align: 'center',
    key: 'hasPaper',
    editable: false,
    // valueType: 'select',
    valueType: 'radio',
    valueEnum: {
      true: '有',
      false: '无',
    },
    render: (_, record) => (
      // return <MySwitch record={record} valueKey="hasPaper" size="small" key={record.id} />
      <Switch checked={record.hasPaper} size="small" key={record.id} />
    ),
  },
  {
    title: '电子版',
    dataIndex: 'hasElectronic',
    width: 70,
    align: 'center',
    key: 'hasElectronic',
    editable: false,
    valueType: 'radio',
    valueEnum: {
      true: '有',
      false: '无',
    },
    render: (_, record) => (
      // return <MySwitch record={record} valueKey="hasElectronic" size="small" key={record.id} />
      <Switch checked={record.hasElectronic} size="small" key={record.id} />
    ),
  },
  {
    title: '数量',
    dataIndex: 'paperNumber',
    width: 80,
    key: 'paperNumber',
    valueType: 'digit',
  },
  {
    title: '创建时间',
    width: 120,
    dataIndex: 'issueDate',
    key: 'issueDate',
    valueType: 'date',
    sorter: (a, b) => a.issueDate - b.issueDate,
  },
  // {
  //   title: '大小',
  //   width: 80,
  //   dataIndex: 'size',
  //   align: 'right',
  //   editable: false,
  //   key: 'size',
  //   valueType: 'option',
  // },
  {
    title: '操作',
    valueType: 'option',
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
      record.hash ? (
        <Button onClick={() => downLoadFile(record)}>下载</Button>
      ) : (
        <Upload
          headers={{
            authorization: `Bearer ${localStorage.getItem('xplat-token')}`,
          }}
          action={`${paramConfig.requestBaseUrl}/file/project/${record.id}`}
        >
          <Button>上传</Button>
        </Upload>
      ),
    ],
  },
];

const ProjectFileTable = function (props) {
  // const selectProject = useRecoilValue(projectRecordAtom);
  const { record } = props;
  const projectFileTable = useRef();
  const resData = useRef();
  const [editableKeys, setEditableRowKeys] = useSafeState([]);

  useEffect(async () => {
    // console.log('filetreetable is:', projectFileTable.current);
    projectFileTable.current.reload();
  }, [record]);

  return (
    // <ProTable
    <EditableProTable
      columns={columns}
      actionRef={projectFileTable}
      // 第一个参数 params 查询表单和 params 参数的结合
      // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
      request={async (params, sort, filter) => {
        const res = await getProjectFiles(record.id, {
          ...params,
        }); // 不带id 分页获取根的
        if (res.message) {
          return null;
        }
        resData.current = res.data.data;
        return Promise.resolve({
          total: res.data.meta.itemCount,
          data: res.data.data,
          success: true,
        });
      }}
      recordCreatorProps={false}
      pagination={{
        showQuickJumper: true,
        pageSize: 100,
        show: true,
      }}
      search={{
        show: true,
        span: 12,
        collapseRender: true,
        // filterType:"light",
        // labelWidth: 80,
        layout: 'horizontal',
      }}
      // dateFormatter="string"

      // treeData={treeData}
      // options={false}
      // onRow={(rec) => {
      //   return {
      //     onClick: (e) => {
      //       console.log(rec);
      //     }, // 点击行
      //   };
      // }}
      editable={{
        type: 'multiple',
        editableKeys,
        onSave: async (rowKey, record, row) => {
          console.log('edit table is:', rowKey, record, row);
          // await waitTime(2000);
          if (record.id) {
            const res = await updateProjectFileMess(
              // selectProject.id,
              record.projects[0].id,
              record.id,
              {
                paperNumber: record.paperNumber,
                issueDate: record.issueDate,
              },
            );
            if (res.data) {
              message.info('修改成功');
            }
          }
        },
        onChange: setEditableRowKeys,
      }}
      rowKey="id"
      options={{
        // search: true,
        fullScreen: true,
      }}
      toolBarRender={() => [
        <Button key="out" onClick={() => exportword(record, resData.current)}>
          <FileWordOutlined />
          导出数据
          <DownloadOutlined />
        </Button>,
      ]}
    />
  );
};

export default ProjectFileTable;
