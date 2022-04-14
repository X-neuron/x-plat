import { atom, selector } from "recoil";

import { transPermissionToRoute } from "@/utils/utils";
import { fastLogin } from "@/service";



export const loginStateAtom = atom({
  key: "loginStateAtom",
  default: {
    role: null,
    isLogin: false,
    name: localStorage.getItem("name"),
    account: localStorage.getItem("account"),
    accessToken: localStorage.getItem("xplat-token"),
    permission:{},
    route:[
      {
        name:"欢迎面板",
        path:"/",
        icon: "FormOutlined",
        children:[
          {
            path: "/",
            // index: true, // index route写法
            name: "欢迎菜单", // 翻译失败后 则采用name配置值,如无需全球化直接使用中文即可。
            icon: "PieChartOutlined", // @/config/icons里配置的图标,小写也可以
            // access: "dashboardEnable", // @/config/access里可配置静态策略。权限入口在@/config/pages里。
            component: "dashboard", // 非动态的有page属性的路由，会默认显示在sideMmenu里。
          },
          {
            path: "roadMapUpdateLog",
            name: "开发路线图及更新日志",
            icon: "IssuesCloseOutlined",
            component: "roadMapUpdateLog",
          },
        ]
      },
      {
        name: "用户功能",
        path: "/user",
        icon: "UserOutlined",
        children: [
          {
            name: "个人中心",
            path: "center",
            icon: "UserOutlined",
            children: [
              {
                name: "个人信息管理",
                path: "messManager",
                component: "userMessManager",
                // access: "userMessManagerEnable",
              },
              {
                name: "个人安全中心",
                path: "security",
                icon: "SecurityScanOutlined",
                component: "userSecurityCenter",
                // access: "userSecurityCenterEnable",
              },
            ],
          },
          {
            name: "项目管理",
            path: "project",
            icon: "ProjectOutlined",
            children: [
              {
                name: "XXX项目管理",
                path: "surveyingProjectManager",
                component: "surveyingProjectManager",
                // access: "surveyingProjectManagerEnable",
              },
              {
                name: "项目经费明细",
                path: "surveyPrjFinanceManager",
                component: "surveyPrjFinanceManager",
              },
            ],
          },
          {
            name: "业务工作",
            path: "task",
            icon: "ProjectOutlined",
            children: [
              {
                name: "任务管理",
                path: "taskManager",
                component: "taskManager",
              },
            ],
          },
        ],
      },
      {
        name: "系统管理",
        path: "/system",
        icon: "BlockOutlined",
        children: [
          {
            name: "用户账户管理",
            path: "userManager",
            component: "userManager",
            // access: "userMangerEnable",
          },
          {
            name: "应用账户管理",
            path: "appManager",
            component: "appManager",
            // access: "appManagerEnable",
          },
          {
            name: "角色权限管理",
            path: "roleManager",
            icon: "TrademarkCircleOutlined",
            component: "roleManager",
            // access: "roleManagerEnable",
          },
          {
            name: "组织架构管理",
            path: "organizationManager",
            icon: "PartitionOutlined",
            component: "organizationManager",
            // access: "organizationManagerEnable",
          },
          {
            name: "系统类别管理",
            path: "categoryManager",
            icon: "ControlOutlined",
            component: "categoryManager",
            // access: "categoryManager",
          },
          {
            name: "人力资源管理",
            path: "HumanResourceManager",
            component: "humanResourceManager",
          },
          {
            name: "系统资源管理",
            path: "resourceManager",
            component: "resourceManager",
            // access: "resourceManagerEnable",
          },
          {
            name: "系统流程管理",
            path: "workFlowManager",
            icon: "ControlOutlined",
            component: "workFlowManager",
            // access: "workFlowManagerEnable",
          },
        ],
      },
      {
        name: "微前端",
        path: "/micro",
        icon: "PaperClipOutlined",
        children: [
          {
            name: "vue2测试",
            path: "vue2/*",
            // access: "microOpen",
            // component: 'http://localhost:8004', // 微前端配置
            component: "http://192.9.209.45:8004", // 微前端配置
          },
        ],
      },
    ],
  },
});



// export const loginStateAtom = selector({
//   key:"loginStateAtom",
//   get: async ({get}) => {
//     if(get(initLoginAtom).isLogin){
//       return get(initLoginAtom)
//     }
//     const res = await fastLogin();
//     if(res.data?.jwt){
//       const { route,permission} = res.data;
//       // console.log(transPermissionToRoute(route??[]));
//       return {
//         ...res.data,
//         route:transPermissionToRoute(route??[]),
//         permission: permission??{},
//         isLogin:true,
//       };
//     }

//     return get(initLoginAtom);

//   },
//   set: ({set,get}, newValue) => set(initLoginAtom, {
//     ...get(initLoginAtom),
//     ...newValue
//   }),
// })
