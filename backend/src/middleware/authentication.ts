import { Request, Response, NextFunction } from "express";
import {jwtManagement} from "../utils/jwt";

export async function checkAuthorizationHeader (req: Request, res: Response, next: NextFunction) {
  try {
    await jwtManagement.verifyToken(req.headers.authorization || '');
    next ();
  } catch {
    res.sendStatus(403);
  }

}

