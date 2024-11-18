import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <Drawer variant="permanent">
      <List >
        <ListItem button component={Link} to="/dashboad">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button component={Link} to="/add-order">
          <ListItemText primary="Place Order" />
        </ListItem>
        <ListItem button component={Link} to="/report">
          <ListItemText primary="Report" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AdminMenu;