import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:9000";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoding(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
        setIsLoding(false);
      } catch {
        alert("error loading data..");
      } finally {
        setIsLoding(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoding={isLoding} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoding={isLoding} />}
          />
          <Route path="countries" element={<p> counries</p>} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
