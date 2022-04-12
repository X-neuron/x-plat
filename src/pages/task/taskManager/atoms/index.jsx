import { atom, selector } from "recoil";
import paramConfig from "@/config/params";
import { getTaskDetailById, getTaskStepDetail } from "../service";

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
export const taskBrowseModeAtom = atom({
  key: "taskBrowseModeAtom",
  default: false,
});

export const taskBrowseMajorStepAtom = atom({
  key: "taskBrowseMajorStepAtom",
  default: 0,
});

export const taskBrowseSubStepAtom = atom({
  key: "taskBrowseSubStepAtom",
  default: 0,
});

export const taskRecordAtom = atom({
  key: "taskRecord",
  // 其实只用了其id
  default: {
    id: 0,
    flowType: paramConfig.taskFlow,
  },
});

export const taskDetailAtom = selector({
  key: "taskDetailAtom",
  get: async ({ get }) => {
    // res 里携带了步骤模板、经费信息，不带当前步骤的详细信息
    const res = await getTaskDetailById(get(taskRecordAtom)?.id);
    console.log("taskDetailAtom", res);
    return res?.data;
  },
});

export const taskMajorFlowAtom = selector({
  key: "taskMajorFlowAtom",
  get: async ({ get }) =>
    // const res = await getCategoryDescendantByName(
    //   get(taskRecordAtom)?.flowType,
    // );
    // console.log('taskMajorFlowAtom', res);
    // return res?.data;
    get(taskDetailAtom)?.stepTemplate?.details,
});

export const taskSubFlowAtom = selector({
  key: "taskSubFlowAtom",
  get: async ({ get }) => {
    // console.log('taskMajorStepAtom',get(taskMajorStepAtom));
    //
    const flow = get(taskMajorFlowAtom) ?? [];
    return flow[get(taskMajorStepAtom)]?.children;
  },
});

export const taskMajorStepAtom = selector({
  key: "taskMajorStepAtom",
  get: async ({ get }) => {
    if (get(taskBrowseModeAtom)) {
      return get(taskBrowseMajorStepAtom);
    }
    // if (!get(taskDetailAtom)) return 0;
    // return get(taskDetailAtom)?.progress?.curMainStep - 1;
    return get(taskDetailAtom)?.curMainStep - 1;
  },
});

export const taskSubStepAtom = selector({
  key: "taskSubStepAtom",
  get: async ({ get }) => {
    if (get(taskBrowseModeAtom)) {
      return get(taskBrowseSubStepAtom);
    }
    // if (!get(taskDetailAtom)) return 0;
    // return get(taskDetailAtom)?.progress?.curSubStep - 1;
    return get(taskDetailAtom)?.curSubStep - 1;
  },
});

export const taskStepDetailAtom = selector({
  key: "taskStepDetailAtom",
  get: async ({ get }) => {
    // res 当前步骤的详细信息
    const res = await getTaskStepDetail(
      get(taskRecordAtom)?.id,
      get(taskMajorStepAtom),
      get(taskSubStepAtom),
    );
    console.log("taskStepDetailAtom", res);
    return res?.data;
  },
});

// `科研项目管理/${record.orginateFrom}/${record.name}/${majorFlows[curMainStep].name}/${subFlows[curSubStep].name}`
export const taskFileFeatureAtom = selector({
  key: "taskFileFeatureAtom",
  get: async ({ get }) => {
    const record = get(taskDetailAtom);
    const majorFlows = get(taskMajorFlowAtom);
    const subFlows = get(taskSubFlowAtom);
    const curMainStep = get(taskMajorStepAtom);
    const curSubStep = get(taskSubStepAtom);
    console.log(record, majorFlows, subFlows, curMainStep, curSubStep);
    return `任务管理/${record.orginateFrom}/${record.name}/${majorFlows[curMainStep].name}/${subFlows[curSubStep].name}`;
  },
});

export const taskCodeIndexAtom = selector({
  key: "taskCodeIndexAtom",
  get: async ({ get }) =>
    getCodeFromStep(get(taskMajorStepAtom), get(taskSubStepAtom)),
});

// const taskBrowserStepTreeData = useCreation(() => filterTransToAntdTreeData(curTaskDetail.stepTemplate.details,curTaskDetail.progress.curMainStep,curTaskDetail.progress.curSubStep),[curTaskDetail]);
export const taskBrowserStepTreeDataAtom = selector({
  key: "taskBrowserStepTreeDataAtom",
  get: async ({ get }) => {
    const curTaskDetail = get(taskDetailAtom);
    return curTaskDetail
      ? filterTransToAntdTreeData(
        curTaskDetail.stepTemplate.details,
        curTaskDetail.curMainStep,
        curTaskDetail.curSubStep,
      )
      : null;
  },
});