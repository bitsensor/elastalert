import bunyan from './bunyan_instance';

export default class Logger {
  constructor (serviceName) {
    this.serviceName = serviceName;
  }

  info (...messages) {
    bunyan.info(this.serviceName + ': ', ...messages);
  }

  warn (...messages) {
    bunyan.warn(this.serviceName + ': ', ...messages);
  }

  error (...messages) {
    bunyan.error(this.serviceName + ': ', ...messages);
  }

  debug (...messages) {
    bunyan.debug(this.serviceName + ': ', ...messages);
  }
}
