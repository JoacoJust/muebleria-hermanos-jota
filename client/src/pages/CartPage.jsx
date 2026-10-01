import { CartView } from "../components/cart/CartView";
import { useCart } from "../context/CartContext";

export function CartPage() {
  const { items, subtotal, shipping, total, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <section>
      <h1 className="mb-8 font-display text-4xl uppercase tracking-[0.1em]">Carrito</h1>
      <CartView
        items={items}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        onUpdate={updateQuantity}
        onRemove={removeFromCart}
        onClear={clearCart}
      />
    </section>
  );
}
