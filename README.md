# Jitterbit Order API

API REST desenvolvida em **Node.js** para gerenciamento de pedidos, criada como parte de um teste técnico.

A aplicação permite criar, consultar, listar, atualizar e remover pedidos, com persistência em **MongoDB**.

---

# Tecnologias utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Nodemon
- Dotenv

---

# Estrutura do projeto

```
src
│
├── config
│   └── db.js
│
├── controllers
│   └── orderController.js
│
├── models
│   └── Order.js
│
├── routes
│   └── orderRoutes.js
│
├── utils
│   └── orderMapper.js
│
├── app.js
└── server.js
```

---

# Como executar o projeto

## 1. Clonar o repositório

```bash
git clone https://github.com/mpauloalves/jitterbit-order-api.git
```

## 2. Entrar na pasta do projeto

```bash
cd jitterbit-order-api
```

## 3. Instalar dependências

```bash
npm install
```

## 4. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/jitterbit_orders
```

## 5. Executar a aplicação

```bash
npm run dev
```

Servidor rodando em:

```
http://localhost:3000
```

---

# Endpoints da API

## Criar pedido

POST

```
/order
```

### Body

```json
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

---

## Buscar pedido por ID

GET

```
/order/:id
```

Exemplo:

```
GET /order/v10089015vdb-01
```

---

## Listar pedidos

GET

```
/order/list
```

---

## Atualizar pedido

PUT

```
/order/:id
```

---

## Deletar pedido

DELETE

```
/order/:id
```

---

# Transformação dos dados

A API recebe o seguinte formato:

```json
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000
}
```

E salva no banco no formato:

```json
{
  "orderId": "v10089015vdb-01",
  "value": 10000
}
```

Essa transformação é realizada no arquivo:

```
src/utils/orderMapper.js
```

---

# Autor

Marcos Paulo