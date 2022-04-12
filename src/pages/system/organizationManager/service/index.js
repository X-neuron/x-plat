import { generatePath } from 'react-router';
import request from '@/utils/request';

// 暂不支持分页，貌似非大企，一般模块也就十多个。
export async function getOrganizationsByParentId(parentId) {
  if (parentId === 'root') {
    return request('/organization', {
      method: 'get',
    });
  }
  return request(generatePath('/organization/:id', { id: parentId }), {
    method: 'get',
  });
}

export async function getOrganizations() {
  return request('/organization/all', {
    method: 'get',
    params: {
      name: 'root',
    },
  });
}

export async function createOrganization(params, parentId) {
  if (!parentId) {
    return request('/organization', {
      method: 'post',
      data: params,
    });
  }
  return request(generatePath('/organization/:id', { id: parentId }), {
    method: 'post',
    data: params,
  });
}

export async function updateOrganization(params, parentId) {
  return request(generatePath('/organization/:id', { id: parentId }), {
    method: 'patch',
    data: params,
  });
}

export async function deleteOrganization(parentId) {
  return request(generatePath('/organization/:id', { id: parentId }), {
    method: 'delete',
  });
}
