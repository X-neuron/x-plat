import { atom, selector } from "recoil";
import { getCategoryDescendantByName,getOrganizationDescendantByName } from "@/service";
import paramConfig from "@/config/params";


export const domainClassAtom = selector({
  key: "domainClassAtom",
  get: async ({ get }) => {
    const res = await getCategoryDescendantByName(
      paramConfig.domainCategory,
    );
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

export const originFromAtom = selector({
  key: "originFromAtom",
  get: async ({ get }) => {
    const res = await getCategoryDescendantByName(
      paramConfig.projectOrigin
    );
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

export const projectCoperAtom = selector({
  key: "projectCoperAtom",
  get: async ({ get }) => {
    const res = await getCategoryDescendantByName(
      paramConfig.projectCoperation
    );
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

export const taskOrginAtom = selector({
  key: "taskOrginAtom",
  get: async ({ get }) => {
    const res = await getOrganizationDescendantByName(
      paramConfig.orgRootNode,
    );
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
