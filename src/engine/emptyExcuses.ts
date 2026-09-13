import type { LocaleContent } from "./types";

/** Temporary empty runtime bank while the next curated content set is prepared. */
export function createEmptyExcuses(): LocaleContent["excuses"] {
  return {
    familia: { prudente: [], valiente: [], sin_retorno: [] },
    amigos: { prudente: [], valiente: [], sin_retorno: [] },
    trabajo: { prudente: [], valiente: [], sin_retorno: [] },
    estudios: { prudente: [], valiente: [], sin_retorno: [] },
    cita: { prudente: [], valiente: [], sin_retorno: [] },
  };
}
