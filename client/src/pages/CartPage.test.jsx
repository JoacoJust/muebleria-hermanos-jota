import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { CartPage } from "./CartPage";
import { CartProvider } from "../context/CartContext";

function renderCartPage() {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <CartProvider>
        <CartPage />
      </CartProvider>
    </MemoryRouter>,
  );
}

describe("CartPage", () => {
  test("muestra carrito vacío", () => {
    renderCartPage();
    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument();
  });

  test("muestra título de carrito", () => {
    renderCartPage();
    expect(screen.getByRole("heading", { level: 1, name: /carrito/i })).toBeInTheDocument();
  });
});
