import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // Estamos no servidor
    // Mencionamos o cabeçalho Host porque no ingress-srv mencionamos o nome do host e essa chamada de API precisa informar ao servidor para qual host deseja ir.
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // Estamos no cliente
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
