import { Button } from 'antd';
import { Chrono } from "react-chrono";
import { useMount, useSafeState } from "ahooks";
import { getPosts } from '../service';

function RoadMap() {

  const [state,setState] = useSafeState([
    {
      title: "2021年5月16日",
      cardTitle: "0.0.1",
      cardSubtitle: "实现平台初步功能..",
      cardDetailedText: `这是平台这是平台这是平台这是平
          这是个平台
          这是个平台
          这是个平台
          这是个平台
          这是个平台
      `,
    },
  ]);

  useMount(async () => {
    const res = await getPosts();
    if(res.data){
      setState(res.data);
    }
  });

  const handleClick = async () => {
    const res = await getPosts();
    if(res.data){
      setState(res.data);
    }
  }



  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Button onClick={handleClick}>
          刷新
      </Button>
      <Chrono
        items={state}
        allowDynamicUpdate={true}
        mode="VERTICAL_ALTERNATING"
      />
    </div>
  );
}
export default RoadMap;
