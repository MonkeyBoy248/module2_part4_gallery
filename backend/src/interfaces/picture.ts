import {Stats} from "fs";

export interface Picture {
  id: string,
  path: string,
  metadata: Stats,
}