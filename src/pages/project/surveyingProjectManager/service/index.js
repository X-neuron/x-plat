import { generatePath } from 'react-router';
import dayjs from 'dayjs';
import request from '@/utils/request';
import paramConfig from '@/config/params';

const formatDate = 'YYYY-MM-DD';
export async function downloadProjectFileListTemplate(url) {
  return request(`${paramConfig.host}/${url}`, {
    method: 'get',
    // 重要
    responseType: 'blob',
  });
}

export async function createProjectStepTemplate(params) {
  return request('/project/stepTemplate', {
    method: 'post',
    data: params,
  });
}

export async function getProjectStepTemplate(params) {
  return request('/project/stepTemplate', {
    method: 'get',
  });
}

export async function createProjectFileMess(projectId, payload) {
  return request(generatePath('/project/:projectId/file', { projectId }), {
    method: 'post',
    data: payload,
  });
}

export async function updateProjectFileMess(projectId, fileId, payload) {
  return request(
    generatePath('/project/:projectId/file/:fileId', { projectId, fileId }),
    {
      method: 'patch',
      data: payload,
    },
  );
}

export async function deleteProjectFile(projectId, fileId) {
  return request(
    generatePath('/project/:projectId/file/:fileId', { projectId, fileId }),
    {
      method: 'delete',
    },
  );
}

export async function getProjectFileUrl(projectId, fileId) {
  return request(
    generatePath('/project/:projectId/file/:fileId/url', { projectId, fileId }),
    {
      method: 'get',
    },
  );
}

export async function getProjectFiles(id, params) {
  return request(generatePath('/project/:id/files', { id }), {
    method: 'get',
    params: {
      ...params,
      page: params.current,
      take: params.pageSize,
    },
  });
}

export async function getProjects(params) {
  return request('/project', {
    method: 'get',
    params: {
      ...params,
      page: params.current,
      take: params.pageSize,
    },
  });
}

// 项目 和 开销 11 对应  获取单个项目的经费和步骤模板
export async function getProjectDetailById(parentId) {
  if (!parentId) return;
  return request(generatePath('/project/:id', { id: parentId }), {
    method: 'get',
  });
}

// 项目 和 开销 11 对应
export async function getProjectCost(parentId) {
  return request(generatePath('/project/:id/cost', { id: parentId }), {
    method: 'get',
  });
}

// 项目 和 开销 11 对应
export async function getProjectStepDetail(id, mainStep, subStep) {
  return request(
    generatePath('/project/:id/StepDetail/:mainStep/:subStep', {
      id,
      mainStep: mainStep + 1,
      subStep: subStep + 1,
    }),
    {
      method: 'get',
    },
  );
}

export async function updateProjectCost(params, parentId) {
  return request(generatePath('/project/:id/cost', { id: parentId }), {
    method: 'patch',
    data: params,
  });
}

export async function updateProjectStepDetail(
  params,
  parentId,
  mainStep,
  subStep,
) {
  return request(
    generatePath('/project/:id/StepDetail/:mainStep/:subStep', {
      id: parentId,
      mainStep: mainStep + 1,
      subStep: subStep + 1,
    }),
    {
      method: 'patch',
      data: params,
    },
  );
}

export async function createProject(params) {
  return request('/project', {
    method: 'post',
    data: {
      ...params,
      expectedStartDate:
        params.expectedSpendDate.length === 0
          ? dayjs().format()
          : params.expectedSpendDate[0],
      expectedEndDate:
        params.expectedSpendDate.length === 0
          ? dayjs().format()
          : params.expectedSpendDate[1],
    },
  });
}

export async function updateProjectMetaMess(params, recordId) {
  console.log(params.expectedSpendDate);
  return request(generatePath('/project/:id', { id: recordId }), {
    method: 'patch',
    data: {
      ...params,
      expectedStartDate:
        params.expectedSpendDate.length === 0
          ? dayjs().format()
          : params.expectedSpendDate[0],
      expectedEndDate:
        params.expectedSpendDate.length === 0
          ? dayjs().format()
          : params.expectedSpendDate[1],
    },
  });
}
