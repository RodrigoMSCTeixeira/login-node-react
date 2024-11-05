import { Request, Response } from 'express';
import { ParsedQs } from 'qs';
import { ParamsDictionary } from 'express-serve-static-core';

interface EventoParams extends ParamsDictionary {}

interface EventoQuery extends ParsedQs {
  id?: string;
}

interface RequestBody {
  [key: string]: any;
}

interface ResponseBody<T> {
  status: string;
  dataHoraConsulta?: string;
  dataHoraAlteracao?: string;
  data?: T | T[] | void;
  message?: string;
}

export default abstract class ExpressRequestModel<
  T extends RequestBody = RequestBody
> {
  #_request: Request<EventoParams, any, T, EventoQuery, Record<string, any>>;
  #_response: Response<ResponseBody<T> | undefined, Record<string, any>>;

  constructor(
    request: Request<EventoParams, any, T, EventoQuery, Record<string, any>>,
    response: Response<ResponseBody<T> | undefined, Record<string, any>>
  ) {
    this.#_request = request;
    this.#_response = response;
  }

  get request(): Request<
    EventoParams,
    any,
    T,
    EventoQuery,
    Record<string, any>
  > {
    return this.#_request;
  }

  get response(): Response<ResponseBody<T> | undefined, Record<string, any>> {
    return this.#_response;
  }
}
