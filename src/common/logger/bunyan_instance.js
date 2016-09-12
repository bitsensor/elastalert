import bunyan from 'bunyan';

let logger = bunyan.createLogger({
  name: 'elastalert-server'
});

export default logger;
