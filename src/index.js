import ElastalertServer from './elastalert_server';

function startServer(server) {
  server.start();
}

let server = new ElastalertServer();
startServer(server);
