import { Leaf, Recycle, Trees } from "lucide-react";
import { ProductList } from "../components/catalog/ProductList";
import { Button } from "../components/ui/Button";
import { useProducts } from "../hooks/useProducts";

export function Home() {
  const { productos, loading, error, reintentar } = useProducts();
  const destacados = productos.filter((item) => item.descuento > 0).slice(0, 3);

  return (
    <div className="space-y-16">
      <section className="rounded-lg bg-white px-6 py-16 shadow-soft">
        <p className="font-sans text-sm font-medium uppercase tracking-[0.08em] text-brand-siena">
          Muebles artesanales
        </p>
        <h1 className="mt-4 font-display text-4xl uppercase tracking-[0.1em] md:text-5xl">
          Cada pieza cuenta la historia de manos expertas y materiales nobles
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-muted">
          Diseñamos y fabricamos en Buenos Aires piezas pensadas para durar, con maderas nativas y
          acabados naturales.
        </p>
        <Button className="mt-8" to="/productos">
          Ver catálogo
        </Button>
      </section>

      <section>
        <h2 className="font-display text-3xl uppercase tracking-[0.1em]">Productos destacados</h2>
        <div className="mt-6">
          <ProductList
            productos={destacados}
            loading={loading}
            error={error}
            onRetry={reintentar}
            showFilters={false}
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <article className="rounded-lg border border-brand-borde bg-white p-6">
          <h2 className="font-display text-xl uppercase tracking-[0.1em]">Maderas seleccionadas</h2>
          <p className="mt-3 leading-relaxed">Elegimos materiales de calidad para cada pieza.</p>
        </article>
        <article className="rounded-lg border border-brand-borde bg-white p-6">
          <h2 className="font-display text-xl uppercase tracking-[0.1em]">Hecho artesanalmente</h2>
          <p className="mt-3 leading-relaxed">Cada mueble recibe atención en cada detalle.</p>
        </article>
        <article className="rounded-lg border border-brand-borde bg-white p-6">
          <h2 className="font-display text-xl uppercase tracking-[0.1em]">Diseño para durar</h2>
          <p className="mt-3 leading-relaxed">Creaciones pensadas para acompañarte durante años.</p>
        </article>
      </section>

      <section className="rounded-lg border border-brand-salvia bg-white p-8">
        <p className="text-sm font-medium uppercase tracking-[0.08em] text-brand-muted">
          Compromiso ambiental
        </p>
        <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.1em]">Sustentabilidad</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <article>
            <Trees className="text-brand-salvia" aria-hidden="true" />
            <h3 className="mt-2 font-medium">Maderas nativas certificadas FSC</h3>
            <p className="mt-2 text-brand-muted">
              Trabajamos con proveedores locales y fuentes responsables.
            </p>
          </article>
          <article>
            <Leaf className="text-brand-salvia" aria-hidden="true" />
            <h3 className="mt-2 font-medium">Acabados naturales</h3>
            <p className="mt-2 text-brand-muted">
              Priorizamos aceites y terminaciones de bajo impacto.
            </p>
          </article>
          <article>
            <Recycle className="text-brand-salvia" aria-hidden="true" />
            <h3 className="mt-2 font-medium">Aprovechamiento de material</h3>
            <p className="mt-2 text-brand-muted">
              Reducimos residuos reutilizando recortes en el taller.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
