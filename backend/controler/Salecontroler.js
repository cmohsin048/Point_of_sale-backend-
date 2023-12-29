const Sale = require('../modal/Salemodal'); 

const Product = require('../modal/inventory'); 

const addSale = async (req, res) => {
  try {
    const { products, storeID, totalAmount, paymentMethod } = req.body; // Added paymentMethod
    const newSale = new Sale({
      products: products, 
      storeID: storeID, 
      totalAmount: totalAmount, 
      paymentMethod: paymentMethod, // Added paymentMethod
    });

    const savedSale = await newSale.save();
    const storeProducts = await Product.find({ store: storeID });
    for (const product of products) {
      const { productID, quantity } = product; 
      const existingProduct = storeProducts.find((storeProduct) => storeProduct._id.toString() === productID);
      if (!existingProduct) {
        return res.status(404).json({ error: `Product not found with ID: ${productID}` });
      }
      existingProduct.quantity -= quantity;
      await existingProduct.save();
    }
    res.status(200).json({ message: 'Sale added successfully', sale: savedSale });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the sale' });
  }
};

const getSales=async (req,res)=>{
  try {
    const salesData = await Sale.find();
    res.json(salesData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching sales data' });
  }
}

const storeSale=async(req,res)=>{
  const specificStoreId=req.query.store
  const allsales=await Sale.find({storeID:specificStoreId})
  if(allsales.length<0 || allsales.length===0){
    res.status(200).json({message:"NO product listed yet"})
  }else{
    res.json(allsales)
    // const formatedSales=allsales.map((sale)=>{
    //      storeID:sale.storeID,

    // })
  }
}



module.exports = {addSale,getSales,storeSale};
