export interface ResponseData<T = any> {
  status: boolean;
  message?: string;
  data?: T;
  total?: number;
}
