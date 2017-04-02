// @TODO make these urls configurable/injectable per environment
// api:3000 is the docker linked container and will only work server side
function getBaseUrl() {
  if (typeof window !== 'undefined' && window.document) {
    return 'http://localhost:3000/api';
  }

  // return 'http://localhost:3000/api'; // uncomment this if not using docker
  return 'http://api:3000/api';
}

export default {
  baseURL: getBaseUrl(),
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
};
