import WebSocket from 'ws';

export var wss = null;

export function listen(port) {
  wss = new WebSocket.Server({ port, path: '/test' });

  wss.on('connection', ws => {
    ws.isAlive = true;
    ws.on('pong', () => {
      ws.isAlive = true;
    });
  });

  return wss;
}

// Keepalive in case clients lose connection during a long rule test.
// If client doesn't respond in 10s this will close the socket and 
// therefore stop the elastalert test from continuing to run detached.
setInterval(() => {
  wss.clients.forEach(ws => {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping(() => {});
  });
}, 10000);
