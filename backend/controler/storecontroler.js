const Store = require('../modal/store');

const createStore = async (req, res) => {
    try {
        const newStore = await Store.create(req.body);
        res.status(200).json(newStore);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Unable to create store" });
    }
}

const getAllStoreLocations = async (req, res) => {
    try {
        const storeLocations = await Store.find({}, 'Storename address city');
        if (storeLocations.length === 0) {
            res.status(200).json({ message: "No store exist yet" });
        } else {
            const formattedStoreLocations = storeLocations.map((store) => ({
                storeID: store._id,
                storeName: store.Storename,
                address: store.address,
                city: store.city,
            }));
            res.status(200).json(formattedStoreLocations);
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to fetch store locations" });
    }
};


module.exports = { createStore, getAllStoreLocations }
