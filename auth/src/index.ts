import { app } from "./app";
import mongoose from "mongoose";

import { DatabaseConnectionError } from "@showsplit/common";

const start = async () => {
  console.log("Iniciando...");

  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY deve ser definido");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI deve ser definido");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Conectado ao MongoDB.");
  } catch (err) {
    throw new DatabaseConnectionError();
  }
  app.listen(3000, () => {
    console.log("Ouvindo na porta 3000");
  });
};

start();
