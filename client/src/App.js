import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCart } from "./hooks/useCart";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Catalog } from "./pages/Catalog";
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/CartPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFound } from "./pages/NotFound";

function AppContent() {
  const cart = useCart();

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route element={<Layout cart={cart} />}>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Catalog />} />
          <Route path="/producto/:id" element={<ProductPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return <AppContent />;
}
