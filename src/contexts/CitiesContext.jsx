import { createContext, useContext, useEffect, useReducer } from "react";


//  const BASE_URL = "http://localhost:8000";
const BASE_URL = "https://worldwise-backend-mnr7.onrender.com";


const citiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
}

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading: true,
      };
   
    case 'cities/loaded':
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };

    
    case 'city/loaded':
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };
    
    case 'city/created':
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
        isLoading: false,
      };

    case 'city/deleted':
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
        isLoading: false,
      };

    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,

        
      }
    default: throw new Error(`Unknown action type`);  
  
  }
}

  function CitiesProvider({ children }) {
    
    const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(reducer, initialState);

    //  const [cities, setCities] = useState([]);
    //   const [isLoading, setIsLoading] = useState(false);
    // const [currentCity, setCurrentCity] = useState({});
    

      useEffect(function () {
        async function fetchCities() {
          dispatch({ type: "loading" });
          
          try {
            const response = await fetch(`${BASE_URL}/cities`);
            const data = await response.json();
            dispatch({ type: "cities/loaded", payload: data });
            
            
          } catch (error) {
            dispatch({ type: "rejected", payload: 'ther was an error loading cities...' });
            
          }  
    
        }
        fetchCities();     
    
      }, []) 
    
    
    async function getCity(id) { 
           if(Number(id) === currentCity.id) return;
          dispatch({ type: "loading" });
            try {
                const response = await fetch(`${BASE_URL}/cities/${id}`);
               
              const data = await response.json();
               dispatch({ type: "city/loaded", payload: data });
            } catch (error) {
                dispatch({ type: "rejected", payload: 'ther was an error loading city...' });
            } 
        }
    
    async function addCity(newCity) {
        dispatch({ type: "loading" });
        try {
            const response = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify( newCity)
                
            });
         
  
          const data = await response.json();
         dispatch({ type: "city/created", payload: data });
             } catch (error) {
            dispatch({ type: "rejected", payload: 'ther was an error adding city...' });
        } 
    }
    
    
  
    async function deleteCity(id) {
        dispatch({ type: "loading" });
        try {

            const response = await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            });
          dispatch({ type: "city/deleted", payload: id });
         
        } catch (error) {
            dispatch({ type: "rejected", payload: 'ther was an error deleting city...' });
        } 
    }
    
    return (
         
        <citiesContext.Provider value={{
              cities,
              isLoading,
              currentCity,
              getCity,   
              addCity,
              deleteCity,
              error,
        

           
        }}>
                {children}
            </citiesContext.Provider>
    )
}

function useCities() {
    const context = useContext(citiesContext);
    if (!context) {
        throw new Error("useCitiesContext must be used within a CitiesProvider");
    }
    return context;
}

export { CitiesProvider, useCities };
