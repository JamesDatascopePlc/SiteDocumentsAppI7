import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { mapValues, memoize, omitBy } from "lodash-es";
import { Observable } from "rxjs";

export type AspNetData<T> = {
  [name in keyof T]: T[name] extends Date | undefined | null 
    ? string 
    : T[name] 
}

export interface GetRequestOptions<TParams> {
  path: string,
  query?: (params: TParams) => object,
  headers?: (params: TParams) => object
}

export interface PostRequestOptions<TParams> {
  path: string,
  body?: (params: TParams) => object,
  headers?: (params: TParams) => object
}

export interface BuildApi {
  get: <TResponse, TParams = object | void>(getOptions: string | GetRequestOptions<TParams>) => (params: TParams) => Observable<TResponse>
  post: <TResponse, TParams = object | void>(postOptions: PostRequestOptions<TParams>) => (params: TParams) => Observable<TResponse>
}

export interface CreateApiOptions<TApi> {
  baseUrl: string,
  headers?: object,
  endpoints: (build: BuildApi) => TApi
}

export type Params = {
  [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>
}

export function createBuildApi<TApi>(options: CreateApiOptions<TApi>): BuildApi {
  const http = inject(HttpClient);

  return {
    get: <TResponse, TParams = object | void>(getOptions: string | GetRequestOptions<TParams>) => 
      typeof getOptions === "string" 
        ? () => http.get<TResponse>(`${options.baseUrl}/${getOptions}`)
        : (params: TParams) => http.get<TResponse>(`${options.baseUrl}/${getOptions.path}`, {
            headers: getOptions.headers != null 
              ? mapValues(omitBy(getOptions.headers(params) as Params, val => val == null), val => val.toString()) 
              : {},
            params: getOptions.query != null 
              ? getOptions.query(params) as Params
              : params != null
              ? omitBy(params, val => val == null) as Params
              : {}
        }),
    post: <TResponse, TParams = object | void>(postOptions: PostRequestOptions<TParams>) =>
      (params: TParams) => http.post<TResponse>(`${options.baseUrl}/${postOptions.path}`, {}, {})
  }
}

export function createApi<TApi>(options: CreateApiOptions<TApi>) {
  return memoize(() => {
    const build = createBuildApi(options);

    return options.endpoints(build);
  });
}