import { generatePath } from 'react-router';
import request from '@/utils/request';

// 暂不支持分页，貌似非大企，一般模块也就十多个。
export async function getResourceByParentId(parentId) {
  if (parentId === 'root') {
    return request('/resource', {
      method: 'get',
    });
  }
  return request(generatePath('/resource/:id', { id: parentId }), {
    method: 'get',
  });
}

export async function getResource() {
  return request('/resource/all', {
    method: 'get',
    params: {
      name: 'root',
    },
  });
}

export async function createResource(params, parentId) {
  if (!parentId) {
    return request('/resource', {
      method: 'post',
      data: params,
    });
  }
  return request(generatePath('/resource/:id', { id: parentId }), {
    method: 'post',
    data: params,
  });
}

export async function updateResource(params, parentId) {
  return request(generatePath('/resource/:id', { id: parentId }), {
    method: 'patch',
    data: params,
  });
}

export async function deleteResource(parentId) {
  return request(generatePath('/resource/:id', { id: parentId }), {
    method: 'delete',
  });
}
