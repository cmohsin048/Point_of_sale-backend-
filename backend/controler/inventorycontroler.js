const Inventory = require('../modal/inventory')
const Store = require('../modal/store');

const addInventory = async (req, res) => {
    try {
        const { ProductName } = req.body;

        // Check if a product with the same name already exists
        const existingProduct = await Inventory.findOne({ ProductName });

        if (existingProduct) {
            // If it exists, update the existing product
            
            existingProduct.quantity = req.body.quantity;
            existingProduct.description = req.body.description;
            existingProduct.Price = req.body.Price;
            existingProduct.category = req.body.category;
            existingProduct.image = req.body.image;

            const updatedProduct = await existingProduct.save();
            res.status(200).json(updatedProduct);
        } else {
            // If it doesn't exist, create a new one
            const newItem = await Inventory.create(req.body);
            res.status(200).json(newItem);
        }
    } catch (error) {
        res.status(500).json({ error: "unable to create item" });
    }
}

const getAllItems = async (req, res) => {
    try {
        const specificStoreId = req.query.store;
        const allItems = await Inventory.find({ store: specificStoreId });

        if (allItems.length < 0 || allItems.length === 0) {
            res.status(200).json({ message: "No items listed in the store" });
        } else {
            const confirmedProducts = allItems.map((product) => ({
                uniqueProductNumber: product.uniqueProductNumber,
                image: product.image,
                Name: product.ProductName,
                description: product.description,
                quantity: product.quantity,
                price: product.Price,
                category: product.category,
                ProductID: product._id,
            }));

            res.status(200).json(confirmedProducts);
        }
    } catch (error) {
        // res.status(500).json({ error: "Unable to get items" });
    }
};

const getProducts = async (req, res) => {
    try {
        const specificStoreId = req.query.store;
        const allItems = await Inventory.find({ store: specificStoreId });

        if (allItems.length === 0) {
            res.status(200).json({ message: "No items listed in the store" });
        } else {
            const confirmedProducts = allItems.map((product) => ({
                Name: product.ProductName,
                ProductID: product._id,
            }));

            res.status(200).json(confirmedProducts);
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to get items" });
    }
}
// Add this route in your existing backend code



module.exports = { addInventory, getAllItems, getProducts }