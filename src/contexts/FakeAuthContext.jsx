import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";




const initialState = {
    user: null,
    isAuthenticated: false,
}

function reducer(state, action) {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };
        case 'logout':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            };
        default:
            throw new Error("UnKnown action type")
    }
}


const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext();



function AuthProvider({ children }) {
   
 
    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState)
     
    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: 'login', payload: FAKE_USER });
          
          
        } else {
            throw new Error("Invalid credentials")
            
            
        }
     }
        // Simulate a login request
      
    function logout() { 
       dispatch({ type: 'logout' });
    }

    return (
        <AuthContext.Provider value={{ 
            user,
            isAuthenticated,
            login,
            logout,
           
         }}>
            {children}
        </AuthContext.Provider>
    )
   
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export { AuthProvider, useAuth };