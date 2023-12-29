const Purchase = require('../modal/Purchasemodal');
const Product = require('../modal/inventory');

const addPurchase = async (req, res) => {
  try {
    const { products, storeID, totalAmount } = req.body;
    const newPurchase = new Purchase({
      products: products,
      storeID: storeID,
      totalAmount: totalAmount,
    });

    const savedPurchase = await newPurchase.save();
    const storeProducts = await Product.find({ store: storeID });

    for (const product of products) {
      const { productID, quantity, purchasePrice } = product;
      const existingProduct = storeProducts.find(
        (storeProduct) => storeProduct._id.toString() === productID
      );

      if (!existingProduct) {
        return res
          .status(404)
          .json({ error: `Product not found with ID: ${productID}` });
      }

      // Parse the quantity as a number before updating
      const parsedQuantity = parseFloat(quantity);

      if (isNaN(parsedQuantity)) {
        return res
          .status(400)
          .json({ error: `Invalid quantity provided: ${quantity}` });
      }

      // Update the product quantity and purchase price for the purchase
      existingProduct.quantity += parsedQuantity;
      existingProduct.purchasePrice = purchasePrice;

      await existingProduct.save();
    }

    res
      .status(200)
      .json({ message: 'Purchase added successfully', purchase: savedPurchase });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while processing the purchase' });
  }
};
const getPurchase=async (req,res)=>{
  try {
    const purchaseData = await Purchase.find();
    res.json(purchaseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching sales data' });
  }
}

const Storepurchase = async (req, res) => {
  const specificStoreId= req.query.store;

  try {
    const allPurchases = await Purchase.find({ storeID:specificStoreId });

    if (allPurchases.length === 0) {
      return res.status(200).json({ message: 'No purchases have been made for this store' });
    }

    res.status(200).json(allPurchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching purchases' });
  }
};



module.exports = {addPurchase,getPurchase,Storepurchase};
