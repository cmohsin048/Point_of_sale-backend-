const mongoose = require('mongoose');

const accountingSchema = new mongoose.Schema({
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: [true, "Must enter store id"]
    },
    transaction: {
        type: String,
        required: [true, "Transaction was sale or expense"]
    },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Accounting', accountingSchema);
