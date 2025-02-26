const db = require('../persistence');

module.exports = async (req, res) => {
    const { id } = req.params;
    const { name, completed } = req.body;

    const updatedItem = await db.updateItem(id, { name, completed });

    if (!updatedItem) {
        return res.status(404).json({ error: "Item not found" }); // ✅ Handle missing items
    }

    res.status(200).json(updatedItem); // ✅ Ensure JSON response
};
