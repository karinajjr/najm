import { lazy, Suspense, memo } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Contact from "./pages/Contact/Contact";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { Toaster } from "./components/ui/toaster";
import FooterNav from "./components/home/Footer/FooterNav";
import Saved from "./pages/Saved/Saved";
import Search from "./pages/Search/Search";


// Lazy load page components
const Home = lazy(() => import("./pages/Home/Home"));
const Shop = lazy(() => import("./pages/Shop/Shop"));
const About = lazy(() => import("./pages/About/About"));
const Cart = lazy(() => import("./pages/Cart/Cart"));

const Layout = memo(() => {
  const location = useLocation();

  return (
    <div className="relative">
      <Header />
      <SpecialCase />
      {/* Показываем поисковик только на /search */}
      {location.pathname === "/search" && <HeaderBottom />}
      <ScrollRestoration />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      <FooterNav />
      <Footer />
      <FooterBottom />
    </div>
  );
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/offer" element={<Offer />}></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/saved" element={<Saved />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/paymentgateway" element={<Payment />}></Route>
      </Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
