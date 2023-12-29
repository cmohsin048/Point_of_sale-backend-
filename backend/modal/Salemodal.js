const mongoose = require('mongoose');

const Sale = new mongoose.Schema({
  storeID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  products: [
    {
      productName: String,
      price: Number,
      quantity: Number,
      productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory',
      },
    },
  ],
  paymentMethod: {
    type: String, // Assuming paymentMethod is a string, adjust as needed
    required: true,
  },
});

module.exports = mongoose.model('Sale', Sale);
