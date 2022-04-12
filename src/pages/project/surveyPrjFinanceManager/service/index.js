import request from '@/utils/request';

export async function getSurveyPrjFinances(params) {
  return request('/surveyPrjFinances', {
    method: 'get',
    params: {
      ...params,
      page: params.current,
      take: params.pageSize,
    },
  });
}

export async function createSurveyPrjFinances(params) {
  return request('/surveyPrjFinances', {
    method: 'post',
    data: params,
  });
}
