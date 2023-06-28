import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Params } from "@angular/router";
import { omitBy } from "lodash-es";
import { Observable } from "rxjs";

export interface Request<TParams> {
  path: string,
  params?: (params: TParams) => object,
  headers?: (params: TParams) => object
}

@Injectable({ providedIn: "root" })
export class Api {
  httpClient = inject(HttpClient);
  baseUrl: string = "";

  get<R>(path: string): Func<Observable<R>>
  get<R, T>(opts: Request<T>): Func<Observable<R>, T>
  get<R, T>(opts: string | Request<T>): Func<Observable<R>> | Func<Observable<R>, T> {
    return typeof opts === "string"
      ? () => this.httpClient.get<R>(`${this.baseUrl}/${opts}`)
      : (params: T) => this.httpClient.get<R>(`${this.baseUrl}/${opts.path}`, {
        params: opts.params != null
          ? opts.params(params) as Params
          : params != null
          ? omitBy(params, val => val == null) as Params
          : {}
      });
  }

  post<R>(path: string): Func<Observable<R>>
  post<R, T>(opts: Request<T>): Func<Observable<R>, T>
  post<R, T>(opts: string | Request<T>): Func<Observable<R>> | Func<Observable<R>, T> {
    return typeof opts === "string"
      ? () => this.httpClient.post<R>(`${this.baseUrl}/${opts}`, {})
      : (params: T) => this.httpClient.post<R>(`${this.baseUrl}/${opts.path}`, 
        opts.params != null
          ? opts.params(params) as Params
          : params != null
          ? omitBy(params, val => val == null) as Params
          : {}
      )
  }
}

export function useApi(baseUrl: string) {
  const api = inject(Api);

  api.baseUrl = baseUrl;
  return api;
}