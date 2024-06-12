import request from "supertest";
import { app } from "../../app";

it("falha quando um email que não existe é fornecido", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("falha quando uma senha incorreta é fornecida", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password2",
    })
    .expect(400);
});

it("responde com um cookie quando são fornecidas credenciais válidas", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});

it("retorna 400 com um email inválido", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "testtest.com",
      password: "password",
    })
    .expect(400);
});

it("retorna 400 com uma senha vazia", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "",
    })
    .expect(400);
});
