const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://123.56.149.216:8080",
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
};
