import RequestForwardingService from "../services/RequestForwardingService";

export default class Controller<T> extends RequestForwardingService<T> {
  constructor({
    endpoint,
    method,
    body,
    id,
  }: RequestForwardingService<T>["getData"]) {
    super({
      endpoint,
      method,
      body,
      id,
    });
  }
}
