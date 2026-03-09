const express = require('express');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API Jitterbit Order funcionando.'
  });
});

app.use('/', orderRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Rota não encontrada.'
  });
});

module.exports = app;