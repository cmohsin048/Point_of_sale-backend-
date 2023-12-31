const express = require('express');
const Router = express.Router();
const {createStore,getAllStoreLocations} = require('../controler/storecontroler'); 
const {addInventory,getAllItems,getProducts}=require('../controler/inventorycontroler')
const addaccounting=require('../controler/accontingcontroler')
const {registration,login}=require('../controler/authcontroler')
const {authenticateUser,checkUserRole}=require('../middleware/userauth')
const {addSale,getSales,storeSale}=require('../controler/Salecontroler')
const {addPurchase,getPurchase,Storepurchase}=require('../controler/purchcasecontroler')
const { addExpense,getExpenses,storeExpense }=require('../controler/Expensecontroler')

Router.route('/register').post(registration)
Router.route('/login').post(login,authenticateUser)
Router.route('/create').post(checkUserRole(['Admin']),createStore);
Router.route('/Locations').get(getAllStoreLocations)
Router.route("/products/create").post(checkUserRole(['Admin', 'Manager']),addInventory)
Router.route('/Allproducts').get(getAllItems)
Router.route('/products').get(getProducts)
Router.route("/Accounting").post(addaccounting)

Router.route('/addsale').post(addSale)
Router.route('/getsales').get(getSales)
Router.route('/Storesales').get(storeSale)

Router.route('/addpurchase').post(addPurchase)
Router.route('/getpurchase').get(getPurchase)
Router.route('/Storepurchase').get(Storepurchase)


Router.route('/addexpense').post(addExpense)
Router.route('/getexpense').get(getExpenses)
Router.route('/storeexpense').get(storeExpense)




module.exports = Router;
