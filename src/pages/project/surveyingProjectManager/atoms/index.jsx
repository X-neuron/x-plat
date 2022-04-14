import { atom, selector } from "recoil";
import { getCategoryDescendantByName } from "@/service";
import paramConfig from "@/config/params";
import { getProjectDetailById, getProjectStepDetail } from "../service";

const gencode = (stepType, index, startNum) =>
  stepType === "main" ? (index + 1) * 100 : startNum + index + 1;

const getCodeFromStep = (mainStep, subStep, step = 100) =>
  (mainStep + 1) * step + subStep + 1;

const filterTransToAntdTreeData = (tree, curMainStep, curSubStep) => {
  const stepList = [];
  const toAntdTrees = (array, stepType, startNum) =>
    array
      ?.filter(
        (item, index) =>
          gencode(stepType, index, startNum) <= curMainStep * 100 + curSubStep,
      )
      .map((item, index) => {
        const code = gencode(stepType, index, startNum);
        if (code % 100 !== 0) stepList.push(gencode(stepType, index, startNum));
        const returnValue = {
          id: item.id,
          // key: item.id,
          // value: item.id,
          key: code,
          value: code,
          title: item.name,
          isLeaf: item.children.length === 0,
          // disableCheckbox:item.children.length === 0 ? true:false,
          selectable: item.children.length === 0, // 只能选择叶子节点
        };
        if (item.children.length !== 0) {
          returnValue.children = toAntdTrees(
            item.children,
            "children",
            (index + 1) * 100,
          );
        }
        return returnValue;
      });
  const filterTree = toAntdTrees(tree, "main");
  // console.log('filtertree,steplist is:',filterTree,stepList);
  return { filterTree, stepList };
};

// 初始为null
export const browseModeAtom = atom({
  key: "browseModeAtom",
  default: false,
});

export const browseMajorStepAtom = atom({
  key: "browseMajorStepAtom",
  default: 0,
});

export const browseSubStepAtom = atom({
  key: "browseSubStepAtom",
  default: 0,
});

export const projectRecordAtom = atom({
  key: "projectRecord",
  // 其实只用了其id
  default: {
    id: 0,
    flowType: paramConfig.projectFlow,
  },
});

export const projectDetailAtom = selector({
  key: "projectDetailAtom",
  get: async ({ get }) => {
    // res 里携带了步骤模板、经费信息，不带当前步骤的详细信息
    const res = await getProjectDetailById(get(projectRecordAtom)?.id);
    console.log("projectDetailAtom", res);
    return res?.data;
  },
});

export const projectMajorFlowAtom = selector({
  key: "projectMajorFlowAtom",
  get: async ({ get }) =>
    // const res = await getCategoryDescendantByName(
    //   get(projectRecordAtom)?.flowType,
    // );
    // console.log('projectMajorFlowAtom', res);
    // return res?.data;
    get(projectDetailAtom)?.stepTemplate?.details,
});

export const projectSubFlowAtom = selector({
  key: "projectSubFlowAtom",
  get: async ({ get }) => {
    // console.log('projectMajorStepAtom',get(projectMajorStepAtom));
    //
    const flow = get(projectMajorFlowAtom) ?? [];
    return flow[get(projectMajorStepAtom)]?.children;
  },
});

export const projectMajorStepAtom = selector({
  key: "projectMajorStepAtom",
  get: async ({ get }) => {
    if (get(browseModeAtom)) {
      return get(browseMajorStepAtom);
    }
    // if (!get(projectDetailAtom)) return 0;
    // return get(projectDetailAtom)?.progress?.curMainStep - 1;
    return get(projectDetailAtom)?.curMainStep - 1;
  },
});

export const projectSubStepAtom = selector({
  key: "projectSubStepAtom",
  get: async ({ get }) => {
    if (get(browseModeAtom)) {
      return get(browseSubStepAtom);
    }
    // if (!get(projectDetailAtom)) return 0;
    // return get(projectDetailAtom)?.progress?.curSubStep - 1;
    return get(projectDetailAtom)?.curSubStep - 1;
  },
});

export const projectStepDetailAtom = selector({
  key: "projectStepDetailAtom",
  get: async ({ get }) => {
    // res 当前步骤的详细信息
    const res = await getProjectStepDetail(
      get(projectRecordAtom)?.id,
      get(projectMajorStepAtom),
      get(projectSubStepAtom),
    );
    console.log("projectStepDetailAtom", res);
    return res?.data;
  },
});

// `XXX项目管理/${record.orginateFrom}/${record.name}/${majorFlows[curMainStep].name}/${subFlows[curSubStep].name}`
export const fileFeatureAtom = selector({
  key: "fileFeatureAtom",
  get: async ({ get }) => {
    const record = get(projectDetailAtom);
    const majorFlows = get(projectMajorFlowAtom);
    const subFlows = get(projectSubFlowAtom);
    const curMainStep = get(projectMajorStepAtom);
    const curSubStep = get(projectSubStepAtom);
    console.log(record, majorFlows, subFlows, curMainStep, curSubStep);
    return `XXX项目管理/${record.orginateFrom}/${record.name}/${majorFlows[curMainStep].name}/${subFlows[curSubStep].name}`;
  },
});

export const codeIndexAtom = selector({
  key: "codeIndexAtom",
  get: async ({ get }) =>
    getCodeFromStep(get(projectMajorStepAtom), get(projectSubStepAtom)),
});

// const browserStepTreeData = useCreation(() => filterTransToAntdTreeData(curProjectDetail.stepTemplate.details,curProjectDetail.progress.curMainStep,curProjectDetail.progress.curSubStep),[curProjectDetail]);
export const browserStepTreeDataAtom = selector({
  key: "browserStepTreeDataAtom",
  get: async ({ get }) => {
    const curProjectDetail = get(projectDetailAtom);
    return curProjectDetail
      ? filterTransToAntdTreeData(
        curProjectDetail.stepTemplate.details,
        curProjectDetail.curMainStep,
        curProjectDetail.curSubStep,
      )
      : null;
  },
});

// export const projectOrgAtom = selector({
//   key:"projectOrgAtom",
//   get: async ({get}) => {
//     const res = await getCategoryDescendantByName(
//       paramConfig.projectOrigin,
//     );
//     // 自动丢弃 子类
//     return res.data.map((item) => ({
//       label: item.name,
//       value: item.name,
//       key: item.name,
//     }));
//   }
// })
