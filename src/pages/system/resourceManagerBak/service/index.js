import { generatePath } from 'react-router';
import request from '@/utils/request';

export async function getResClasses(params) {
  return request('/resource/class', {
    method: 'get',
    params: {
      page: params.current,
      take: params.pageSize,
    },
  });
}

export async function createResClass(params) {
  return request('/resource/class', {
    method: 'post',
    data: {
      ...params,
      type: 0, // 默认为类别
    },
  });
}

// 暂不支持分页，貌似非大企，一般模块也就十多个。
export async function getResClassModules(classId, prarms) {
  return request(generatePath('/resource/class/:id/module', { id: classId }), {
    method: 'get',
  });
}

export async function createResClassModule(classId, params) {
  return request(generatePath('/resource/class/:id/module', { id: classId }), {
    method: 'post',
    data: {
      ...params,
      type: 1, // 默认为模块
    },
  });
}

export async function getResModuleApi(classId, moduleId, params) {
  return request(
    generatePath('/resource/class/:classId/module/:moduleId/api', {
      classId,
      moduleId,
    }),
    {
      method: 'get',
    },
  );
}

export async function createResModuleApi(classId, moduleId, params) {
  return request(
    generatePath('/resource/class/:classId/module/:moduleId/api', {
      classId,
      moduleId,
    }),
    {
      method: 'post',
      data: {
        ...params,
        type: 2, // 默认为接口
      },
    },
  );
}
