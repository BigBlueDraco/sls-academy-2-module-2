import bcript from "bcrypt";

import pool from "../../db/db";

interface IUserController {
  getOneByEmail(email: any): Promise<User | null>;
  create(UserInput: User): Promise<User>;
}
interface User {
  id: number | string;
  email: string;
  password: string;
}

class UserController implements IUserController {
  async create(UserInput: User): Promise<User> {
    const existUser = await this.getOneByEmail(UserInput.email.toLowerCase());
    if (existUser) {
      throw new Error("User with email alredy exist");
    }
    const hashPassword = await bcript.hash(UserInput.password, 5);
    const user: User | any = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [UserInput.email.toLowerCase(), hashPassword]
    );
    return {
      id: user.rows[0].id,
      email: user.rows[0].email,
      password: user.rows[0].password,
    };
  }
  async getOneByEmail(email: any): Promise<User | null> {
    const user = await pool.query("SELECT * FROM users where email = $1", [
      email,
    ]);
    console.log(user.rows);
    return user.rows.length
      ? {
          id: user.rows[0].id,
          email: user.rows[0].email,
          password: user.rows[0].password,
        }
      : null;
  }
}

export default new UserController();
