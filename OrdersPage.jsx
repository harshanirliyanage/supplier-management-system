import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, IconButton, MenuItem } from '@mui/material';
import AdminMenu from '../components/AdminMenu';
import DoneIcon from '@mui/icons-material/Done';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SearchIcon from '@mui/icons-material/Search';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatedOrderData, setUpdatedOrderData] = useState({
    itemName: '',
    quantity: '',
    supplierName: '',
    unitPrice: '',
    deliveryCharges: '',
    totalPrice: '',
    status: ''
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get('http://localhost:3001/orders')
      .then(response => {
        setOrders(response.data);
        setFilteredOrders(response.data); // Initialize filtered orders with all orders
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setUpdatedOrderData({ ...order });
    setEditDialogOpen(true);
  };

  const handleUpdateOrder = () => {
    axios.put(`http://localhost:3001/orders/${selectedOrder._id}`, updatedOrderData)
      .then(response => {
        console.log('Order updated successfully:', response.data);
        fetchOrders();
        setEditDialogOpen(false);
      })
      .catch(error => {
        console.error('Error updating order:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedOrderData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'quantity' || name === 'unitPrice' || name === 'deliveryCharges') {
      calculateTotalPrice({ ...updatedOrderData, [name]: value });
    }
  };

  const calculateTotalPrice = ({ unitPrice, quantity, deliveryCharges }) => {
    const unitPriceFloat = parseFloat(unitPrice);
    const quantityInt = parseInt(quantity);
    const deliveryChargesFloat = parseFloat(deliveryCharges);

    if (!isNaN(unitPriceFloat) && !isNaN(quantityInt) && !isNaN(deliveryChargesFloat)) {
      const totalPriceValue = (unitPriceFloat * quantityInt) + deliveryChargesFloat;
      setUpdatedOrderData(prevState => ({
        ...prevState,
        totalPrice: totalPriceValue.toFixed(2)
      }));
    } else {
      setUpdatedOrderData(prevState => ({
        ...prevState,
        totalPrice: ''
      }));
    }
  };

  const filterOrders = (term) => {
    const filtered = orders.filter(order =>
      order.orderId.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  const handleDeleteOrder = (orderId) => {
    axios.delete(`http://localhost:3001/orders/${orderId}`)
      .then(response => {
        console.log('Order deleted successfully');
        fetchOrders();
      })
      .catch(error => {
        console.error('Error deleting order:', error);
      });
  };

  return (
    <div>
      <AdminMenu />
      <Container style={{ marginTop: '40px', marginLeft: '240px' }}>
        {/* Search bar */}
        <Box display="flex" alignItems="center" mb={2}>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <TextField
            label="Search by Order ID"
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        
        <Grid container spacing={3}>
          {filteredOrders.map(order => (
            <Grid item xs={12} sm={6} md={4} key={order._id}>
              <Card style={{ position: 'relative' }}>
                {order.status === 'approved' ? (
                  <DoneIcon style={{ position: 'absolute', top: 5, right: 5, color: 'green' }} />
                ) : (
                  <ScheduleIcon style={{ position: 'absolute', top: 5, right: 5, color: 'yellow' }} />
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom align="center">{order.itemName}</Typography>
                  <Typography variant="body1" color="textSecondary">Order ID:  {order.orderId}</Typography>
                  <Typography variant="body1" color="textSecondary">Quantity:  {order.quantity}</Typography>
                  <Typography variant="body1" color="textSecondary">Supplier:  {order.supplierName}</Typography>
                  <Typography variant="body1" color="textSecondary">Unit Price:  {order.unitPrice}</Typography>
                  <Typography variant="body1" color="textSecondary">Delivery Charges:  {order.deliveryCharges}</Typography>
                  <Typography variant="body1" color="textSecondary">Total Price:  {order.totalPrice}</Typography>
                  <Button variant="contained" color="primary" onClick={() => handleEditOrder(order)}>Edit</Button>
                  <Button variant="contained" color="error" onClick={() => handleDeleteOrder(order._id)} style={{ marginLeft: '8px' }}>Delete</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Order</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <div>
              <TextField
                label="Item Name"
                fullWidth
                margin="normal"
                name="itemName"
                value={updatedOrderData.itemName}
                onChange={handleChange}
              />
              <TextField
                label="Quantity"
                fullWidth
                margin="normal"
                name="quantity"
                type="number"
                value={updatedOrderData.quantity}
                onChange={handleChange}
              />
              <TextField
                label="Supplier Name"
                fullWidth
                margin="normal"
                name="supplierName"
                value={updatedOrderData.supplierName}
                onChange={handleChange}
              />
              <TextField
                label="Unit Price"
                fullWidth
                margin="normal"
                name="unitPrice"
                type="number"
                value={updatedOrderData.unitPrice}
                onChange={handleChange}
              />
              <TextField
                label="Delivery Charges"
                fullWidth
                margin="normal"
                name="deliveryCharges"
                type="number"
                value={updatedOrderData.deliveryCharges}
                onChange={handleChange}
              />
              <TextField
                label="Total Price"
                fullWidth
                margin="normal"
                name="totalPrice"
                value={updatedOrderData.totalPrice}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                select
                label="Status"
                fullWidth
                margin="normal"
                name="status"
                value={updatedOrderData.status}
                onChange={handleChange}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
              </TextField>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateOrder} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Orders;
