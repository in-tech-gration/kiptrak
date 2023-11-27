import { IProgressRow } from "./progress";

export interface Meta {
  timeStamp: Date;
}

export interface ProgressRequest {
  meta: Meta;
  progressRows: IProgressRow[];
}
