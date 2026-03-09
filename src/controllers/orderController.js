const Order = require('../models/Order');
const { mapOrderPayload } = require('../utils/orderMapper');

function validateIncomingOrder(payload) {
  if (!payload || typeof payload !== 'object') {
    return 'Body da requisição inválido.';
  }

  const { numeroPedido, valorTotal, dataCriacao, items } = payload;

  if (!numeroPedido || typeof numeroPedido !== 'string') {
    return 'O campo numeroPedido é obrigatório e deve ser uma string.';
  }

  if (typeof valorTotal !== 'number' || valorTotal < 0) {
    return 'O campo valorTotal é obrigatório e deve ser um número maior ou igual a zero.';
  }

  if (!dataCriacao || Number.isNaN(new Date(dataCriacao).getTime())) {
    return 'O campo dataCriacao é obrigatório e deve ser uma data válida.';
  }

  if (!Array.isArray(items) || items.length === 0) {
    return 'O campo items deve ser um array com pelo menos um item.';
  }

  for (const item of items) {
    if (!item.idItem) {
      return 'Cada item deve possuir o campo idItem.';
    }

    if (typeof item.quantidadeItem !== 'number' || item.quantidadeItem <= 0) {
      return 'Cada item deve possuir quantidadeItem maior que zero.';
    }

    if (typeof item.valorItem !== 'number' || item.valorItem < 0) {
      return 'Cada item deve possuir valorItem maior ou igual a zero.';
    }
  }

  return null;
}

async function createOrder(req, res) {
  try {
    const validationError = validateIncomingOrder(req.body);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const mappedOrder = mapOrderPayload(req.body);

    const existingOrder = await Order.findOne({ orderId: mappedOrder.orderId });
    if (existingOrder) {
      return res.status(409).json({
        message: 'Já existe um pedido com esse orderId.'
      });
    }

    const createdOrder = await Order.create(mappedOrder);

    return res.status(201).json({
      message: 'Pedido criado com sucesso.',
      data: createdOrder
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro interno ao criar o pedido.',
      error: error.message
    });
  }
}

async function getOrderById(req, res) {
  try {
    const { id } = req.params;

    const order = await Order.findOne({ orderId: id });

    if (!order) {
      return res.status(404).json({
        message: 'Pedido não encontrado.'
      });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro interno ao buscar o pedido.',
      error: error.message
    });
  }
}

async function listOrders(req, res) {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    return res.status(200).json({
      total: orders.length,
      data: orders
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro interno ao listar os pedidos.',
      error: error.message
    });
  }
}

async function updateOrder(req, res) {
  try {
    const { id } = req.params;
    const validationError = validateIncomingOrder(req.body);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const mappedOrder = mapOrderPayload(req.body);

    if (mappedOrder.orderId !== id) {
      mappedOrder.orderId = id;
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: id },
      mappedOrder,
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: 'Pedido não encontrado para atualização.'
      });
    }

    return res.status(200).json({
      message: 'Pedido atualizado com sucesso.',
      data: updatedOrder
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro interno ao atualizar o pedido.',
      error: error.message
    });
  }
}

async function deleteOrder(req, res) {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findOneAndDelete({ orderId: id });

    if (!deletedOrder) {
      return res.status(404).json({
        message: 'Pedido não encontrado para exclusão.'
      });
    }

    return res.status(200).json({
      message: 'Pedido removido com sucesso.'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro interno ao deletar o pedido.',
      error: error.message
    });
  }
}

module.exports = {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
  deleteOrder
};