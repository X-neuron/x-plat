import ProCard from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import { useSafeState } from 'ahooks';
import Dynamic from './components/Dynamic';
import Proportion from './components/Proportion';
const Dashboard = function () {
  const [responsive, setResponsive] = useSafeState(false);

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard
        title="统计分析示例 ----> 有需求 可在 开发路线图及更新日志中反馈。谢谢合作~"
        extra="2021年7月9日"
        bordered
        headerBordered
        split={responsive ? 'horizontal' : 'vertical'}
      >
        <ProCard split="horizontal" colSpan="40%">
          <ProCard split="horizontal">
            <ProCard split={responsive ? 'horizontal' : 'vertical'}>
              <ProCard title="昨日全部流量">123</ProCard>
              <ProCard title="本月累计流量">234</ProCard>
              <ProCard title="今年累计流量">345</ProCard>
            </ProCard>
            <ProCard split="vertical">
              <ProCard title="运行中试验">12/56</ProCard>
              <ProCard title="历史试验总数">134 个</ProCard>
            </ProCard>
          </ProCard>
          <ProCard title="流量趋势">
            <Proportion />
          </ProCard>
        </ProCard>
        <ProCard title="流量占用情况" colSpan="60%">
          <Dynamic />
        </ProCard>
      </ProCard>
    </RcResizeObserver>
  );
};

export default Dashboard;
