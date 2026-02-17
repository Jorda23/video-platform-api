import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const signUp = async (name: string, email: string, password: string) => {
  const exists = await User.findOne({ where: { email } });
  if (exists) throw new Error("Email already exists");

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashed } as any);

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret");

  return { token };
};

export const signIn = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret");

  return { token };
};
