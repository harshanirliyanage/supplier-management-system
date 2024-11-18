import express from 'express';
const router = express.Router();

import { saveOrder, getOrderById, editOrder, deleteOrder, getAllOrders } from '../controllers/orderController.js';

// Route to handle saving a new order
router.post('/add', saveOrder);

// Route to get an order by ID
router.get('/:id', getOrderById);

// Route to edit an existing order
router.put('/:id', editOrder);

// Route to delete an order by ID
router.delete('/:id', deleteOrder);

// Route to get all orders
router.get('/', getAllOrders);

export default router;

