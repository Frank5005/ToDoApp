const db = require('../persistence');

module.exports = async (req, res) => {
    await db.updateItem(req.params.id, {
        name: req.body.name,
        completed: req.body.completed,
    });
    const item = await db.getItem(req.params.id);

    /*
    if (!item) {
        return res.status(404).json({ error: "Item not found after update" });
    }
    */

    res.send(item);
};
