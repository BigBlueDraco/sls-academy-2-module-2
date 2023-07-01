import jwt from "jsonwebtoken";
import pool from "../../db/db";
import { number } from "joi";
import { config } from "dotenv";
config();

interface ITokenController {
  generate(payload: any): JWT;
  validate(token: string): { email: string };
  refresh(token: string): Promise<any>;
  findToken(token: string): Promise<any>;
}

interface JWT {
  accessToken: string;
  refreshToken: string;
}
class TokenController implements ITokenController {
  generate(payload: any): JWT {
    const accessToken = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
      expiresIn: "60s",
    });
    const refreshToken = jwt.sign(payload, `${process.env.JWT_SECRET}`);

    return { accessToken, refreshToken };
  }
  validate(token: string): { email: string } {
    const userData: any = jwt.verify(token, `${process.env.JWT_SECRET}`);
    return { email: userData.email };
  }
  async refresh(token: string): Promise<any> {
    const userData: any = jwt.verify(token, `${process.env.JWT_SECRET}`);
    return { email: userData.email };
  }
  async findToken(token: string) {
    const tokenData = await pool.query(
      "SELECT * FROM tokens where refreshtoken = $1",
      [token]
    );
    return tokenData.rows[0];
  }

  async saveToken(userId: string | number, refreshToken: string) {
    const tokenData = await pool.query(
      "SELECT * FROM tokens where user_id = $1",
      [userId]
    );
    if (tokenData.rows.length) {
      const updateRefreshToken = await pool.query(
        "UPDATE tokens SET refreshtoken = $1 WHERE user_id = $2",
        [refreshToken, userId]
      );
      return updateRefreshToken.rows[0];
    }
    const token = await pool.query(
      "INSERT INTO tokens (user_id, refreshToken) VALUES ($1, $2) RETURNING *",
      [userId, refreshToken]
    );
    return token.rows[0];
  }
}

export default new TokenController();
