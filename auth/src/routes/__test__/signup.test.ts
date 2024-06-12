import request from "supertest";
import { app } from "../../app";

it("retorna 201 ao se inscrever com sucesso", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("retorna 400 com um email inválido", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "testtest.com",
      password: "password",
    })
    .expect(400);
});

it("retorna 400 com uma senha inválida", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "p",
    })
    .expect(400);
});

it("retorna 400 com um email e senha faltantes", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "",
      password: "password",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "testtest.com",
      password: "",
    })
    .expect(400);
});

it("impede emails duplicados", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("define um cookie após se inscrever com sucesso", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
