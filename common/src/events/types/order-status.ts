export enum OrderStatus {
  // Quando o pedido foi criado, mas o ingresso que está tentando reservar ainda não foi reservado
  Created = "created",

  // O ingresso que o pedido está tentando reservar já foi reservado, ou quando o usuário cancelou o pedido, ou o pedido expira antes do pagamento
  Cancelled = "cancelled",

  // O pedido reservou com sucesso o ingresso
  AwaitingPayment = "awaiting:payment",

  // O pedido reservou com sucesso o ingresso e o usuário forneceu o pagamento com sucesso
  Complete = "complete",
}
