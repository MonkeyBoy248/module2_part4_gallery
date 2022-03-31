import {Stats} from "fs";

export interface Image {
  id: number,
  path: string,
  metadata: Stats,
}