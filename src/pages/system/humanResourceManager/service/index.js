import { generatePath } from 'react-router';
import request from '@/utils/request';

export async function getHumanResources(params) {
  return request('/humanResources', {
    method: 'get',
    params: {
      ...params,
      page: params.current,
      take: params.pageSize,
    },
  });
}

export async function createHumanResources(params) {
  return request('/humanResources', {
    method: 'post',
    data: params,
  });
}

export async function updateHumanResources(params, id) {
  return request(generatePath('/humanResources/:id', { id }), {
    method: 'patch',
    data: params,
  });
}

export async function deleteHumanResources(id) {
  return request(generatePath('/humanResources/:id', { id }), {
    method: 'delete',
  });
}
