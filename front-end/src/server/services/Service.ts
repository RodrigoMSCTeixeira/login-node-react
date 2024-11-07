import NodeHttpClientAdapter from "@/utils/adapters/NodeHttpClientAdapter";

export default abstract class Services<T> extends NodeHttpClientAdapter<T> {
  constructor({
    endpoint,
    method,
    body,
    id,
  }: NodeHttpClientAdapter<T>["getData"]) {
    const _data = {
      endpoint,
      method,
      body,
      id,
    };
    super(_data);
  }
}
