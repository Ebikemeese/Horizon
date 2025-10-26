import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";


function App() {
  
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            {/* <Route path="" element={<AppLayout />}/> */}


          </Route>
        </Routes>
      </BrowserRouter>

    </HelmetProvider>
  )
}

export default App
