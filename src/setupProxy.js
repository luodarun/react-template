const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/schoolServer/',
    proxy({
      target: 'http://localhost:8090/schoolServer',
      changeOrigin: true,
      pathRewrite: { '^/schoolServer': '' },
    }),
  );
};
