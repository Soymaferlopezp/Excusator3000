import { ES_EXCUSES } from "./content.es.bank";
import type { GenerationSignal, LocaleContent, Question } from "./types";

const q = (
  id: string,
  text: string,
  options: [string, number, GenerationSignal[]?][],
): Question => ({
  id,
  text,
  options: options.map(([label, risk, signals], i) => ({
    id: `${id}-${i}`,
    label,
    risk,
    ...(signals ? { signals } : {}),
  })),
});

const confirmado = q("confirmado", "¿Ya cometiste el error de confirmar asistencia?", [
  ["No. Mi libertad aún consta en actas.", -8],
  [
    "Respondí «vamos». Mis abogados sostienen que eso no equivale a confirmar.",
    4,
    ["alreadyConfirmed"],
  ],
  [
    "Sí. Con emojis y signos de exclamación. El caso es grave.",
    12,
    ["alreadyConfirmed", "enthusiasticConfirmation", "groupChatEvidence"],
  ],
]);

const ubicacion = q("ubicacion", "¿Pueden comprobar fácilmente dónde estás?", [
  ["Difícilmente. He aprendido algo de privacidad.", -6],
  ["Probablemente. Hay testigos con tiempo libre.", 6, ["visibilityRisk"]],
  ["Sí. Compartí ubicación. Prefiero no declarar más.", 14, ["visibilityRisk", "socialMediaRisk"]],
]);

const historial = q("historial", "¿Esta persona conoce tus excusas anteriores?", [
  ["Es la primera vez. Mi expediente está limpio.", -5],
  ["Sospecha, pero todavía trabaja sin pruebas.", 6, ["closeRelationship"]],
  [
    "Lleva un registro con fechas. Solicito protección de testigos.",
    13,
    ["closeRelationship", "visibilityRisk"],
  ],
]);

const tiempo = q("tiempo", "¿Cuánto tiempo necesitas desaparecer?", [
  ["Un par de horas. Desaparición de baja intensidad.", -4],
  ["La tarde entera. El tribunal debe cubrirme hasta la noche.", 5, ["timingConflict"]],
  ["Indefinidamente. Solicito archivo sin preguntas.", 10, ["timingConflict"]],
]);

const fecha = q("fecha", "¿Aceptarías ofrecer una fecha alternativa?", [
  ["Sí, con día y hora. Todavía conservo principios.", -10],
  ["Sí, en un futuro que mis abogados definirán después.", 2],
  ["No. Solicito que esa puerta quede administrativamente cerrada.", 9, ["lowEnergy"]],
]);

const gravedad = q("gravedad", "¿Qué tan grave sería una cancelación de último minuto?", [
  ["Nadie lo notaría. Mi ausencia ya estaba presupuestada.", -7],
  ["Habría comentarios y posiblemente un audio.", 5, ["groupChatEvidence"]],
  [
    "Se mencionaría durante años. Mi madre ya abrió diligencias.",
    12,
    ["familyPressure", "groupChatEvidence"],
  ],
]);

const es: LocaleContent = {
  signature: "Oficina de Excusas Improbables",
  categories: {
    familia: {
      label: "Familia",
      formal: "Citatorio familiar no negociable",
      description: "Almuerzos, cumpleaños, visitas y eventos inevitables.",
    },
    amigos: {
      label: "Amigos",
      formal: "Comparecencia social voluntariamente aceptada",
      description: "Fiestas, cenas, planes grupales y arrepentimiento posterior.",
    },
    trabajo: {
      label: "Trabajo",
      formal: "Obligación laboral de dudoso entusiasmo",
      description: "Reuniones, oficina, turnos, mensajes fuera de horario.",
    },
    estudios: {
      label: "Estudios",
      formal: "Incidente académico completamente previsible",
      description: "Clases, trabajos, entregas y consecuencias educativas.",
    },
    cita: {
      label: "Citas",
      formal: "Compromiso afectivo bajo investigación",
      description: "Citas, encuentros románticos o planes que envejecieron mal.",
    },
  },
  questions: {
    familia: [confirmado, historial, gravedad],
    amigos: [confirmado, historial, ubicacion],
    trabajo: [confirmado, ubicacion, gravedad],
    estudios: [confirmado, tiempo, fecha],
    cita: [confirmado, ubicacion, fecha],
  },
  verdicts: [
    "CULPABLE DE ACEPTAR PLANES SIN CONSULTAR EL CALENDARIO",
    "ABSOLUCIÓN SOCIAL CONDICIONAL",
    "NEGLIGENCIA ORGANIZATIVA EN SEGUNDO GRADO",
    "RETIRADA TÁCTICA AUTORIZADA",
    "IMPRUDENCIA SOCIAL CON ATENUANTES",
    "COARTADA APROBADA BAJO SUPERVISIÓN",
    "EXCESO DE OPTIMISMO EN LA FASE DE ACEPTACIÓN",
    "DESERCIÓN JUSTIFICADA CON RESERVAS",
    "ABSUELTO POR FALTA DE ENTUSIASMO SOSTENIBLE",
    "COARTADA ADMINISTRATIVAMENTE ADMISIBLE",
    "DEFENSA CUESTIONABLE, PERO DEFENDIBLE",
    "PRUDENCIA REVOCADA POR MAYORÍA SIMPLE",
    "CASO CERRADO POR AGOTAMIENTO SOCIAL",
    "SENTENCIA: SILENCIO EN EL GRUPO",
    "CULPABLE DE CONFIRMAR CON DEMASIADOS SIGNOS",
    "APELACIÓN CONCEDIDA POR PURA CURIOSIDAD",
    "INCOMPARECENCIA APROBADA SIN HACER MÁS PREGUNTAS",
    "EL CALENDARIO DECLARA CONTRA EL ACUSADO",
    "FALTA DE GANAS CON VALIDEZ PROVISIONAL",
    "EXPEDIENTE ARCHIVADO DEBAJO DE OTROS PROBLEMAS",
  ],
  deliberation: [
    "Contrastando tu versión con decisiones cuestionables anteriores…",
    "Calculando cuánto entusiasmo dejaste por escrito…",
    "Consultando jurisprudencia completamente irrelevante…",
    "Verificando si tu madre ya sospecha…",
    "Buscando una salida administrativamente defendible…",
    "Revisando capturas que el grupo todavía no ha aportado…",
    "Midiendo la resistencia estructural de la coartada…",
    "Ignorando una recomendación sensata del departamento legal…",
  ],
  dramaTail: {
    seco: "",
    cinematografico: " Te ahorro los detalles, pero no ha sido un día ordenado.",
    telenovela:
      " Si te soy sincero, todavía estoy procesando emocionalmente cómo hemos llegado hasta aquí.",
  },
  relationshipOpening: {
    formal: "Buenos días. Lamento comunicarte un contratiempo:",
    cercana: "Oye, perdona el aviso:",
    confianza: "Necesito que te sientes antes de leer esto:",
  },
  relationshipOpenings: {
    formal: ["Una nota rápida de agenda:", "Voy a ser inusualmente directo:", "Para que conste:"],
    cercana: [
      "Oye, malas noticias:",
      "Mira, escúchame antes de juzgar:",
      "Te debo la versión sincera:",
    ],
    confianza: [
      "Mira, ya sabes con quién tratas:",
      "Baja tus expectativas antes de seguir:",
      "He elegido sinceridad sobre dignidad:",
    ],
  },
  credibilityNote: {
    sospechosa: "",
    razonable: " Te aviso en cuanto se aclare.",
    impecable:
      " Ya reorganicé lo demás para que esto no afecte a nada más, así que solo queda esto pendiente.",
  },
  riskStatus: {
    low: "SOSPECHOSAMENTE SÓLIDO",
    mid: "DEFENDIBLE BAJO PRESIÓN",
    high: "HAY TESTIGOS Y TIENEN CAPTURAS",
    extreme: "PREPARA TU DECLARACIÓN",
  },
  institutionalPunchlines: [
    { id: "es-micro-calculo", text: "El tribunal no recomienda verificar esta cifra." },
    { id: "es-micro-fuente", text: "Fuente: de los deseos.", minRisk: 45 },
    {
      id: "es-micro-palabras",
      text: "Cada palabra adicional abre una nueva oportunidad de incriminarte.",
      minRisk: 55,
    },
    {
      id: "es-micro-preguntas",
      text: "Dos preguntas de seguimiento exceden la resistencia estructural de esta coartada.",
      minRisk: 65,
    },
    {
      id: "es-micro-stories",
      text: "No publiques stories durante las próximas tres horas.",
      minRisk: 45,
      signals: ["socialMediaRisk", "visibilityRisk"],
    },
    {
      id: "es-micro-grupo",
      text: "El grupo de WhatsApp será admitido como prueba.",
      minRisk: 40,
      signals: ["groupChatEvidence"],
    },
    {
      id: "es-micro-enemigo",
      text: "Tu principal enemigo ahora mismo eres tú explicándote.",
      minRisk: 50,
    },
    {
      id: "es-micro-departamento",
      text: "El Departamento de Malas Decisiones ya firmó el informe.",
      minRisk: 30,
    },
  ],
  refusal: {
    title: "El tribunal carece de jurisdicción para falsificar evidencia.",
    body: "Podemos autorizar una cancelación honesta o una solicitud de extensión.",
  },
  discriminationRefusal: {
    title: "Caso parcialmente inadmisible.",
    body: "El tribunal no concede coartadas basadas en quiénes son los demás asistentes. Podemos tramitarlo como «no quiero ir», que jurídicamente ya era suficiente.",
  },
  excuses: ES_EXCUSES,
};

export default es;
