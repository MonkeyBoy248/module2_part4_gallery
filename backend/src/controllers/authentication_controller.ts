import * as express from 'express';
import {Request, Response} from "express";
import { Controller } from "../interfaces/controller";
import { User } from '../interfaces/user';
import {AuthenticationErrorMessage, TokenObject} from "../interfaces/token_object";
import {jwtManagement} from "../utils/jwt";
import {userModel} from "../db/models/user_model";

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

  private isThisCorrectUser = async (user: User): Promise<boolean> => {
    const authorizedUser = await userModel.findOne({email: user.email});

    if (!authorizedUser) {
      return false;
    }

    return authorizedUser.password === user.password;
  }

  private sendAuthenticationResponse = async (req: Request, res: Response) => {
    if (!await this.isThisCorrectUser(req.body)) {
      res.status(401).json(this.authenticationError)
      return;
    }

    const token = await jwtManagement.createToken(req.body.email);
    const tokenObject: TokenObject = {token};

    res.status(200).json(tokenObject);
  }
}