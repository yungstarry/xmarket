import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Contact, Login, Register,  Admin, Cart, CheckoutDetails, Checkout, CheckoutSuccess, OrderHistory } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/layout/Layout";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import { ProductDetails } from "./components/product";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import ReviewProduct from "./components/reviewProduct/ReviewProduct";
import NotFound from "./pages/notFound/NotFound";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer theme="dark" />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/admin/*"
              element={
                <AdminOnlyRoute>
                  <Admin />
                </AdminOnlyRoute>
              }
            />

            <Route path="/product-details/:id" element={<ProductDetails />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout-details" element={<CheckoutDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout-sucess" element={<CheckoutSuccess />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/review-product/:id" element={<ReviewProduct />} />
            <Route path="/order-details/:id" element={<OrderDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default App;
