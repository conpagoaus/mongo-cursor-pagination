import { AggregateOptions, CollationOptions } from 'mongodb';
import { Document } from 'bson';

interface BaseParams {
  limit?: number;
  fields?: object;
  paginatedField?: string;
  sortAscending?: boolean;
  sortCaseInsensitive?: boolean;
  collation?: CollationOptions | null;
  getTotal?: boolean;
  after?: string;
  before?: string;
  hint?: string;
}

type BaseParamsMulti = Omit<
  BaseParams,
  'paginatedField' | 'sortAscending' | 'sortCaseInsensitive'
> & { paginatedFields?: PaginatedField[] };

export interface PaginatedField {
  paginatedField?: string;
  sortAscending?: boolean;
  sortCaseInsensitive?: boolean;
}

interface Query {
  query?: object;
  next?: string | Document;
  previous?: string | Document;
  overrideFields?: any;
}

interface QueryInput {
  query?: object;
  next?: string | Document;
  previous?: string | Document;
  overrideFields?: any;
}

interface Aggregate {
  aggregation?: object[];
  next?: string | Document;
  previous?: string | Document;
  options?: AggregateOptions;
}

interface AggregateInput {
  aggregation?: object[];
  next?: string;
  previous?: string;
  options?: AggregateOptions;
}

export type QueryInputParams = BaseParams & QueryInput;
export type QueryParams = BaseParams & Query;
export type QueryParamsMulti = BaseParamsMulti & Query;
export type QueryInputParamsMulti = BaseParamsMulti & QueryInput;

export type AggregateInputParams = BaseParams & AggregateInput;
export type AggregateParams = BaseParams & Aggregate;

export type AggregateInputParamsMulti = BaseParamsMulti & AggregateInput;
export type AggregateParamsMulti = BaseParamsMulti & Aggregate;

export type SearchParams = {
  query?: object;
  limit?: number;
  fields?: object;
  next?: string | Document;
};
