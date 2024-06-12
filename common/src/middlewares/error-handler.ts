import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    // No caso de você estar se perguntando por que essa verificação de instância está funcionando mesmo havendo quatro classes diferentes de erro que podem ser enviadas, é porque a classe abstrata CustomError é uma superclasse dessas quatro classes
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.error(err);
  res.status(400).send({
    errors: [{ message: "Algo deu errado!" }],
  });
};
