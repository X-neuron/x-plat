import { useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, Space, Progress } from 'antd';
import { useSafeState } from 'ahooks';
import { useRecoilState } from 'recoil';
import dayjs from 'dayjs';
import CreateTaskModal from './CreateTaskModal';
import UpdateTaskModal from './UpdateTaskModal';
import TaskFileModal from './TaskFileModal';
import { taskRecordAtom, taskBrowseModeAtom } from '../atoms';
import { getTasks } from '../service';

const columns = [
  {
    title: '任务名称',
    dataIndex: 'name',
    align: 'right',
    key: 'name',
  },
  {
    title: '任务来源',
    dataIndex: 'orginateFrom',
    align: 'right',
    key: 'orginateFrom',
  },

  {
    title: '创建人',
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
  {
    title: '操作',
    key: 'operation',
    align: 'right',
    fixed: 'left',
    valueType: 'option',
    // 当前行的值，当前行数据，行索引
    render: (_, record) => (
      <Space size="small">
        <UpdateTaskModal record={record} />
        <TaskFileModal record={record} title="文件" />
      </Space>
    ),
  },
];

const TaskTable = function (props) {
  const [selectTask, setSelectTask] = useRecoilState(taskRecordAtom);
  const [curExpandedRowKey, setCurExpandedRow] = useSafeState([]);
  const [subTaskData, setSubTaskData] = useSafeState();

  const [taskBrowseMode, setBrowseMode] = useRecoilState(taskBrowseModeAtom);

  const taskTable = useRef();
  const handerExpand = async (expanded, record) => {
    if (expanded) {
      const res = await getTasks(record?.id);
      setSubTaskData(res.data.data);
      setCurExpandedRow([record.id]);
    }
  };

  return (
    <ProTable
      columns={columns}
      // 第一个参数 params 查询表单和 params 参数的结合
      // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
      request={async (params, sort, filter) => {
        const res = await getTasks(params); // 不带id 分页获取根的
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
          setSelectTask(rec[0]);
          if (taskBrowseMode) {
            setBrowseMode(false);
          }
        },
      }}
      actionRef={taskTable}
      // onRow={(rec) => {
      //   return {
      //     onClick: (e) => {
      //       // console.log(rec)
      //       setSelectTask(rec);
      //       setBrowseMode(false);
      //     }, // 点击行
      //   };
      // }}
      rowKey="id"
      expandable={{
        expandedRowRender: () => (
          <ProTable
            columns={columns}
            // rowSelection={{
            //   type: 'radio',
            //   preserveSelectedRowKeys:true,
            //   onChange: (key,rec) => {
            //     // onSelect:(rec,key) => {
            //     console.log(rec,key);
            //     setSelectTask(rec);
            //     if(taskBrowseMode){
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
            dataSource={subTaskData}
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
      toolBarRender={() => [<CreateTaskModal />]}
    />
  );
};

export default TaskTable;
