import ElastalertServer from './elastalert_server';

if (process.env.BITSENSOR_SENTRY_ENABLED !== 'false') {
  var Raven = require('raven');
  Raven.config('http://527ee316013644b387a47f713335b085:67f9631c6e1043e3abe43c72364f4d1b@dev.bitsensor.xyz:9000/5').install();

  Raven.context(function () {
    let server = new ElastalertServer();
    server.start();
  });
} else {
  let server = new ElastalertServer();
  server.start();
}
