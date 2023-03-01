export interface IPagination<T> {
  statusCode: string;

  data: T[];

  count: number;

  currentPage: number;

  nextPage: number;

  prevPage: number;

  lastPage: number;
}

export interface IPaginationInput {
  take: number;
  page: number;
}
