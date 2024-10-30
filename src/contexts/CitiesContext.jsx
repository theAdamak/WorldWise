import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoding: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoding: true,
      };

    case "cities/loaded":
      return {
        ...state,
        isLoding: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoding: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoding: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/ deleted":
      return {
        ...state,
        isLoding: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoding: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoding, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const [cities, setCities] = useState([]);
  // const [isLoding, setIsLoding] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({ type: "rejected", payload: "error loading cities" });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    if (currentCity.id === Number(id)) return;

    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();

      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "error loading city.." });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "error creating city.." });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      dispatch({ type: "city/ deleted", payload: id });
    } catch {
      dispatch({ type: "rejected", payload: "error deleting city.." });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoding,
        currentCity,
        getCity,
        createCity,
        deleteCity,
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
