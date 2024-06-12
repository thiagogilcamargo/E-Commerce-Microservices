import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  // Aqui estamos modificando uma definição de tipo existente. Em vez de estender, podemos escrever o nome da mesma interface e adicionar novas propriedades
  namespace Express {
    interface Request {
      currentUser?: UserPayload; // Adicionamos o ?. porque essa propriedade nem sempre é obrigatória, pois um usuário nem sempre precisa estar logado para visitar algumas rotas
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload; // Esse ! diz ao TS para não se preocupar com o valor dessa variável, pois foi verificado em outro lugar
    req.currentUser = payload;
  } catch (error) {}

  next();
};
