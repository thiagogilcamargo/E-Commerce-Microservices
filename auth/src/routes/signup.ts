import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@showsplit/common";

import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("O e-mail deve ser válido!"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("A senha deve ter entre 4 e 20 caracteres."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("E-mail em uso.");
    }

    const user = User.build({ email, password });
    await user.save();

    // Gerar JWT
    const userJWT = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_KEY! // O ! informa ao TypeScript para não se preocupar com o valor dessa variável, pois foi verificado em outro lugar
    );

    // Armazenar JWT
    req.session = {
      jwt: userJWT,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
