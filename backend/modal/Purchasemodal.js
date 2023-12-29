const mongoose = require('mongoose');


const purchase = new mongoose.Schema({
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
      purchasePrice: Number,
      quantity: Number,
      productID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Inventory', 
      },
    },
  ],
});


module.exports = mongoose.model('purchase', purchase);


