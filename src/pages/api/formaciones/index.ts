export const prerender = false;

import type { APIRoute } from "astro";
import sql from "../../../lib/db";

export const POST: APIRoute = async ({ request }) => {
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
      INSERT INTO formaciones (asunto, entidad, descripcion, fecha_inicio, fecha_fin, enlace, oculta)
      VALUES (${asunto}, ${entidad}, ${descripcion}, ${fecha_inicio}, ${fecha_fin}, ${enlace}, ${oculta})
      RETURNING *
    `;

    return new Response(JSON.stringify(result[0]), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating formation:", error);
    return new Response(JSON.stringify({ error: "Error creating formation" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
