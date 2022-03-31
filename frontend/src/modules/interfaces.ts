export interface TokenObject {
  token: string;
  timestamp?: number;
}


export interface User {
  email: string;
  password: string;
}

export interface GalleryData {
  objects: string[];
  page: number;
  total: number;
}











