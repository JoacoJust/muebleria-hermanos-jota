import { useParams, useOutletContext } from "react-router-dom";
import { ProductDetail } from "../components/product/ProductDetail";
import { useProduct } from "../hooks/useProduct";

export function ProductPage() {
  const { id } = useParams();
  const { producto, loading, error, notFound, reintentar } = useProduct(id);
  const { addToCart } = useOutletContext();

  return (
    <ProductDetail
      producto={producto}
      loading={loading}
      error={error}
      notFound={notFound}
      onRetry={reintentar}
      addToCart={addToCart}
    />
  );
}
