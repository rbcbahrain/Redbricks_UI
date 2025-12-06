const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://localhost:44372',
      changeOrigin: true,
      secure: false, // needed if your backend uses self-signed SSL certificates
    })
  );
};
