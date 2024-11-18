import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, MenuItem } from '@mui/material';
import AdminMenu from '../components/AdminMenu';

const AddOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [deliveryCharges, setDeliveryCharges] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [itemName, setItemName] = useState('');
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios.get('http://localhost:3001/items')
      .then(response => {
        setItems(response.data);
        setFilteredItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  };

  const handleItemChange = (event) => {
    setItemName(event.target.value);
  };

  const validateForm = () => {
    const errors = {};

    if (!orderId) {
      errors.orderId = 'Order ID is required';
    } else if (!/^o\d{3}$/i.test(orderId)) {
      errors.orderId = 'Order ID must start with O or o followed by 3 numbers';
    }

    if (!itemName) {
      errors.itemName = 'Item Name is required';
    }

    if (!quantity) {
      errors.quantity = 'Quantity is required';
    }

    if (!supplierName) {
      errors.supplierName = 'Supplier Name is required';
    }

    if (!unitPrice) {
      errors.unitPrice = 'Unit Price is required';
    }

    if (!deliveryCharges) {
      errors.deliveryCharges = 'Delivery Charges are required';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const calculateTotalPrice = () => {
    const unitPriceFloat = parseFloat(unitPrice);
    const quantityInt = parseInt(quantity);
    const deliveryChargesFloat = parseFloat(deliveryCharges);

    if (!isNaN(unitPriceFloat) && !isNaN(quantityInt) && !isNaN(deliveryChargesFloat)) {
      const totalPriceValue = (unitPriceFloat * quantityInt) + deliveryChargesFloat;
      setTotalPrice(totalPriceValue.toFixed(2));
    } else {
      setTotalPrice('');
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [unitPrice, quantity, deliveryCharges]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newOrder = {
      orderId,
      itemName,
      quantity,
      supplierName,
      unitPrice,
      deliveryCharges,
      totalPrice
    };

    axios.post('http://localhost:3001/orders/add', newOrder)
      .then(response => {
        console.log('Order added successfully:', response.data);
        
        setOrderId('');
        setQuantity('');
        setSupplierName('');
        setUnitPrice('');
        setDeliveryCharges('');
        setTotalPrice('');
        setItemName('');
        setErrors({});
      })
      .catch(error => {
        console.error('Error adding order:', error);
      });
  };

  return (
    <div>
      <AdminMenu />
      <Container style={{ marginTop: '40px', marginLeft: '240px' }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Order ID"
            variant="outlined"
            fullWidth
            margin="normal"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            error={!!errors.orderId}
            helperText={errors.orderId}
          />
          <TextField
            select
            label="Item Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={itemName}
            onChange={handleItemChange}
            error={!!errors.itemName}
            helperText={errors.itemName}
          >
            {filteredItems.map(item => (
              <MenuItem key={item._id} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Quantity"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            error={!!errors.quantity}
            helperText={errors.quantity}
          />
          <TextField
            label="Supplier Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            error={!!errors.supplierName}
            helperText={errors.supplierName}
          />
          <TextField
            label="Unit Price"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={unitPrice}
            onChange={(e) => {
              setUnitPrice(e.target.value);
              calculateTotalPrice();
            }}
            error={!!errors.unitPrice}
            helperText={errors.unitPrice}
          />
          <TextField
            label="Delivery Charges"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={deliveryCharges}
            onChange={(e) => {
              setDeliveryCharges(e.target.value);
              calculateTotalPrice();
            }}
            error={!!errors.deliveryCharges}
            helperText={errors.deliveryCharges}
          />
          <TextField
            label="Total Price"
            variant="outlined"
            fullWidth
            margin="normal"
            value={totalPrice}
            InputProps={{
              readOnly: true,
            }}
          />
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </form>
      </Container>
    </div>
  );
};

export default AddOrder;