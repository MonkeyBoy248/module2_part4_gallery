import {Stats} from "fs";

export interface Picture {
  id: number,
  path: string,
  metadata: Stats,
}