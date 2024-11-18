// Import the Order model
import Order from '../models/order.js';

//save a new order
export const saveOrder = async (req, res) => {
    try {
        const {
            orderId,
            itemName,
            quantity,
            supplierName,
            unitPrice,
            deliveryCharges,
            totalPrice,
            status 
        } = req.body;

        // Create a new Order instance
        const newOrder = new Order({
            orderId,
            itemName,
            quantity,
            supplierName,
            unitPrice,
            deliveryCharges,
            totalPrice,
            status 
        });

        const savedOrder = await newOrder.save();

        // Send a success response
        res.status(201).json({ message: 'Order saved successfully', order: savedOrder });
    } catch (error) {
        // If an error occurs, send an error response
        res.status(500).json({ error: 'Internal server error' });
        console.error('Error saving order:', error);
    }
};

// get by ID
export const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error('Error getting order by ID:', error);
    }
};

// Edit Order
export const editOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const update = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(orderId, update, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ message: 'Order updated successfully', order: updatedOrder });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error('Error editing order:', error);
    }
};

// Delete Order
export const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error('Error deleting order:', error);
    }
};

// Get All Orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error('Error getting all orders:', error);
    }
};