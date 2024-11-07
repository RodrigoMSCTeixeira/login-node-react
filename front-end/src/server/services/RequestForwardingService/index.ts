import Services from "../Service";

export default class RequestForwardingService<T> extends Services<T> {
  constructor({ endpoint, method, body, id }: Services<T>["getData"]) {
    super({
      endpoint,
      method,
      body,
      id,
    });
  }
}
