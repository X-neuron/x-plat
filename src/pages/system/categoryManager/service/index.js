import { generatePath } from 'react-router';
import request from '@/utils/request';

// 暂不支持分页，貌似非大企，一般模块也就十多个。
export async function getCategoriesByParentId(parentId) {
  if (parentId === 'root') {
    return request('/category', {
      method: 'get',
    });
  }
  return request(generatePath('/category/:id', { id: parentId }), {
    method: 'get',
  });
}

export async function getCategories() {
  return request('/category/all', {
    method: 'get',
    params: {
      name: 'root',
    },
  });
}

export async function createCategory(params, parentId) {
  if (!parentId) {
    return request('/category', {
      method: 'post',
      data: params,
    });
  }
  return request(generatePath('/category/:id', { id: parentId }), {
    method: 'post',
    data: params,
  });
}

export async function updateCategory(params, parentId) {
  return request(generatePath('/category/:id', { id: parentId }), {
    method: 'patch',
    data: params,
  });
}

export async function deleteCategory(parentId) {
  return request(generatePath('/category/:id', { id: parentId }), {
    method: 'delete',
  });
}
