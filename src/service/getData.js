import http from '@/utils/http';

export async function getCity(opt) {
    console.log(22);
    return http.get(`/v1/cities?type=${opt}`)
      .then(({ status, data }) => ({ status, data }))
      .catch(({ response }) => ({ status: response.status, data: response.data }));
  }