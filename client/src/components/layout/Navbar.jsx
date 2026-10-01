import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, ShoppingBag, X } from "lucide-react";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/productos", label: "Catálogo" },
  { to: "/contacto", label: "Contacto" },
];

export function Navbar({ itemCount }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-brand-borde bg-brand-alabastro">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.svg"
            alt="Hermanos Jota"
            width="140"
            height="140"
            className="h-auto w-[140px] min-w-[120px]"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-sans text-sm font-medium uppercase tracking-[0.08em] ${
                  isActive ? "text-brand-siena" : "text-brand-texto hover:text-brand-siena"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/carrito"
            className="relative rounded-md p-2 text-brand-texto focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-siena"
            aria-label={`Carrito, ${itemCount} productos`}
          >
            <ShoppingBag aria-hidden="true" />
            <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-brand-siena px-1 text-center text-xs text-brand-alabastro">
              {itemCount}
            </span>
          </Link>
          <button
            type="button"
            className="rounded-md p-2 md:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="menu-movil"
          className="flex flex-col gap-3 border-t border-brand-borde px-4 py-4 md:hidden"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="font-medium uppercase tracking-[0.08em] text-brand-texto"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
