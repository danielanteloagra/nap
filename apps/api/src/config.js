module.exports = {
  name: 'NapApi',
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  urls: {
    imageBase: '//cache.net-a-porter.com/images',
  },
  pagination: {
    defaultLimit: 60,
    defaultOffset: 0,
    defaultSort: 'popular',
  },
};
