import ElastalertServer from './elastalert_server';

if (process.env.SENTRY_DSN !== undefined) {
  var Raven = require('raven');
  Raven.config(process.env.SENTRY_DSN, {
    captureUnhandledRejections: true
  }).install();
  console.log('Sentry logging enabled for Elastalert');

  Raven.context(function() {
    let server = new ElastalertServer();
    server.start();
  });
} else {
  let server = new ElastalertServer();
  server.start();
}
