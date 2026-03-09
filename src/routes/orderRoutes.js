const express = require('express');
const {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');

const router = express.Router();

router.post('/order', createOrder);
router.get('/order/list', listOrders);
router.get('/order/:id', getOrderById);
router.put('/order/:id', updateOrder);
router.delete('/order/:id', deleteOrder);

module.exports = router;