export const prerender = false;

import type { APIRoute } from "astro";
import sql from "../../../lib/db";

export const PUT: APIRoute = async ({ request, params }) => {
  const id = params.id;
  if (!id) {
    return new Response(JSON.stringify({ error: "Missing ID" }), {
      status: 400,
    });
  }

  try {
    const data = await request.json();
    const {
      asunto,
      entidad,
      descripcion,
      fecha_inicio,
      fecha_fin,
      enlace,
      oculta,
    } = data;

    const result = await sql`
      UPDATE formaciones
      SET asunto = ${asunto},
          entidad = ${entidad},
          descripcion = ${descripcion},
          fecha_inicio = ${fecha_inicio},
          fecha_fin = ${fecha_fin},
          enlace = ${enlace},
          oculta = ${oculta}
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return new Response(JSON.stringify({ error: "Formation not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(result[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating formation:", error);
    return new Response(JSON.stringify({ error: "Error updating formation" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  const id = params.id;
  if (!id) {
    return new Response(JSON.stringify({ error: "Missing ID" }), {
      status: 400,
    });
  }

  try {
    const result = await sql`
      DELETE FROM formaciones
      WHERE id = ${id}
      RETURNING id
    `;

    if (result.length === 0) {
      return new Response(JSON.stringify({ error: "Formation not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting formation:", error);
    return new Response(JSON.stringify({ error: "Error deleting formation" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
