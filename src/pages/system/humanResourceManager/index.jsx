import ProTable from '@ant-design/pro-table';
import { Button, Space, message } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import { getHumanResources, deleteHumanResources } from './service';
import CreateHumanResourceDrawerForm from './components/CreateHumanResourceDrawerForm';
// 选取最新的信息，默认 为第一条记录。把信息组合显示下，同时屏蔽掉 undefine 和 null
const mergeMess = (...details) => {
  const filterNullString = details.filter(
    (value) => value !== null || value !== undefined || value !== '',
  );
  return filterNullString.toString().replace(/,/g, ' ');
  // return  _.valuesIn(details).toString().replace(/,/g,'  ');
};

const handleDeleteHumanResources = async (id) => {
  const res = deleteHumanResources(id);
  if (res) {
    message.success('删除成功');
  }
  return true;
};

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    align: 'right',
    key: 'name',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    align: 'right',
    key: 'gender',
  },
  {
    title: '年龄',
    // dataIndex: 'gender',
    align: 'right',
    key: 'age',
    render: (_, record) => {
      if (record.birthday) {
        return `${dayjs().diff(dayjs(record.birthday), 'years')}`;
      }
      return null;
    },
  },
  {
    title: '备注信息',
    // dataIndex: 'remark',
    key: 'remark',
    align: 'center',
  },
  {
    title: '最高受教育情况',
    align: 'center',
    // key: 'employers',
    render: (_, record) => {
      if (record.educationDetails && record.educationDetails.length !== 0) {
        const educationDetail = record.educationDetails[0];
        // return `${educationDetail.school} ${educationDetail.profession} ${educationDetail.educationType} ${educationDetail.academicDegree}`;
        return mergeMess(
          educationDetail.school,
          educationDetail.profession,
          educationDetail.educationType,
          educationDetail.academicDegree,
        );
      }
      return null;
    },
  },
  {
    title: '现职业状况',
    align: 'center',
    // key: 'employers',
    render: (_, record) => {
      if (record.corperDetails && record.corperDetails.length !== 0) {
        const corperDetail = record.corperDetails[0];
        // return `${corperDetail.company} ${corperDetail.department} ${corperDetail.managerLevel} ${corperDetail.professionLevel}`;
        // return mergeMess(record.corperDetails[0]);
        return mergeMess(
          corperDetail.company,
          corperDetail.department,
          corperDetail.managerLevel,
          corperDetail.professionLevel,
        );
      }
      return null;
    },
  },
  {
    title: '联系方式',
    align: 'right',
    render: (_, record) => {
      if (record.connectDetails && record.connectDetails.length !== 0) {
        const connectDetail = record.connectDetails[0];
        return `${connectDetail.phone}`;
      }
      return null;
    },
  },
  {
    title: '操作',
    key: 'operation',
    align: 'center',
    // fixed: 'left',
    valueType: 'option',
    // 当前行的值，当前行数据，行索引
    render: (_, record) => (
      <Space size="small">
        {/* <Button type="primary" onClick={() => message.warning('等待功能完成')}>
            编辑
          </Button> */}
        <CreateHumanResourceDrawerForm
          record={record}
          title="查看修改"
          act="view"
        />
        <Button
          type="primary"
          danger
          onClick={() => handleDeleteHumanResources(record.id)}
        >
          删除
        </Button>
      </Space>
    ),
  },
];

const HumanResourceManager = function () {
  return (
    <ProTable
      columns={columns}
      // 第一个参数 params 查询表单和 params 参数的结合
      // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
      request={async (params, sort, filter) => {
        const res = await getHumanResources(params);
        return Promise.resolve({
          total: res.data.meta.itemCount,
          data: res.data.data,
          success: true,
        });
      }}
      rowKey="id"
      toolBarRender={() => [<CreateHumanResourceDrawerForm act="new" />]}
    ></ProTable>
  );
};

export default HumanResourceManager;
