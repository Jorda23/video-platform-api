import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const signUp = async (req: Request, res: Response) => {
  try {
    const result = await authService.signUp(
      req.body.name,
      req.body.email,
      req.body.password
    );
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const result = await authService.signIn(
      req.body.email,
      req.body.password
    );
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
