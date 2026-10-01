import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { ProductFilters } from "./ProductFilters";
import { EmptyState } from "../ui/EmptyState";
import { ErrorMessage } from "../ui/ErrorMessage";
import { Spinner } from "../ui/Spinner";

export function ProductList({ productos, loading, error, onRetry, showFilters = true }) {
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState("");
  const [maxPrecio, setMaxPrecio] = useState("");

  const filtrados = useMemo(() => {
    return productos.filter((producto) => {
      const matchQuery = producto.nombre.toLowerCase().includes(query.trim().toLowerCase());
      const matchCat = categoria === "" || producto.categoria === categoria;
      const matchPrice = maxPrecio === "" || producto.precioFinal <= Number(maxPrecio);
      return matchQuery && matchCat && matchPrice;
    });
  }, [productos, query, categoria, maxPrecio]);

  if (loading) {
    return <Spinner label="Cargando el catálogo" />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (productos.length === 0) {
    return <EmptyState title="Sin productos">Todavía no hay piezas en el catálogo.</EmptyState>;
  }

  return (
    <div>
      {showFilters ? (
        <ProductFilters
          query={query}
          categoria={categoria}
          maxPrecio={maxPrecio}
          onQuery={setQuery}
          onCategoria={setCategoria}
          onMaxPrecio={setMaxPrecio}
        />
      ) : null}
      {filtrados.length === 0 ? (
        <EmptyState title="Sin resultados">Probá con otra búsqueda o categoría.</EmptyState>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((producto) => (
            <li key={producto.id}>
              <ProductCard {...producto} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
