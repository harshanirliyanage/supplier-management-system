import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    supplierName: {
        type: String,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
    deliveryCharges: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
      type: String,
      enum: ['pending', 'approved'],
      default: 'pending'
    }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;

