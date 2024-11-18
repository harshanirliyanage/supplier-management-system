import React from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import AdminMenu from '../components/AdminMenu';

const Dashboard = () => {
  
  const newOrders = [
    { id: 1, itemName: 'Yoga Towels', quantity: 2, supplier: 'ABC Company' },
    { id: 2, itemName: 'Yoga Straps', quantity: 3, supplier: 'ABC Company' },
    { id: 3, itemName: 'Yoga Blocks', quantity: 1, supplier: 'ABC Company' }
  ];

  return (
    <div>
      <AdminMenu />
      <Container style={{ marginTop: '40px', marginLeft: '240px' }}>
        <Typography variant="h4" gutterBottom>New Orders</Typography>
        <Paper elevation={3} style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <List>
            {newOrders.map(order => (
              <ListItem key={order.id}>
                <ListItemText
                  primary={`${order.itemName} (${order.quantity})`}
                  secondary={`Supplier: ${order.supplier}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </div>
  );
};

export default Dashboard;
