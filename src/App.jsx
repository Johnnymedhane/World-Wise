
import { BrowserRouter,  Navigate,  Route, Routes } from "react-router-dom"

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import SpinnerFullPage from "./components/SpinnerFullPage";
import Form from "./components/Form";
import { lazy, Suspense } from "react";

// import Product from "./pages/Product"
// import HomePage from "./pages/Homepage";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

const HomePage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));





function App() {


  return (
   <AuthProvider>  
    <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
      <Routes>
        <Route index element={<HomePage />} />
      <Route path="Product" element={<Product />} />
      <Route path="Pricing" element={<Pricing />} />
      <Route path="/Login" element={<Login />} />
            <Route path="app" element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
            >
          <Route index element={<Navigate replace to="cities" />} />
          <Route path="cities" element={<CityList  />} />
          <Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<CountryList />} />
          <Route path="form" element={<Form />} />
        </Route>

      <Route path="*" element={<PageNotFound />} />

    </Routes>
    </Suspense>
      </BrowserRouter>
    </CitiesProvider>
   </AuthProvider>
   
  );
}

export default App
