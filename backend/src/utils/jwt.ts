import jwt from "jsonwebtoken";

class Token {
  private readonly secretKey = process.env.SECRET_KEY || "token";

  createToken = async (data: string) => {
    return jwt.sign({ email: data}, this.secretKey);
  }

  verifyToken = async (token: string) => {
    return jwt.verify(token || '', this.secretKey)
  }
}

export const jwtManagement = new Token();