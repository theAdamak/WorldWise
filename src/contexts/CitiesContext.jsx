import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

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

  async function getCity(id) {
    try {
      setIsLoding(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();

      setCurrentCity(data);
      setIsLoding(false);
    } catch {
      alert("error loading data..");
    } finally {
      setIsLoding(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoding,
        currentCity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const Context = useContext(CitiesContext);
  if (Context === undefined)
    throw new Error("use Cities must be used within a CitiesProvider");
  return Context;
}

export { CitiesProvider, useCities };
