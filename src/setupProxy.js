const proxy = require('http-proxy-middleware');//不用下载

module.exports = function(app) {
  app.use(
    '/ajax', 
    proxy({
      target: 'http://m.maoyan.com',
      changeOrigin: true,
      //pathRewrite:
    })
  );

  app.use(
    '/ajax2',
    proxy({
      target: 'http://m2.maoyan.com',
      changeOrigin: true,
      //pathRewrite:
    })
  );
};


// proxy:{
//     "/api":{
//         target:"",
//         changeOrigin:true
//     }
// }