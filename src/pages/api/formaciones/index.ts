export const prerender = false;

import type { APIRoute } from "astro";
import sql from "../../../lib/db";
import { dbDateToUtc } from "../../../utils/dates";

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
      RETURNING id, asunto, entidad, descripcion, enlace, oculta,
        fecha_inicio::text as fecha_inicio,
        fecha_fin::text as fecha_fin
    `;

    const formation = {
      ...result[0],
      fecha_inicio: dbDateToUtc(result[0].fecha_inicio),
      fecha_fin: dbDateToUtc(result[0].fecha_fin),
    };

    return new Response(JSON.stringify(formation), {
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
