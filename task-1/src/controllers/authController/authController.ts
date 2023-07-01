import jwt from "jsonwebtoken";
import { JWT } from "./authTypes";
import { User } from "../UserController/userTypes";
import TokenController from "../TokenController/tokenController";
import UserController from "../UserController/userController";
import bcript from "bcrypt";
import { Response } from "express";

interface IAuthController {
  registration(
    userInput: User
  ): Promise<{ tokens: JWT; user: { email: string } }>;
  login(userInput: User): Promise<{ tokens: JWT; user: { email: string } }>;
}

class AuthController implements IAuthController {
  async registration(
    userInput: User
  ): Promise<{ tokens: JWT; user: { email: string } }> {
    const user: User = await UserController.create(userInput);

    const tokens: JWT = TokenController.generate(user);

    TokenController.saveToken(user.id, tokens.refreshToken);
    return {
      tokens,
      user: { email: user.email },
    };
  }
  async login(
    userInput: User
  ): Promise<{ tokens: JWT; user: { email: string } }> {
    const user = await UserController.getOneByEmail(
      userInput.email.toLowerCase()
    );
    if (!user) {
      throw new Error(
        JSON.stringify({
          status: 409,
          messag: `user with email ${userInput.email} dosen't exist`,
        })
      );
    }
    const isPasswordEquals = await bcript.compare(
      userInput.password,
      user.password
    );
    if (!isPasswordEquals) {
      throw new Error(
        JSON.stringify({
          status: 409,
          messag: `user with email ${user.email} alredy exist`,
        })
      );
    }
    const JWT = await TokenController.generate(user);
    return { tokens: JWT, user: { email: user.email } };
  }
  async refresh(refreshToken: string, res: Response) {
    const { email } = TokenController.validate(refreshToken);
    const tokenDB = await TokenController.findToken(refreshToken);
    if (false) {
      res.status(401).json("Unauthorized").end;
      return;
    }
    const user = await UserController.getOneByEmail(email.toLowerCase());
    const JWT = TokenController.generate(user);
    return { tokens: JWT, user: { email: user?.email } };
  }
}

export default new AuthController();
