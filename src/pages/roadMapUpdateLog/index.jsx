import { Chrono } from "react-chrono";

const RoadMapUpdateLog = function() {
  const items = [
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
    {
      title: "2021年5月17日",
      cardTitle: "0.0.2",
      cardSubtitle: "实现平台初步功能..",
      cardDetailedText: `这是平台这是平台这是平台这是平
          这是个平台
          这是个平台
          这是个平台
          这是个平台
          这是个平台

      `,
    },
    {
      title: "2021年5月18日",
      cardTitle: "0.0.3",
      cardSubtitle: "实现平台初步功能..",
      cardDetailedText: `这是平台这是平台这是平台这是平
          这是个平台
          这是个平台
          这是个平台
          这是个平台
          这是个平台

      `,
    },
    {
      title: "2021年5月19日",
      cardTitle: "0.0.3",
      cardSubtitle: "实现平台初步功能..",
      cardDetailedText: `这是平台这是平台这是平台这是平
          这是个平台
          这是个平台
          这是个平台
          这是个平台
          这是个平台

      `,
    },
    {
      title: "2021年5月20日",
      cardTitle: "0.0.3",
      cardSubtitle: "实现平台初步功能..",
      cardDetailedText: `这是平台这是平台这是平台这是平
          这是个平台
          这是个平台
          这是个平台
          这是个平台
          这是个平台

      `,
    },
    {
      title: "2021年5月21日",
      cardTitle: "0.0.3",
      cardSubtitle: "实现平台初步功能..",
      cardDetailedText: `这是平台这是平台这是平台这是平
          这是个平台
          这是个平台
          这是个平台
          这是个平台
          这是个平台

      `,
    },
  ];

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Chrono items={items} mode="VERTICAL_ALTERNATING" />
    </div>
  );
}
export default RoadMapUpdateLog;
