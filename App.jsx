import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import LandingPage from "./pages/LandingPage";
import OrdersPage from "./pages/OrdersPage";
import AddOrder from "./pages/AddOrder";
import OrdersReport from "./pages/OrderReport";


function App() {
  const queryClient = new QueryClient();



  return (
    
      <BrowserRouter>
        <Routes>
           <Route path="/dashboad" element={<LandingPage />} /> 
          <Route path="/" element={<OrdersPage />} />
          <Route path="/add-order" element={<AddOrder />} />
          <Route path="/report" element={<OrdersReport />} />
          
        </Routes>
      </BrowserRouter>
      
  );
}

export default App;
