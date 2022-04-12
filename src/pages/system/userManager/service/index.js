import request from '@/utils/request';
import { generatePath } from 'react-router';

export async function getAccounts(params) {
  return request('/user', {
    method: 'get',
    params: {
      page: params.current,
      take: params.pageSize,
    },
  });
}

export async function updateAccountMess(id, params) {
  return request(generatePath('/user/:id', { id }), {
    method: 'patch',
    data: params,
  });
}
