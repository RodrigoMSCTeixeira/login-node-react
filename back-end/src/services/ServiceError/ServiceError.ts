import ServiceErroModel from '../../models/ServiceErrorModel';

export default class ServiceError extends Error {
  statusCode = 0;

  constructor({ message, statusCode }: ServiceErroModel['params']) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
