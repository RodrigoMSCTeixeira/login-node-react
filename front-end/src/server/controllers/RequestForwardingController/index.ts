import Controller from "../Controller";

export default class RequestForwardingController<T> extends Controller<T> {
  constructor({ endpoint, method, body, id }: Controller<T>["getData"]) {
    super({
      endpoint,
      method,
      body,
      id,
    });
  }
}
