const mongoose=require('mongoose')
const inventory = new mongoose.Schema({
    store: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Store',
        required: [true, "Must enter store id"]
    },
    ProductName: {
        type: String,
        required: [true, "Must enter product Name"]
    },
    quantity: {
        type: Number,
        required: [true, "must provide quantity of the product"]
    },
    description: {
        type: String,
        required: [true, "Must enter product description"]

    },
    Price: {
        type: Number,
        required: [true, "must enter product price"]
    },
    category: {
        type: String, 
        required: [true, "Must provide product category"]
    },
    image: {
        type: String, 
        required: [true, "Must provide image URL"]
    }
})


module.exports = mongoose.model('Inventory', inventory)