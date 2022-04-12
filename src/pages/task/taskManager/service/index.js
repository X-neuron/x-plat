import { generatePath } from 'react-router';
import dayjs from 'dayjs';
import request from '@/utils/request';
import paramConfig from '@/config/params';

const formatDate = 'YYYY-MM-DD';
export async function downloadTaskFileListTemplate(url) {
  return request(`${paramConfig.host}/${url}`, {
    method: 'get',
    // 重要
    responseType: 'blob',
  });
}

export async function createTaskStepTemplate(params) {
  return request('/task/stepTemplate', {
    method: 'post',
    data: params,
  });
}

export async function getTaskStepTemplate(params) {
  return request('/task/stepTemplate', {
    method: 'get',
  });
}

export async function createTaskFileMess(taskId, payload) {
  return request(generatePath('/task/:taskId/file', { taskId }), {
    method: 'post',
    data: payload,
  });
}

export async function updateTaskFileMess(taskId, fileId, payload) {
  return request(
    generatePath('/task/:taskId/file/:fileId', { taskId, fileId }),
    {
      method: 'patch',
      data: payload,
    },
  );
}

export async function deleteTaskFile(taskId, fileId) {
  return request(
    generatePath('/task/:taskId/file/:fileId', { taskId, fileId }),
    {
      method: 'delete',
    },
  );
}

export async function getTaskFileUrl(taskId, fileId) {
  return request(
    generatePath('/task/:taskId/file/:fileId/url', { taskId, fileId }),
    {
      method: 'get',
    },
  );
}

export async function getTaskFiles(id, params) {
  return request(generatePath('/task/:id/files', { id }), {
    method: 'get',
    params: {
      ...params,
      page: params.current,
      take: params.pageSize,
    },
  });
}

export async function getTasks(params) {
  return request('/task', {
    method: 'get',
    params: {
      ...params,
      page: params.current,
      take: params.pageSize,
    },
  });
}

// 项目 和 开销 11 对应  获取单个项目的经费和步骤模板
export async function getTaskDetailById(parentId) {
  if (!parentId) return;
  return request(generatePath('/task/:id', { id: parentId }), {
    method: 'get',
  });
}

// 项目 和 开销 11 对应
export async function getTaskCost(parentId) {
  return request(generatePath('/task/:id/cost', { id: parentId }), {
    method: 'get',
  });
}

// 项目 和 开销 11 对应
export async function getTaskStepDetail(id, mainStep, subStep) {
  return request(
    generatePath('/task/:id/StepDetail/:mainStep/:subStep', {
      id,
      mainStep: mainStep + 1,
      subStep: subStep + 1,
    }),
    {
      method: 'get',
    },
  );
}

export async function updateTaskCost(params, parentId) {
  return request(generatePath('/task/:id/cost', { id: parentId }), {
    method: 'patch',
    data: params,
  });
}

export async function updateTaskStepDetail(
  params,
  parentId,
  mainStep,
  subStep,
) {
  return request(
    generatePath('/task/:id/StepDetail/:mainStep/:subStep', {
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

export async function createTask(params) {
  return request('/task', {
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

export async function updateTaskMetaMess(params, recordId) {
  console.log(params.expectedSpendDate);
  return request(generatePath('/task/:id', { id: recordId }), {
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
