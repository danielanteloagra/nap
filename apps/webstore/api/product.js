import xhr from 'axios';
import xhrConfig from '@config/xhr';

export const endpoint = '/products';

export const listing = (payload) => {
  const conf = { ...xhrConfig, params: payload };
  return xhr
    .get(endpoint, conf)
    .then(response => response.data);
};

export const product = (id) => {
  const url = `${endpoint}/${id}`;
  return xhr
    .get(url, xhrConfig)
    .then(response => response.data);
};
