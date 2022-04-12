import {  useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, Space, Progress } from 'antd';
import { useSafeState } from 'ahooks';
import { useRecoilState } from 'recoil';
import dayjs from 'dayjs';
import { getProjects } from '../service';
import CreateSurveryingProjectModal from './CreateSurveryingProjectModal';
import UpdateSurveryingProjectModal from './UpdateSurveryingProjectModal';
import ProjectCostDrawerForm from './ProjectCostDrawerForm';
import ProjectFileModal from './ProjectFileModal';
import { projectRecordAtom, browseModeAtom } from '../atoms';

const columns = [
  {
    title: '项目来源',
    dataIndex: 'orginateFrom',
    align: 'right',
    key: 'orginateFrom',
  },
  {
    title: '项目名称',
    dataIndex: 'name',
    align: 'right',
    key: 'name',
  },
  {
    title: '负责人',
    dataIndex: 'charger',
    align: 'right',
    key: 'charger',
  },
  // {
  //   title: '创建时间',
  //   dataIndex: 'startDate',
  //   align: 'center',
  //   key: 'startDate',
  // },
  // {
  //   title: '完成时间',
  //   dataIndex: 'finishDate',
  //   align: 'center',
  //   key: 'finishDate',
  // },
  {
    title: '整体进度',
    dataIndex: 'progress',
    align: 'right',
    key: 'progress',
    valueType: 'option',
    render: (_, record) => <Progress percent={record.progress} size="small" />,
  },
  // {
  //   title: '经费预算',
  //   dataIndex: 'budget',
  //   key: 'budget',
  //   align: 'center',
  // },
  {
    title: '操作',
    key: 'operation',
    align: 'right',
    fixed: 'left',
    valueType: 'option',
    // 当前行的值，当前行数据，行索引
    render: (_, record) => (
      <Space size="small">
        {/* <Button onClick={() => modifyRow(record)}>修改</Button> */}
        {/* <CreateSurveryingProjectModal record={record} title={'新建子项目'} /> */}
        <UpdateSurveryingProjectModal record={record} />
        <ProjectCostDrawerForm record={record} title="经费" />
        <ProjectFileModal record={record} title="文件" />
      </Space>
    ),
  },
];

const ProjectTable = function (props) {
  const [selectProject, setSelectProject] = useRecoilState(projectRecordAtom);
  const [curExpandedRowKey, setCurExpandedRow] = useSafeState([]);
  const [subProjectData, setSubProjectData] = useSafeState();

  const [browseMode, setBrowseMode] = useRecoilState(browseModeAtom);

  const projectTable = useRef();
  const handerExpand = async (expanded, record) => {
    if (expanded) {
      const res = await getProjects(record?.id);
      setSubProjectData(res.data.data);
      setCurExpandedRow([record.id]);
    }
  };

  return (
    <ProTable
      columns={columns}
      // 第一个参数 params 查询表单和 params 参数的结合
      // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
      request={async (params, sort, filter) => {
        const res = await getProjects(params); // 不带id 分页获取根的
        return Promise.resolve({
          total: res.data.meta.itemCount,
          data: res.data.data.map((item) => ({
            ...item,
            expectedSpendDate: [
              dayjs(item.expectedStartDate),
              dayjs(item.expectedEndDate),
            ],
          })),
          success: true,
        });
      }}
      rowSelection={{
        type: 'radio',
        preserveSelectedRowKeys: true,
        onChange: (key, rec) => {
          // onSelect:(rec,key) => {
          console.log(rec, key);
          setSelectProject(rec[0]);
          if (browseMode) {
            setBrowseMode(false);
          }
        },
      }}
      actionRef={projectTable}
      // onRow={(rec) => {
      //   return {
      //     onClick: (e) => {
      //       // console.log(rec)
      //       setSelectProject(rec);
      //       setBrowseMode(false);
      //     }, // 点击行
      //   };
      // }}
      rowKey="id"
      expandable={{
        expandedRowRender: (record) => (
          <ProTable
            columns={columns}
            // rowSelection={{
            //   type: 'radio',
            //   preserveSelectedRowKeys:true,
            //   onChange: (key,rec) => {
            //     // onSelect:(rec,key) => {
            //     console.log(rec,key);
            //     setSelectProject(rec);
            //     if(browseMode){
            //       setBrowseMode(false);
            //     }
            //   }
            // }}
            headerTitle={false}
            search={false}
            options={false}
            pagination={false}
            bordered
            rowKey="id"
            dataSource={subProjectData}
          />
        ),
        rowExpandable: (record) => record.hasSub === true,
        // expandRowByClick:true,
        expandedRowKeys: curExpandedRowKey,
        indentSize: 120,
      }}
      search={{
        show: true,
        span: 12,
        collapseRender: true,
        // labelWidth: 80,
        // filterType:"light",
        layout: 'horizontal',
      }}
      onExpand={handerExpand}
      toolBarRender={() => [<CreateSurveryingProjectModal />]}
    />
  );
};

export default ProjectTable;
