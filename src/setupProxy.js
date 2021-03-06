const proxy = require('http-proxy-middleware');

// module.exports = app => {
//   app.use(proxy('/auth', {target: 'http//localhost:4000'}));
//   app.use(proxy('/api', {target: 'http://localhost:4000'}));
// };


module.exports = function(app) {
  app.use(
    proxy(["/auth", "/api"], {
      target: "http://localhost:4000/"
    },
    //STRIPE
    app.use('stripe', proxy({target: 'http://localhost:4000'})))
  );
};