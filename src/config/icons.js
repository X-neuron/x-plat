import {
  HomeOutlined,
  InsuranceOutlined,
  AuditOutlined,
  ControlOutlined,
  PartitionOutlined,
  TrademarkCircleOutlined,
  BlockOutlined,
  SettingOutlined,
  ProjectOutlined,
  IssuesCloseOutlined,
  SecurityScanOutlined,
  AppstoreOutlined,
  UserOutlined,
  FormOutlined,
  PieChartOutlined,
  PaperClipOutlined,
  BarsOutlined,
} from '@ant-design/icons';
import _ from 'lodash';
import memoized from 'nano-memoize';
import { isUrl } from '@/utils/is';
// 需要 引入 react jsx parser么？ 好像有点大。就这几个图标，还是 用函数代替吧。

const icons = new Map([
  ['HomeOutlined', <HomeOutlined />],
  ['AppstoreOutlined', <AppstoreOutlined />],
  ['FormOutlined', <FormOutlined />],
  ['PieChartOutlined', <PieChartOutlined />],
  ['PaperClipOutlined', <PaperClipOutlined />],
  ['BarsOutlined', <BarsOutlined />],
  ['UserOutlined', <UserOutlined />],
  ['IssuesCloseOutlined', <IssuesCloseOutlined />],
  ['SecurityScanOutlined', <SecurityScanOutlined />],
  ['ProjectOutlined', <ProjectOutlined />],
  ['SettingOutlined', <SettingOutlined />],
  ['BlockOutlined', <BlockOutlined />],
  ['TrademarkCircleOutlined', <TrademarkCircleOutlined />],
  ['PartitionOutlined', <PartitionOutlined />],
  ['ControlOutlined', <ControlOutlined />],
  ['AuditOutlined', <AuditOutlined />],
  ['InsuranceOutlined', <InsuranceOutlined />],
  // ['Default',<Default />] //default microapp
]);

const getIcon = memoized((_iconStr) => {
  if (isUrl(_iconStr)) {
    return (
      <img
        src={_iconStr}
        style={{
          height: 32,
          width: 32,
        }}
      />
    );
  }
  const iconStr = _.upperFirst(_iconStr);
  // let icon = icons.get(iconStr);
  return <>{icons.get(iconStr)}</>;
});

export default getIcon;
