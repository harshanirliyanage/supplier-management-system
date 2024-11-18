// itemController.js

import Item from '../models/item.js';

// Controller function to get all items
export const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error('Error getting all items:', error);
    }
};
