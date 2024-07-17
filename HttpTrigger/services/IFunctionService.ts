import { QueryPayload } from "../models/QueryPayload";

export interface IFunctionService<T> {
    processMessageAsync(data: QueryPayload ): Promise<T>
  }