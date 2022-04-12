import { atom, selector } from "recoil";
import paramConfig from "@/config/params";
import { getOrganizationRootChildrenTreeByName, getCategoryDescendantByName } from "@/service";
import { transToAntdTreeNodeData } from "@/utils/utils";


export const orgUserAtom = selector({
  key: "orgUserAtom",
  get: async ({ get }) => {
    const res = await getOrganizationRootChildrenTreeByName(paramConfig.orgRootNode);
    if(res){
      return transToAntdTreeNodeData(res.data,0);
    }
    return [];
    // return res?.data;
  },
  // set: ({set}, newValue) => set(orgUserAtom, newValue)
});


export const categoryUnitAtom = selector({
  key: "categoryUnitAtom",
  get: async ({ get }) => {
    const res = await getCategoryDescendantByName(paramConfig.categoryUnit);
    if(res){
      return res.data?.map((item) => ({
        label: item.name,
        value: item.name,
        key: item.name,
      }));
    }
    return [];
  },
  // set: ({set}, newValue) => set(categoryUnitAtom, newValue)
});
