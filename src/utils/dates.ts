import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const SPAIN_TZ = "Europe/Madrid";

/**
 * Convierte una fecha UTC (de la BD) a hora de España
 * Para mostrar en inputs datetime-local
 */
export const utcToSpain = (isoString: string): string => {
  if (!isoString) return "";
  return dayjs.utc(isoString).tz(SPAIN_TZ).format("YYYY-MM-DDTHH:mm");
};

/**
 * Convierte una fecha en hora de España a UTC
 * Para enviar a la BD
 */
export const spainToUtc = (localDatetime: string): string => {
  if (!localDatetime) return "";
  return dayjs.tz(localDatetime, SPAIN_TZ).utc().toISOString();
};
