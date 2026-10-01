const CATEGORIAS = [
  { value: "", label: "Todas las categorías" },
  { value: "sillas", label: "Sillas" },
  { value: "mesas", label: "Mesas" },
  { value: "sofas", label: "Sofás" },
  { value: "escritorios", label: "Escritorios" },
  { value: "estanterias", label: "Estanterías" },
];

export function ProductFilters({ query, categoria, maxPrecio, onQuery, onCategoria, onMaxPrecio }) {
  return (
    <form
      className="mb-8 grid gap-4 rounded-lg border border-brand-borde bg-white p-4 sm:grid-cols-3"
      onSubmit={(event) => event.preventDefault()}
    >
      <label className="flex flex-col gap-1 text-sm" htmlFor="filtro-buscar">
        Buscar
        <input
          id="filtro-buscar"
          type="search"
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          className="rounded-md border border-brand-borde px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-siena"
          placeholder="Nombre del mueble"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm" htmlFor="filtro-categoria">
        Categoría
        <select
          id="filtro-categoria"
          value={categoria}
          onChange={(event) => onCategoria(event.target.value)}
          className="rounded-md border border-brand-borde px-3 py-2"
        >
          {CATEGORIAS.map((item) => (
            <option key={item.value || "all"} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm" htmlFor="filtro-precio">
        Precio máximo
        <input
          id="filtro-precio"
          type="number"
          min="0"
          value={maxPrecio}
          onChange={(event) => onMaxPrecio(event.target.value)}
          className="rounded-md border border-brand-borde px-3 py-2"
          placeholder="Sin tope"
        />
      </label>
    </form>
  );
}
