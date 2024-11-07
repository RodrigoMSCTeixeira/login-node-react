import * as http from "http";
import { Method } from "../types/THttpRequest";

interface IHttpRequest<T> {
  endpoint: string;
  method: Method;
  body?: T;
  headers?: any;
  id?: string;
}

interface IAdapter<T> {
  get getRequest(): Promise<{
    statusCode: number;
    data: T;
  }>;
  get getData(): IHttpRequest<T>;
}

export default abstract class NodeHttpClientAdapter<T> implements IAdapter<T> {
  #_baseUrl = process.env.BASE_URL;
  #_data: IHttpRequest<T>;

  constructor(data: IHttpRequest<T>) {
    this.#_data = data;
  }

  async #request(): Promise<{
    statusCode: number;
    data: T;
  }> {
    return new Promise((resolve, reject) => {
      const parsedUrl = new URL(
        `${this.#_baseUrl}/${this.#_data.endpoint}${
          this.#_data.id ? `/${this.#_data.id}` : ""
        }`
      );

      const options: http.RequestOptions = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        path: parsedUrl.pathname + parsedUrl.search,
        method: this.#_data.method,
        headers: {
          // "Content-Type": "application/json; charset=UTF-8",
          // "Content-Length": Buffer.byteLength(JSON.stringify(this.#_data.body)),
          ...this.#_data.headers,
        },
      };

      const req = http.request(options, (res) => {
        let responseData = "";
        res.on("data", (chunk) => {
          responseData += chunk;
        });

        res.on("end", () => {
          try {
            const json = JSON.parse(responseData);

            resolve({
              statusCode: res.statusCode ?? 200,
              data: json,
            });
          } catch (error: any) {
            reject(new Error(`Failed to parse response: ${error.message}`));
          }
        });
      });

      req.on("error", (error) => {
        reject(new Error(`Failed to parse response: ${error.message}`));
      });

      req.on("timeout", () => {
        req.destroy();
        reject(new Error("Request timeout"));
      });

      req.setTimeout(5000);

      if (this.#_data.body) {
        req.write(JSON.stringify(this.#_data.body));
      }

      req.end();
    });
  }

  get getRequest(): Promise<{ statusCode: number; data: T }> {
    return this.#request();
  }

  get getData() {
    return this.#_data;
  }
}
