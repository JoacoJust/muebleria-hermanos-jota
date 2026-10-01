import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatCurrency, imageUrl } from "../../utils/format";
import { Button } from "../ui/Button";

export function ProductCard({
  id,
  nombre,
  descripcion,
  precio,
  descuento,
  precioFinal,
  imagen,
  enStock,
  cantidad,
}) {
  const { addToCart } = useCart();
  const producto = {
    id,
    nombre,
    descripcion,
    precio,
    descuento,
    precioFinal,
    imagen,
    enStock,
    cantidad,
  };

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-brand-borde bg-white shadow-soft">
      <Link to={`/producto/${id}`} className="block">
        <img
          src={imageUrl(imagen)}
          alt={nombre}
          width="800"
          height="600"
          loading="lazy"
          className="h-56 w-full object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h2 className="font-display text-xl uppercase tracking-[0.1em]">
          <Link to={`/producto/${id}`}>{nombre}</Link>
        </h2>
        <p className="flex-1 text-sm leading-relaxed text-brand-muted">{descripcion}</p>
        <div>
          {descuento > 0 ? (
            <p>
              <span className="mr-2 text-brand-muted line-through">{formatCurrency(precio)}</span>
              <span className="font-medium">{formatCurrency(precioFinal)}</span>
              <span className="ml-2 rounded-full bg-brand-vara px-2 py-0.5 text-xs text-brand-texto">
                -{descuento}%
              </span>
            </p>
          ) : (
            <p className="font-medium">{formatCurrency(precioFinal)}</p>
          )}
          <p className="mt-1 text-sm text-brand-muted">{enStock ? "En stock" : "Sin stock"}</p>
        </div>
        <Button disabled={!enStock} onClick={() => addToCart(producto)}>
          Agregá al carrito
        </Button>
      </div>
    </article>
  );
}
