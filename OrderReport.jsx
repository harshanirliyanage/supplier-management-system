import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { PDFDownloadLink, PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const OrdersReport = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get('http://localhost:3001/orders/')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  };

  
  const approvedOrders = orders.filter(order => order.status === 'approved');
  const pendingOrders = orders.filter(order => order.status === 'pending');

  // Create PDF document
  const ReportDocument = (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Approved Orders</Text>
          {approvedOrders.map(order => (
            <Text key={order._id}>{order.itemName}</Text>
            
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Pending Orders</Text>
          {pendingOrders.map(order => (
            <Text key={order._id}>{order.itemName}</Text>
            
          ))}
        </View>
      </Page>
    </Document>
  );

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div>
      <Button onClick={handleBack}>Back</Button>
      <Button onClick={fetchOrders}>Fetch Orders</Button>
      <PDFDownloadLink document={ReportDocument} fileName="orders_report.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>
      <PDFViewer style={{ width: '100%', height: '500px' }}>
        {ReportDocument}
      </PDFViewer>
    </div>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 10
  }
});

export default OrdersReport;
