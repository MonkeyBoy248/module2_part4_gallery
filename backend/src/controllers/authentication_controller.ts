import * as express from 'express';
import {Request, Response} from "express";
import { Controller } from "../interfaces/controller";
import { authorized_users } from "../authorized_users_list";
import { User } from '../interfaces/user';
import {AuthenticationErrorMessage, TokenObject} from "../interfaces/token_object";
import {jwtManagement} from "../utils/jwt";

export class AuthenticationController implements Controller {
  public path = '/authentication';
  private authenticationError: AuthenticationErrorMessage = {errorMessage: 'forbidden'};
  public router = express.Router();

  constructor() {
    this.setRoute();
  }

  public setRoute () {
    return this.router.post(this.path, this.sendAuthenticationResponse);
  }

  private isThisCorrectUser = (user: User): boolean => {
    if (!authorized_users[user.email]) {
      return false;
    }

    return authorized_users[user.email] === user.password;
  }

  private sendAuthenticationResponse = async (req: Request, res: Response) => {
    if (!this.isThisCorrectUser(req.body)) {
      res.status(401).json(this.authenticationError)
      return;
    }

    const token = await jwtManagement.createToken(req.body.email);
    const tokenObject: TokenObject = {token};

    res.status(200).json(tokenObject);
  }
}