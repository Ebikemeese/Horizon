import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import MyBanks from "./pages/root/my-banks/MyBanks";
import TransactionHistory from "./pages/root/transaction-history/TransactionHistory";
import Transfer from "./pages/root/payment-transfer/Transfer";
import SignIn from "./pages/auth/sign-in/SignIn";
import Home from "./pages/root/page";
import SignUp from "./pages/auth/sign-up/SignUp";
import AddBankPage from "./pages/auth/add-bank/AddBankPage"
import * as Sentry from '@sentry/react';

function App() {

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
           
          {/* Routes without layout */}
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />

          {/* Routes with layout */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="my-banks" element={<MyBanks />}/>
            <Route path="transaction-history/:id" element={<TransactionHistory />} />
            <Route path="payment-transfer" element={<Transfer />} />
            <Route path="add-bank" element={<AddBankPage />} />

          </Route>
        </Routes>
      </BrowserRouter> 

     </HelmetProvider> 
  )
}

export default Sentry.withProfiler(App)
