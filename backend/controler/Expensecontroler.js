const Expense = require('../modal/Expensemodal')

const addExpense = async (req, res) => {
    const { storeID, category, name, amount } = req.body;

    try {
        const newExpense = new Expense({ storeID, category, name, amount });
        await newExpense.save();
        res.status(200).json({ message: 'Expense added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getExpenses = async (req, res) => {
    try {
        const ExpenseData = await Expense.find();
        res.json(ExpenseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching expenses' });
    }
}
const storeExpense = async (req, res) => {
    try {
        const specificStore = req.query.store;
        const allExpenses = await Expense.find({ storeID: specificStore });

        if (allExpenses.length === 0) {
            res.status(200).json({ message: "NO expense added yet" });
        } else {
            res.json(allExpenses);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching expenses' });
    }
}


module.exports = { addExpense, getExpenses, storeExpense }