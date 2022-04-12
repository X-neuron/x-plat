import ProTable from '@ant-design/pro-table';
import { Button, Space } from 'antd';
import { getSurveyPrjFinances } from './service';
// import CreateRoleModal from './components/createRoleModal';

// import { EditableProTable } from '@ant-design/pro-table';

const SurveyPrjFinanceManager = function () {
  const columns = [
    {
      title: '编号',
      //   copyable: true,
      dataIndex: 'bianhao',
      align: 'center',
      key: 'bianhao',
    },
    {
      title: '凭证号',
      dataIndex: 'pingzhenghao',
      align: 'center',
      key: 'pingzhenghao',
    },
    {
      title: '记账日期',
      width: 120,
      dataIndex: 'jizhangriqi',
      key: 'jizhangriqi',
      valueType: 'date',
    },
    {
      title: '科目',
      dataIndex: 'kemu',
      align: 'center',
      key: 'kemu',
    },
    {
      title: '摘要',
      width: 400,
      dataIndex: 'zhaiyao',
      align: 'center',
      key: 'zhaiyao',
    },
    {
      title: '借方',
      dataIndex: 'jiefang',
      align: 'center',
      key: 'jiefang',
    },
    {
      title: '贷方',
      dataIndex: 'daifang',
      align: 'center',
      key: 'daifang',
    },
    {
      title: '余额',
      dataIndex: 'yue',
      align: 'center',
      key: 'yue',
    },
    {
      title: '备注',
      dataIndex: 'beizhu',
      align: 'center',
      key: 'beizhu',
    },
    // {
    //   title: '操作',
    //   valueType: 'option',
    //   // width: 150,
    //   render: (text, record, _, action) => [
    //     <a
    //       key="editable"
    //       onClick={() => {
    //         action?.startEditable?.(record.id);
    //       }}
    //     >
    //       编辑
    //     </a>,
    //     record.id?
    //       <Popconfirm
    //       title="删除后不可恢复，确认删除?"
    //       onConfirm={async () => {
    //         const res = await deleteFile(record);
    //         if (res) {
    //           setDataSource(dataSource.filter((item) => item.id !== record.id));
    //         }
    //       }}
    //     >
    //       <Button type="dashed" danger>
    //         删除
    //       </Button>
    //     </Popconfirm>
    //       :<p>请刷新</p>,
    //     record.id? record.hash ? (
    //       <Button onClick={() => downLoadFile(record)}>下载</Button>
    //     ) : (
    //       <Upload
    //         headers={{
    //           authorization: `Bearer ${localStorage.getItem('xplat-token')}`,
    //         }}
    //         action={`${paramConfig.requestBaseUrl}/file/${record.id}`}
    //         // data={{
    //         //   // 上传的额外参数
    //         //   // uploaderAccount: user.account,
    //         //   // uploaderName: user.name,
    //         //   // codeIndex,
    //         //   // category: record?.domainClassification,
    //         //   // feature: fileFeature,
    //         //   // refId: record.id,
    //         // }}
    //       >
    //         <Button>上传</Button>
    //       </Upload>
    //     ) : <p>请刷新</p>,
    //   ],
    // },
  ];

  return (
    // <EditableProTable
    <ProTable
      columns={columns}
      pagination={{
        pageSize: 200,
        show: true,
      }}
      // 第一个参数 params 查询表单和 params 参数的结合
      // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
      request={async (params, sort, filter) => {
        const res = await getSurveyPrjFinances(params);
        return Promise.resolve({
          total: res.data.meta.itemCount,
          data: res.data.data,
          success: true,
        });
      }}
      rowKey="id"
    />
  );
};

export default SurveyPrjFinanceManager;
