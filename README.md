<p align="center">
  <h1 align="center"> E-Commerce-Microservices
</h1>

  <p align="center">
    Um aplicativo da web de comércio eletrônico construído com arquitetura de microsserviços
    <br />
    <a href="https://solar-trinity-746574.postman.co/workspace/1e544daf-616d-44b7-89a7-3723dd265101/documentation/30032953-ea5ec677-587b-447d-91fe-574d6d7f1014"><strong>Explore a documentação da API no postman »</strong></a>
    <br />
    <br />
  </p>
</p>

<details open="open">
  <summary>Sumário</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o Projeto</a>
      <ul>
        <li><a href="#construído-com">Construído Com</a></li>
      </ul>
    </li>
    <li>
      <a href="#começando">Começando</a>
      <ul>
        <li><a href="#pré-requisitos">Pré-requisitos</a></li>
        <li><a href="#instalação">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contato">Contato</a></li>
  </ol>
</details>

## Sobre o Projeto

![Show Split em ação](https://i.imgur.com/O5D42qr.gif)



Aqui está o que eu aprendi:
* Backend Express com Typescript e dois bancos de dados diferentes (MongoDB, Redis)
* Frontend Next.js (React) para Renderização do Lado do Servidor
* Compartilhamento de eventos entre os serviços usando NATS-streaming
* Execução do aplicativo em contêineres Docker via cluster Kubernetes

Este projeto de forma alguma está finalizado e adicionarei mais recursos e ferramentas conforme aprender novas linguagens, frameworks e bancos de dados. Leia o roadmap abaixo para saber o que pretendo implementar a seguir.

### Construído Com

* [Typescript](https://www.typescriptlang.org/)
* [Next.js](https://nextjs.org/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Redis](https://redis.io/)
* [Docker](https://www.docker.com/)
* [Kubernetes](https://kubernetes.io/)
* [Skaffold](https://skaffold.dev/)
* [NATS Streaming](https://nats.io/)
* [Stripe](https://stripe.com/en-in)

## Começando

### Pré-requisitos

Você precisará do Docker, Kubernetes, Skaffold e ingress-nginx instalados para executar o projeto. Além disso, Node.js precisa estar instalado localmente para executar os testes.

### Instalação

1. Obtenha uma chave de API em [Stripe](https://stripe.com/en-in)
2. Clone o repositório
   ```sh
   git clone (https://github.com/thiagogilcamargo/E-Commerce-Microservices)

3. Crie uma organização no NPM e publique a pasta common como um pacote npm e substitua "@showsplit/common" por todo o projeto com o nome do seu pacote. Caso contrário, quaisquer alterações feitas na pasta common (você precisará enviar as alterações para o NPM) não aparecerão nos outros serviços, pois todos os serviços dependem de "@showsplit/common" para código compartilhado neste repositório.
4. Execute o comando abaixo para definir as variáveis de ambiente
   ```sh
   kubectl create secret generic jwt-secret --from-literal JWT_KEY=<secret code>
   kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=<secret code>
   ```
5. Vá para cada pasta contendo o Dockerfile (eles são seus serviços), construa e envie-os para o Docker.
   ```sh
   docker build -t <docker username>/<folder name>
   docker push <docker username>/<folder name>
   ```
6. Substitua os nomes das imagens em todos os arquivos yaml (arquivo skaffold e os arquivos dentro da pasta infra) pelos seus nomes de imagem.
7.Execute este comando no diretório raiz para iniciar o projeto
   ```sh
   skaffold dev
   ```

## Roadmap

- [x] Auth, Tickets, Orders, Payment service com MongoDB
- [x] Serviço de expiração com Redis
- [x] SSR com Next.js
- [x]  Documentação da API com Postman
- [ ] Atualização do frontend Next.js com getServerSideProps
- [ ] Mais documentação com TSdoc
- [ ] Migrar para JetStream
- [ ] Serviços com Go e PostgreSQL

## Contact

Thiago Gil Camargo - Thiagogilcmargo@gmail.com
