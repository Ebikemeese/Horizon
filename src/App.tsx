import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import MyBanks from "./pages/root/my-banks/MyBanks";
import TransactionHistory from "./pages/root/transaction-history/TransactionHistory";
import Transfer from "./pages/root/payment-transfer/Transfer";

function App() {
  
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="my-banks" element={<MyBanks />}/>
            <Route path="transaction-history" element={<TransactionHistory />} />
            <Route path="payment-transfer" element={<Transfer />} />


          </Route>
        </Routes>
      </BrowserRouter>

    </HelmetProvider>
  )
}

export default App
