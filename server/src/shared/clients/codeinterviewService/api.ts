/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateInterviewDto {
  title: string;
  authorId: string;
  intervieweeName: string;
  language: CreateInterviewDtoLanguageEnum;
  status: CreateInterviewDtoStatusEnum;
  code?: string;
}

export interface InterviewDto {
  /** ID интервью */
  id: string;
  /** Название */
  title: string;
  /** ID автора */
  authorId: string;
  /** Имя интервьюируемого */
  intervieweeName: string;
  /** Код */
  code: string | null;
  /** Язык программирования */
  language: InterviewDtoLanguageEnum;
  /** Статус интервью */
  status: InterviewDtoStatusEnum;
  /** Дата создания */
  created: string;
  /** Дата обновления */
  updated: string;
}

export interface PaginationResponseDto {
  total: number;
}

export interface UpdateInterviewDto {
  title?: string;
  authorId?: string;
  intervieweeName?: string;
  language?: UpdateInterviewDtoLanguageEnum;
  status?: UpdateInterviewDtoStatusEnum;
  code?: string;
}

export interface CreateRatingDto {
  authorId: string;
  type: CreateRatingDtoTypeEnum;
  rate: number;
}

export interface RatingDto {
  /** ID рейтинга */
  id: string;
  /** ID автора */
  authorId: string;
  /** ID интервью */
  interviewId: string;
  /** Тип оценки */
  type: RatingDtoTypeEnum;
  /** Оценка */
  rate: number;
  /** Дата создания */
  created: string;
  /** Дата обновления */
  updated: string;
}

export interface UpdateRatingDto {
  authorId?: string;
  rate?: number;
}

export interface DetailsDto {
  algorithms?: number;
  basicKnowledge?: number;
  codeQuality?: number;
  communication?: number;
  decompose?: number;
  design?: number;
  reasoning?: number;
}

export interface RatingAverageDto {
  /** Список ID пользователь, чьи оценки участвовали в расчете */
  authors: string[];
  /** Средняя оценка */
  summary: number;
  /** Средняя оценка по каждому типу */
  details: DetailsDto;
}

export interface CreateCodeTaskDto {
  title: string;
  authorId: string;
  language: CreateCodeTaskDtoLanguageEnum;
  code: string;
  answer?: string;
}

export interface CodeTaskDto {
  /** ID задачи */
  id: string;
  /** ID автора */
  authorId: string;
  /** Название */
  title: string;
  /** Код */
  code: string;
  /** Ответ */
  answer: string | null;
  /** Язык программирования */
  language: CodeTaskDtoLanguageEnum;
  /** Дата создания */
  created: string;
  /** Дата обновления */
  updated: string;
}

export interface UpdateCodeTaskDto {
  title?: string;
  authorId?: string;
  language?: UpdateCodeTaskDtoLanguageEnum;
  code?: string;
  answer?: string;
}

export interface CreateUserDto {
  email: string;
  displayName: string;
  photo?: string;
}

export interface UserDto {
  /** ID пользователя */
  id: string;
  email: string;
  displayName: string;
  photo: string;
  /** Дата создания */
  created: string;
  /** Дата обновления */
  updated: string;
}

export enum CreateInterviewDtoLanguageEnum {
  Javascript = 'javascript',
  Typescript = 'typescript',
  Go = 'go',
  Csharp = 'csharp',
  Python = 'python',
}

export enum CreateInterviewDtoStatusEnum {
  Active = 'active',
  Archived = 'archived',
}

/** Язык программирования */
export enum InterviewDtoLanguageEnum {
  Javascript = 'javascript',
  Typescript = 'typescript',
  Go = 'go',
  Csharp = 'csharp',
  Python = 'python',
}

/** Статус интервью */
export enum InterviewDtoStatusEnum {
  Active = 'active',
  Archived = 'archived',
}

export enum UpdateInterviewDtoLanguageEnum {
  Javascript = 'javascript',
  Typescript = 'typescript',
  Go = 'go',
  Csharp = 'csharp',
  Python = 'python',
}

export enum UpdateInterviewDtoStatusEnum {
  Active = 'active',
  Archived = 'archived',
}

export enum CreateRatingDtoTypeEnum {
  Communication = 'communication',
  BasicKnowledge = 'basicKnowledge',
  Reasoning = 'reasoning',
  Decompose = 'decompose',
  Design = 'design',
  Algorithms = 'algorithms',
  CodeQuality = 'codeQuality',
}

/** Тип оценки */
export enum RatingDtoTypeEnum {
  Communication = 'communication',
  BasicKnowledge = 'basicKnowledge',
  Reasoning = 'reasoning',
  Decompose = 'decompose',
  Design = 'design',
  Algorithms = 'algorithms',
  CodeQuality = 'codeQuality',
}

export enum CreateCodeTaskDtoLanguageEnum {
  Javascript = 'javascript',
  Typescript = 'typescript',
  Go = 'go',
  Csharp = 'csharp',
  Python = 'python',
}

/** Язык программирования */
export enum CodeTaskDtoLanguageEnum {
  Javascript = 'javascript',
  Typescript = 'typescript',
  Go = 'go',
  Csharp = 'csharp',
  Python = 'python',
}

export enum UpdateCodeTaskDtoLanguageEnum {
  Javascript = 'javascript',
  Typescript = 'typescript',
  Go = 'go',
  Csharp = 'csharp',
  Python = 'python',
}

export enum GetInterviewsParamsLanguageEnum {
  Javascript = 'javascript',
  Typescript = 'typescript',
  Go = 'go',
  Csharp = 'csharp',
  Python = 'python',
}

export enum GetInterviewsParamsStatusEnum {
  Active = 'active',
  Archived = 'archived',
}

export enum GetRatingsParamsTypeEnum {
  Communication = 'communication',
  BasicKnowledge = 'basicKnowledge',
  Reasoning = 'reasoning',
  Decompose = 'decompose',
  Design = 'design',
  Algorithms = 'algorithms',
  CodeQuality = 'codeQuality',
}

export enum GetCodeTasksParamsLanguageEnum {
  Javascript = 'javascript',
  Typescript = 'typescript',
  Go = 'go',
  Csharp = 'csharp',
  Python = 'python',
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Code interview service
 * @version 1.0
 * @contact
 *
 * Code interview service API description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  interviews = {
    /**
     * No description
     *
     * @tags interviews
     * @name CreateInterview
     * @summary Создание интервью
     * @request POST:/v1/interviews
     * @response `201` `InterviewDto`
     */
    createInterview: (data: CreateInterviewDto, params: RequestParams = {}) =>
      this.request<InterviewDto, any>({
        path: `/v1/interviews`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags interviews
 * @name GetInterviews
 * @summary Получение списка интервью
 * @request GET:/v1/interviews
 * @response `200` `(PaginationResponseDto & {
    items: (InterviewDto)[],

})`
 * @response `400` `{
  \** @example 400 *\
    statusCode: number,
  \** @example "Bad Request" *\
    message: string,
  \** @example "Bad Request" *\
    error?: string,

}`
 */
    getInterviews: (
      query?: {
        title?: string;
        authorId?: string;
        intervieweeName?: string;
        language?: GetInterviewsParamsLanguageEnum;
        status?: GetInterviewsParamsStatusEnum;
        limit?: number;
        skip?: number;
        order?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PaginationResponseDto & {
          items: InterviewDto[];
        },
        {
          /** @example 400 */
          statusCode: number;
          /** @example "Bad Request" */
          message: string;
          /** @example "Bad Request" */
          error?: string;
        }
      >({
        path: `/v1/interviews`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags interviews
 * @name GetInterview
 * @summary Получение интервью по ID
 * @request GET:/v1/interviews/{interviewId}
 * @response `200` `InterviewDto`
 * @response `404` `{
  \** @example 404 *\
    statusCode: number,
  \** @example "Not Found" *\
    message: string,
  \** @example "Not Found" *\
    error?: string,

}`
 */
    getInterview: (interviewId: string, params: RequestParams = {}) =>
      this.request<
        InterviewDto,
        {
          /** @example 404 */
          statusCode: number;
          /** @example "Not Found" */
          message: string;
          /** @example "Not Found" */
          error?: string;
        }
      >({
        path: `/v1/interviews/${interviewId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags interviews
 * @name UpdateInterview
 * @summary Обновление интервью по ID
 * @request PATCH:/v1/interviews/{interviewId}
 * @response `200` `InterviewDto`
 * @response `404` `{
  \** @example 404 *\
    statusCode: number,
  \** @example "Not Found" *\
    message: string,
  \** @example "Not Found" *\
    error?: string,

}`
 */
    updateInterview: (interviewId: string, data: UpdateInterviewDto, params: RequestParams = {}) =>
      this.request<
        InterviewDto,
        {
          /** @example 404 */
          statusCode: number;
          /** @example "Not Found" */
          message: string;
          /** @example "Not Found" */
          error?: string;
        }
      >({
        path: `/v1/interviews/${interviewId}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags interviews
 * @name RemoveInterview
 * @summary Удаление интервью по ID
 * @request DELETE:/v1/interviews/{interviewId}
 * @response `404` `{
  \** @example 404 *\
    statusCode: number,
  \** @example "Not Found" *\
    message: string,
  \** @example "Not Found" *\
    error?: string,

}`
 */
    removeInterview: (interviewId: string, params: RequestParams = {}) =>
      this.request<
        any,
        {
          /** @example 404 */
          statusCode: number;
          /** @example "Not Found" */
          message: string;
          /** @example "Not Found" */
          error?: string;
        }
      >({
        path: `/v1/interviews/${interviewId}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags interviews
     * @name CreateRating
     * @summary Создание оценки по ID интервью
     * @request POST:/v1/interviews/{interviewId}/ratings
     * @response `200` `RatingDto`
     */
    createRating: (interviewId: string, data: CreateRatingDto, params: RequestParams = {}) =>
      this.request<RatingDto, any>({
        path: `/v1/interviews/${interviewId}/ratings`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags interviews
     * @name GetRatings
     * @summary Получение рейтингов по ID интервью
     * @request GET:/v1/interviews/{interviewId}/ratings
     * @response `200` `(RatingDto)[]`
     */
    getRatings: (
      interviewId: string,
      query?: {
        authorId?: string;
        type?: GetRatingsParamsTypeEnum;
        order?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<RatingDto[], any>({
        path: `/v1/interviews/${interviewId}/ratings`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags interviews
     * @name UpdateRating
     * @summary Обновление оценки по ID интервью и ID оценки
     * @request PATCH:/v1/interviews/{interviewId}/ratings/{ratingId}
     * @response `200` `RatingDto`
     */
    updateRating: (interviewId: string, ratingId: string, data: UpdateRatingDto, params: RequestParams = {}) =>
      this.request<RatingDto, any>({
        path: `/v1/interviews/${interviewId}/ratings/${ratingId}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags interviews
 * @name RemoveRating
 * @summary Удаление оценки по ID интервью и ID оценки
 * @request DELETE:/v1/interviews/{interviewId}/ratings/{ratingId}
 * @response `404` `{
  \** @example 404 *\
    statusCode: number,
  \** @example "Not Found" *\
    message: string,
  \** @example "Not Found" *\
    error?: string,

}`
 */
    removeRating: (interviewId: string, ratingId: string, params: RequestParams = {}) =>
      this.request<
        any,
        {
          /** @example 404 */
          statusCode: number;
          /** @example "Not Found" */
          message: string;
          /** @example "Not Found" */
          error?: string;
        }
      >({
        path: `/v1/interviews/${interviewId}/ratings/${ratingId}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags interviews
     * @name GetRatingAverage
     * @summary Получение среднего рейтинга по ID интервью
     * @request GET:/v1/interviews/{interviewId}/ratings/average
     * @response `200` `RatingAverageDto`
     */
    getRatingAverage: (interviewId: string, params: RequestParams = {}) =>
      this.request<RatingAverageDto, any>({
        path: `/v1/interviews/${interviewId}/ratings/average`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  codeTasks = {
    /**
     * No description
     *
     * @tags codeTasks
     * @name CreateCodeTask
     * @summary Создание задачи
     * @request POST:/v1/codeTasks
     * @response `201` `CodeTaskDto`
     */
    createCodeTask: (data: CreateCodeTaskDto, params: RequestParams = {}) =>
      this.request<CodeTaskDto, any>({
        path: `/v1/codeTasks`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags codeTasks
 * @name GetCodeTasks
 * @summary Получение списка задач
 * @request GET:/v1/codeTasks
 * @response `200` `(PaginationResponseDto & {
    items: (CodeTaskDto)[],

})`
 * @response `400` `{
  \** @example 400 *\
    statusCode: number,
  \** @example "Bad Request" *\
    message: string,
  \** @example "Bad Request" *\
    error?: string,

}`
 */
    getCodeTasks: (
      query?: {
        title?: string;
        authorId?: string;
        language?: GetCodeTasksParamsLanguageEnum;
        answer?: string;
        limit?: number;
        skip?: number;
        order?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PaginationResponseDto & {
          items: CodeTaskDto[];
        },
        {
          /** @example 400 */
          statusCode: number;
          /** @example "Bad Request" */
          message: string;
          /** @example "Bad Request" */
          error?: string;
        }
      >({
        path: `/v1/codeTasks`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags codeTasks
 * @name GetCodeTask
 * @summary Получение задачи по ID
 * @request GET:/v1/codeTasks/{codeTaskId}
 * @response `200` `CodeTaskDto`
 * @response `404` `{
  \** @example 404 *\
    statusCode: number,
  \** @example "Not Found" *\
    message: string,
  \** @example "Not Found" *\
    error?: string,

}`
 */
    getCodeTask: (codeTaskId: string, params: RequestParams = {}) =>
      this.request<
        CodeTaskDto,
        {
          /** @example 404 */
          statusCode: number;
          /** @example "Not Found" */
          message: string;
          /** @example "Not Found" */
          error?: string;
        }
      >({
        path: `/v1/codeTasks/${codeTaskId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags codeTasks
 * @name UpdateCodeTask
 * @summary Обновление задачи по ID
 * @request PATCH:/v1/codeTasks/{codeTaskId}
 * @response `200` `CodeTaskDto`
 * @response `404` `{
  \** @example 404 *\
    statusCode: number,
  \** @example "Not Found" *\
    message: string,
  \** @example "Not Found" *\
    error?: string,

}`
 */
    updateCodeTask: (codeTaskId: string, data: UpdateCodeTaskDto, params: RequestParams = {}) =>
      this.request<
        CodeTaskDto,
        {
          /** @example 404 */
          statusCode: number;
          /** @example "Not Found" */
          message: string;
          /** @example "Not Found" */
          error?: string;
        }
      >({
        path: `/v1/codeTasks/${codeTaskId}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags codeTasks
 * @name RemoveCodeTask
 * @summary Удаление задачи по ID
 * @request DELETE:/v1/codeTasks/{codeTaskId}
 * @response `404` `{
  \** @example 404 *\
    statusCode: number,
  \** @example "Not Found" *\
    message: string,
  \** @example "Not Found" *\
    error?: string,

}`
 */
    removeCodeTask: (codeTaskId: string, params: RequestParams = {}) =>
      this.request<
        any,
        {
          /** @example 404 */
          statusCode: number;
          /** @example "Not Found" */
          message: string;
          /** @example "Not Found" */
          error?: string;
        }
      >({
        path: `/v1/codeTasks/${codeTaskId}`,
        method: 'DELETE',
        ...params,
      }),
  };
  internal = {
    /**
     * No description
     *
     * @name InternalControllerLiveness
     * @request GET:/internal/liveness
     * @response `200` `void`
     */
    internalControllerLiveness: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/internal/liveness`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @name InternalControllerReadiness
     * @request GET:/internal/readiness
     * @response `200` `void`
     */
    internalControllerReadiness: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/internal/readiness`,
        method: 'GET',
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name CreateUser
     * @summary Создание пользователя
     * @request POST:/v1/users
     * @response `200` `UserDto`
     */
    createUser: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<UserDto, any>({
        path: `/v1/users`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags users
 * @name GetUser
 * @summary Получение пользователя по ID
 * @request GET:/v1/users/{id}
 * @response `200` `UserDto`
 * @response `404` `{
  \** @example 404 *\
    statusCode: number,
  \** @example "Not Found" *\
    message: string,
  \** @example "Not Found" *\
    error?: string,

}`
 */
    getUser: (id: string, params: RequestParams = {}) =>
      this.request<
        UserDto,
        {
          /** @example 404 */
          statusCode: number;
          /** @example "Not Found" */
          message: string;
          /** @example "Not Found" */
          error?: string;
        }
      >({
        path: `/v1/users/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
 * No description
 *
 * @tags users
 * @name GetUserByEmail
 * @summary Получение пользователя по Email
 * @request GET:/v1/users/email/{email}
 * @response `200` `UserDto`
 * @response `404` `{
  \** @example 404 *\
    statusCode: number,
  \** @example "Not Found" *\
    message: string,
  \** @example "Not Found" *\
    error?: string,

}`
 */
    getUserByEmail: (email: string, params: RequestParams = {}) =>
      this.request<
        UserDto,
        {
          /** @example 404 */
          statusCode: number;
          /** @example "Not Found" */
          message: string;
          /** @example "Not Found" */
          error?: string;
        }
      >({
        path: `/v1/users/email/${email}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
}
