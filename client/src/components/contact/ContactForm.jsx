import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "../../schemas/contactSchema";
import { Button } from "../ui/Button";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      asunto: "",
      mensaje: "",
    },
  });

  async function onSubmit() {
    // TODO(equipo): integrar POST /api/contacto cuando el contrato se implemente.
    await new Promise((resolve) => {
      setTimeout(resolve, 400);
    });
    setSent(true);
    reset();
  }

  if (sent) {
    return (
      <div className="rounded-lg border border-brand-salvia bg-white p-6" role="status">
        <p>Recibimos tu mensaje. Te vamos a responder a la brevedad.</p>
        <Button className="mt-4" onClick={() => setSent(false)}>
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-lg border border-brand-borde bg-white p-6"
    >
      <div>
        <label htmlFor="nombre" className="block text-sm">
          Nombre *
        </label>
        <input
          id="nombre"
          className="mt-1 w-full rounded-md border border-brand-borde px-3 py-2"
          {...register("nombre")}
        />
        {errors.nombre ? (
          <p role="alert" className="mt-1 text-sm text-red-700">
            {errors.nombre.message}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm">
          Email *
        </label>
        <input
          id="email"
          type="email"
          className="mt-1 w-full rounded-md border border-brand-borde px-3 py-2"
          {...register("email")}
        />
        {errors.email ? (
          <p role="alert" className="mt-1 text-sm text-red-700">
            {errors.email.message}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="telefono" className="block text-sm">
          Teléfono
        </label>
        <input
          id="telefono"
          className="mt-1 w-full rounded-md border border-brand-borde px-3 py-2"
          {...register("telefono")}
        />
        {errors.telefono ? (
          <p role="alert" className="mt-1 text-sm text-red-700">
            {errors.telefono.message}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="asunto" className="block text-sm">
          Asunto *
        </label>
        <input
          id="asunto"
          className="mt-1 w-full rounded-md border border-brand-borde px-3 py-2"
          {...register("asunto")}
        />
        {errors.asunto ? (
          <p role="alert" className="mt-1 text-sm text-red-700">
            {errors.asunto.message}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="mensaje" className="block text-sm">
          Mensaje *
        </label>
        <textarea
          id="mensaje"
          rows="5"
          className="mt-1 w-full rounded-md border border-brand-borde px-3 py-2"
          {...register("mensaje")}
        />
        {errors.mensaje ? (
          <p role="alert" className="mt-1 text-sm text-red-700">
            {errors.mensaje.message}
          </p>
        ) : null}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando…" : "Enviar mensaje"}
      </Button>
    </form>
  );
}
