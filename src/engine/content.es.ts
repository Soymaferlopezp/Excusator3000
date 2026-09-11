import type { GenerationSignal, LocaleContent, Question } from "./types";

const q = (
  id: string,
  text: string,
  options: [string, number, GenerationSignal[]?][],
): Question => ({
  id,
  text,
  options: options.map(([label, risk, signals], i) => ({ id: `${id}-${i}`, label, risk, signals })),
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
    familia: {
      label: "Familia",
      formal: "Citatorio familiar no negociable",
      description: "Almuerzos, cumpleaños, visitas y eventos inevitables.",
    },
    cita: {
      label: "Cita",
      formal: "Compromiso afectivo bajo investigación",
      description: "Citas, encuentros románticos o planes que envejecieron mal.",
    },
    amigos: {
      label: "Amigos",
      formal: "Comparecencia social voluntariamente aceptada",
      description: "Fiestas, cenas, planes grupales y arrepentimiento posterior.",
    },
    ejercicio: {
      label: "Ejercicio",
      formal: "Obligación física incompatible con el estado actual",
      description: "Gimnasio, running, fútbol y otras decisiones optimistas.",
    },
    favor: {
      label: "Favor pendiente",
      formal: "Deuda moral administrativamente incómoda",
      description: "Mudanzas, favores, recados y promesas peligrosas.",
    },
    inconfesable: {
      label: "Algo inconfesable",
      formal: "Materia reservada bajo secreto administrativo",
      description: "El tribunal hará pocas preguntas.",
    },
  },
  questions: {
    trabajo: [confirmado, ubicacion, gravedad],
    estudios: [confirmado, tiempo, fecha],
    familia: [confirmado, historial, gravedad],
    cita: [confirmado, ubicacion, fecha],
    amigos: [confirmado, historial, ubicacion],
    ejercicio: [historial, tiempo],
    favor: [confirmado, fecha, gravedad],
    inconfesable: [ubicacion, tiempo],
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
    formal: [
      "Buenos días. Presento una solicitud de modificación del plan:",
      "Lamento comunicar una incidencia de agenda:",
      "Por medio del presente mensaje, y con más formalidad de la necesaria:",
      "Tras revisar el expediente, debo informar lo siguiente:",
    ],
    cercana: [
      "Oye, vengo a presentar una apelación:",
      "Perdona el aviso; mi calendario acaba de declarar contra mí:",
      "Tengo una actualización poco gloriosa sobre el plan:",
      "Antes de que esto envejezca peor, te aviso:",
    ],
    confianza: [
      "Voy a pedirte que leas esto con espíritu garantista:",
      "El Departamento de Malas Decisiones informa:",
      "Necesito cinco minutos de inmunidad diplomática:",
      "Se ha abierto un expediente y, lamentablemente, soy el expediente:",
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
  excuses: {
    trabajo: {
      prudente: [
        {
          id: "es-trabajo-reunion-p",
          conceptId: "trabajo-reunion-cautiva",
          styles: ["deadpan", "bureaucratic"],
          signals: ["workPressure", "authorityFigure"],
          modifierMode: "none",
          body: "no voy a poder estar en la reunión de esta tarde; un compromiso previo ha presentado recurso y, por una vez, lo ha ganado.",
          followUp:
            "Dejo mi parte por escrito. El documento tendrá más capacidad de síntesis que yo a esa hora.",
          weakness:
            "Tu jefe creó la invitación y puede ver que la rechazaste nueve minutos después de aceptarla.",
          repair:
            "Envía el resumen antes de que empiece la reunión. La diligencia confunde favorablemente al tribunal.",
        },
        {
          id: "es-trabajo-calendario-p",
          conceptId: "trabajo-doble-reserva",
          styles: ["bureaucratic", "selfIncriminating"],
          signals: ["timingConflict", "alreadyConfirmed"],
          modifierMode: "none",
          body: "he detectado una incompatibilidad de agenda que mi yo del lunes aprobó sin consultar a mi yo de hoy.",
          followUp:
            "Fue una doble reserva legítima y completamente evitable. Ya estoy corrigiendo ambas partes de la frase.",
          weakness:
            "El calendario conserva la hora exacta en que dijiste que sí. La tecnología ha decidido colaborar con la fiscalía.",
          repair:
            "Propón dos horarios concretos. Decir «cuando puedan» se considerará fuga administrativa.",
        },
        {
          id: "es-trabajo-tecnologia-p",
          conceptId: "trabajo-tecnologia-hostil",
          styles: ["deadpan", "hyperSpecific"],
          signals: ["technology", "workPressure"],
          modifierMode: "none",
          body: "mi equipo ha entrado en una negociación técnica y ahora mismo no puedo garantizar una conexión útil.",
          followUp: "Puedo conectarme, pero sería como testigo, no como participante funcional.",
          weakness:
            "Teams mostrará tu punto verde con la serenidad de quien no teme declarar bajo juramento.",
          repair:
            "Manda el archivo pendiente primero. Un adjunto oportuno ha salvado defensas peores.",
        },
        {
          id: "es-trabajo-honestidad-p",
          conceptId: "trabajo-honestidad-regulada",
          styles: ["radicalHonesty", "bureaucratic"],
          signals: ["lowEnergy", "workPressure"],
          credibilities: ["impecable", "razonable"],
          modifierMode: "none",
          body: "hoy no estoy en condiciones de aportar una versión profesional de mí mismo y prefiero reprogramar antes que improvisarla.",
          followUp: "No es una emergencia; es control de calidad preventivo.",
          weakness:
            "La honestidad funciona hasta que alguien pregunta por qué aceptaste la reunión esta mañana.",
          repair:
            "Entrega una solución pequeña hoy. La sinceridad sin entregable es solo una ausencia bien redactada.",
        },
      ],
      valiente: [
        {
          id: "es-trabajo-reunion-v",
          conceptId: "trabajo-reunion-cautiva",
          styles: ["bureaucratic", "hyperSpecific", "escalation"],
          signals: ["workPressure", "authorityFigure"],
          modifierMode: "none",
          body: "la reunión de esta tarde ha sido absorbida por un compromiso previo cuya cancelación requiere más firmas que mi contrato.",
          followUp:
            "Ya dejé por escrito decisiones, riesgos y una cantidad responsable de aparente entusiasmo.",
          weakness:
            "Tu jefe puede responder «son quince minutos». El tribunal no dispone de jurisprudencia contra esa frase.",
          repair:
            "No aparezcas disponible durante esos quince minutos. Ser localizable destruiría la única columna del caso.",
        },
        {
          id: "es-trabajo-calendario-v",
          conceptId: "trabajo-doble-reserva",
          styles: ["selfIncriminating", "hyperSpecific"],
          signals: ["timingConflict", "alreadyConfirmed"],
          modifierMode: "none",
          body: "mi calendario autorizó dos compromisos simultáneos y ninguno reconoce ahora la jurisdicción del otro.",
          followUp:
            "Estoy resolviendo el conflicto por orden de antigüedad, que casualmente favorece al otro compromiso.",
          weakness:
            "Moviste la cita anterior ayer. El historial de cambios será admitido como prueba de premeditación.",
          repair:
            "Reagenda tú la reunión y añade agenda. La burocracia bien aplicada parece liderazgo.",
        },
        {
          id: "es-trabajo-tecnologia-v",
          conceptId: "trabajo-tecnologia-hostil",
          styles: ["hyperSpecific", "bureaucratic", "internet"],
          signals: ["technology", "workPressure"],
          modifierMode: "none",
          body: "el portátil ha iniciado una actualización que mide el tiempo en porcentajes decorativos y no en minutos humanos.",
          followUp:
            "Va por 83 % desde hace media hora. Técnicamente avanza; jurídicamente se burla de nosotros.",
          weakness:
            "Responder desde Slack demuestra que posees otro dispositivo y capacidad suficiente para escribir frases completas.",
          repair:
            "Envía una foto solo si existe. El tribunal prohíbe fabricar pruebas y también fotografiar pantallas sucias.",
        },
        {
          id: "es-trabajo-honestidad-v",
          conceptId: "trabajo-honestidad-regulada",
          styles: ["radicalHonesty", "selfIncriminating", "deadpan"],
          signals: ["lowEnergy", "workPressure"],
          modifierMode: "none",
          body: "acepté esta reunión con una confianza en mi energía que los hechos no han respaldado.",
          followUp:
            "No estoy indispuesto. Estoy administrativamente agotado y quiero evitar que eso figure en el acta.",
          weakness: "Has confesado el motivo real. Es elegante, pero sigue siendo una confesión.",
          repair: "Reprograma para primera hora y llega con café y una decisión ya tomada.",
        },
      ],
      sin_retorno: [
        {
          id: "es-trabajo-reunion-s",
          conceptId: "trabajo-reunion-cautiva",
          styles: ["absurdAuthority", "bureaucratic", "escalation"],
          signals: ["workPressure", "authorityFigure"],
          modifierMode: "none",
          body: "solicito quedar exento de la reunión: una comisión unipersonal, presidida por mí, ha determinado que mi presencia empeoraría todos los indicadores disponibles.",
          followUp:
            "La resolución fue aprobada por unanimidad. Era el único miembro, pero el reglamento no exige pluralidad.",
          weakness: "La comisión carece de autoridad, sede y probablemente futuro profesional.",
          repair:
            "Entrega algo extraordinariamente útil mañana. La productividad retroactiva puede obtener el indulto.",
        },
        {
          id: "es-trabajo-calendario-s",
          conceptId: "trabajo-doble-reserva",
          styles: ["absurdAuthority", "selfIncriminating", "escalation"],
          signals: ["timingConflict", "alreadyConfirmed"],
          modifierMode: "none",
          body: "mi calendario ha declarado conflicto de competencias y, tras una vista celebrada sin asistentes, ha anulado la reunión por exceso de optimismo previo.",
          followUp: "La sentencia es firme porque nadie encontró el botón de apelación.",
          weakness:
            "Outlook enviará una notificación mucho menos poética: «rechazado por el organizador».",
          repair: "No expliques el fallo. Cada detalle nuevo abre una pestaña que no sabes cerrar.",
        },
        {
          id: "es-trabajo-tecnologia-s",
          conceptId: "trabajo-tecnologia-hostil",
          styles: ["absurdAuthority", "hyperSpecific", "internet"],
          signals: ["technology", "workPressure"],
          modifierMode: "none",
          body: "el portátil ha completado la actualización y ahora solo reconoce una zona horaria, dos impresoras inexistentes y ninguna de mis obligaciones laborales.",
          followUp:
            "Soporte recomienda reiniciar mi identidad digital y esperar a que Recursos Humanos no haga preguntas.",
          weakness: "El mensaje fue enviado desde el mismo portátil presuntamente emancipado.",
          repair:
            "Cierra sesión. Tu principal enemigo es el indicador verde aportando testimonio espontáneo.",
        },
        {
          id: "es-trabajo-honestidad-s",
          conceptId: "trabajo-honestidad-regulada",
          styles: ["radicalHonesty", "absurdAuthority", "deadpan"],
          signals: ["lowEnergy", "workPressure"],
          modifierMode: "none",
          body: "no tengo una emergencia: tengo una reunión que acepté durante un episodio breve de ambición y hoy solicito la nulidad del consentimiento.",
          followUp: "Mi capacidad era técnicamente existente, pero moralmente insuficiente.",
          weakness: "La defensa es impecablemente sincera y laboralmente temeraria.",
          repair:
            "Usa esta coartada una sola vez y actualiza tu perfil profesional antes de enviarla.",
        },
      ],
    },
    estudios: {
      prudente: [
        {
          id: "es-estudios-entrega-p",
          conceptId: "estudios-entrega-cruzada",
          styles: ["bureaucratic", "deadpan"],
          signals: ["academicPressure", "timingConflict"],
          modifierMode: "none",
          body: "necesito faltar hoy a clase para cerrar una entrega cuyo plazo tiene menos flexibilidad que yo en este momento.",
          followUp:
            "Recupero los apuntes hoy. El aprendizaje continúa, solo que fuera del edificio y con peor postura.",
          weakness:
            "La plataforma publica la fecha y puede demostrar que conocías el plazo desde hace tres semanas.",
          repair:
            "Pide los apuntes antes de que pasen lista. La iniciativa reduce el aroma a fuga.",
        },
        {
          id: "es-estudios-archivo-p",
          conceptId: "estudios-archivo-rebelde",
          styles: ["deadpan", "hyperSpecific"],
          signals: ["technology", "academicPressure"],
          modifierMode: "none",
          body: "el archivo de la entrega presenta diferencias irreconciliables con la versión que guardé anoche.",
          followUp:
            "Estoy reconstruyendo los cambios. De momento el documento recuerda menos que yo, lo cual era difícil.",
          weakness:
            "El historial de versiones sabe exactamente cuándo empezaste. Ha aceptado declarar.",
          repair:
            "Entrega una versión parcial con nombre digno. «final_final2» será interpretado como desacato.",
        },
        {
          id: "es-estudios-profesor-p",
          conceptId: "estudios-consulta-infinita",
          styles: ["bureaucratic", "absurdAuthority"],
          signals: ["academicPressure", "authorityFigure"],
          modifierMode: "none",
          body: "tengo que resolver una consulta académica antes de entrar en otra hora de contenido que todavía no puedo procesar.",
          followUp:
            "Ya escribí al profesor correspondiente y estoy a la espera de una respuesta con verbos.",
          weakness:
            "El profesor correspondiente puede estar sentado precisamente en la clase que estás evitando.",
          repair:
            "Formula una pregunta concreta por correo. Una duda documentada parece casi trabajo.",
        },
        {
          id: "es-estudios-honestidad-p",
          conceptId: "estudios-honestidad-academica",
          styles: ["radicalHonesty", "deadpan"],
          signals: ["lowEnergy", "academicPressure"],
          modifierMode: "none",
          body: "hoy asistiría físicamente y faltaría de todas las demás formas, así que prefiero recuperar la sesión por mi cuenta.",
          followUp: "No estoy mal; estoy por debajo del mínimo académico de atención continuada.",
          weakness: "La universidad suele cobrar también por la presencia meramente ornamental.",
          repair: "Entrega un ejercicio resuelto hoy. La honestidad necesita bibliografía.",
        },
      ],
      valiente: [
        {
          id: "es-estudios-entrega-v",
          conceptId: "estudios-entrega-cruzada",
          styles: ["selfIncriminating", "bureaucratic"],
          signals: ["academicPressure", "timingConflict"],
          modifierMode: "none",
          body: "dos asignaturas reclaman simultáneamente el mismo bloque de tiempo y la que amenaza con cerrar la plataforma ha obtenido custodia provisional.",
          followUp: "No es favoritismo; es gestión de amenazas con interfaz y cuenta atrás.",
          weakness:
            "Confirmaste asistencia a clase después de recibir el recordatorio de entrega. Existe sello horario.",
          repair:
            "Sube algo antes del cierre y entra al aula virtual después. Que el registro vea arrepentimiento.",
        },
        {
          id: "es-estudios-archivo-v",
          conceptId: "estudios-archivo-rebelde",
          styles: ["hyperSpecific", "internet", "escalation"],
          signals: ["technology", "academicPressure"],
          modifierMode: "none",
          body: "el archivo abre, pero ha sustituido cuatro páginas por cuadrados y una fuente tipográfica que nadie convocó.",
          followUp:
            "El contenido sigue ahí en un sentido filosófico. En el sentido evaluable estamos negociando.",
          weakness:
            "Exportarlo a PDF resolvería el problema y alguien puede sugerirlo en menos de doce segundos.",
          repair: "Prueba esa solución antes de anunciar el colapso de la informática occidental.",
        },
        {
          id: "es-estudios-profesor-v",
          conceptId: "estudios-consulta-infinita",
          styles: ["bureaucratic", "hyperSpecific"],
          signals: ["academicPressure", "authorityFigure"],
          modifierMode: "none",
          body: "una consulta con secretaría ha pasado por tres correos, dos ventanillas y ninguna persona que admita conocer el procedimiento.",
          followUp:
            "Sigo el circuito oficial. El circuito oficial, por su parte, parece seguirme a mí.",
          weakness:
            "Secretaría tarda días en responder; afirmar eficiencia inmediata despierta sospechas académicas.",
          repair:
            "Conserva el correo real. Por una vez, la burocracia puede aportar pruebas a tu favor.",
        },
        {
          id: "es-estudios-honestidad-v",
          conceptId: "estudios-honestidad-academica",
          styles: ["radicalHonesty", "selfIncriminating"],
          signals: ["lowEnergy", "academicPressure"],
          modifierMode: "none",
          body: "calculé mal mi capacidad de estudiar, dormir y fingir que entendí la lectura; una de las tres actividades ha sido suspendida.",
          followUp: "He elegido dormir porque es la única que no admite recuperación en PDF.",
          weakness:
            "La sinceridad puede recibir comprensión o una charla sobre organización. Las cuotas están igualadas.",
          repair:
            "No digas que te pondrás al día: ponte al día y deja que el documento comparezca por ti.",
        },
      ],
      sin_retorno: [
        {
          id: "es-estudios-entrega-s",
          conceptId: "estudios-entrega-cruzada",
          styles: ["absurdAuthority", "bureaucratic", "escalation"],
          signals: ["academicPressure", "timingConflict"],
          modifierMode: "none",
          body: "el comité de plazos, compuesto por todas mis malas decisiones, ha sacrificado la clase de hoy para evitar una catástrofe evaluable a las 23:59.",
          followUp:
            "La votación fue unánime porque las decisiones sensatas no alcanzaron el quórum.",
          weakness:
            "La entrega pesa 10 %. Estás usando lenguaje de emergencia nacional para una décima parte de la nota.",
          repair:
            "Obtén al menos un 10 %. El tribunal exige que el melodrama produzca rendimiento.",
        },
        {
          id: "es-estudios-archivo-s",
          conceptId: "estudios-archivo-rebelde",
          styles: ["absurdAuthority", "internet", "hyperSpecific"],
          signals: ["technology", "academicPressure"],
          modifierMode: "none",
          body: "el documento ha adquirido autonomía: mueve las imágenes, renumera las páginas y cita fuentes que ninguno de los dos recuerda haber leído.",
          followUp:
            "He solicitado que deponga las armas y vuelva a formato académico antes del cierre.",
          weakness:
            "Google Docs registra que el documento estuvo intacto hasta que lo abriste hace once minutos.",
          repair:
            "Fuente: no la de los deseos. Revisa las referencias antes de continuar con esta defensa.",
        },
        {
          id: "es-estudios-profesor-s",
          conceptId: "estudios-consulta-infinita",
          styles: ["absurdAuthority", "bureaucratic"],
          signals: ["academicPressure", "authorityFigure"],
          modifierMode: "none",
          body: "secretaría ha elevado mi consulta a una instancia que todavía no existe, pero cuya respuesta resulta imprescindible para que yo cruce el campus.",
          followUp:
            "El expediente está en fase de ser asignado a alguien que conozca a alguien competente.",
          weakness: "Una institución real jamás describiría el trámite con tanta claridad.",
          repair:
            "Preséntate en la próxima clase con todo hecho. La excelencia súbita desalienta preguntas retrospectivas.",
        },
        {
          id: "es-estudios-honestidad-s",
          conceptId: "estudios-honestidad-academica",
          styles: ["radicalHonesty", "absurdAuthority", "selfIncriminating"],
          signals: ["lowEnergy", "academicPressure"],
          modifierMode: "none",
          body: "no voy a clase porque no preparé la clase, y el tribunal considera cruel obligar a dos partes a fingir sorpresa ante este hecho.",
          followUp:
            "Acepto la falta, la lectura pendiente y una cantidad proporcionada de vergüenza.",
          weakness:
            "Has transformado una ausencia en declaración oficial. El profesor podría apreciar la prosa más que el criterio.",
          repair: "Lee el material completo. La honestidad radical sin corrección es reincidencia.",
        },
      ],
    },
    familia: {
      prudente: [
        {
          id: "es-familia-partido-p",
          conceptId: "familia-partido-prohibido",
          styles: ["selfIncriminating", "deadpan"],
          signals: ["familyPressure", "birthday", "sports", "alreadyConfirmed"],
          modifierMode: "none",
          body: "necesito llegar más tarde al cumpleaños; tengo un compromiso de horario fijo que termina, sospechosamente, después del segundo tiempo.",
          followUp:
            "No intento desaparecer: solicito una incorporación diferida y prometo comparecer con postre.",
          weakness:
            "Ya confirmaste y el partido aparece en todos los calendarios desde agosto. La sorpresa carece de base jurídica.",
          repair:
            "Llega para la tarta y no mires resultados debajo de la mesa. Tu madre detecta ambas conductas.",
        },
        {
          id: "es-familia-grupo-p",
          conceptId: "familia-grupo-evidencia",
          styles: ["internet", "bureaucratic"],
          signals: ["familyPressure", "groupChatEvidence", "enthusiasticConfirmation"],
          modifierMode: "none",
          body: "la logística de hoy ha cambiado y no voy a llegar a la comida en el horario que confirmé.",
          followUp:
            "Aviso con margen para que la silla vacía sea reorganizada conforme al protocolo familiar.",
          weakness:
            "El grupo conserva tu «allí estaré» y dos stickers celebratorios. La fiscalía llama a esto documentación abundante.",
          repair:
            "Comunícalo por llamada, no por WhatsApp. Hay asuntos que no deben generar más capturas.",
        },
        {
          id: "es-familia-madre-p",
          conceptId: "familia-interrogatorio-materno",
          styles: ["hyperSpecific", "bureaucratic"],
          signals: ["familyPressure", "closeRelationship", "visibilityRisk"],
          modifierMode: "none",
          body: "necesito quedarme resolviendo una gestión doméstica y hoy no llego al encuentro familiar.",
          followUp:
            "Es aburrido, concreto y poco apto para sobremesa. Esa es toda la información disponible.",
          weakness:
            "Tu madre conoce la diferencia entre tu voz de gestión doméstica y tu voz de estar inventando sobre la marcha.",
          repair:
            "Ensaya una sola frase. Tu principal enemigo eres tú añadiendo anexos no solicitados.",
        },
        {
          id: "es-familia-honestidad-p",
          conceptId: "familia-honestidad-diplomatica",
          styles: ["radicalHonesty", "deadpan"],
          signals: ["familyPressure", "lowEnergy"],
          modifierMode: "none",
          body: "hoy no tengo energía para una reunión familiar y prefiero faltar antes que asistir con cara de recurso administrativo denegado.",
          followUp: "No ocurre nada grave. Precisamente intento conservar ese estado de cosas.",
          weakness:
            "La familia puede aceptar el cansancio, pero abrirá una investigación sobre por qué nunca te cansas para otros planes.",
          repair: "Haz una llamada breve y afectuosa. Breve es la parte jurídicamente importante.",
        },
      ],
      valiente: [
        {
          id: "es-familia-partido-v",
          conceptId: "familia-partido-prohibido",
          styles: ["selfIncriminating", "hyperSpecific", "escalation"],
          signals: ["familyPressure", "birthday", "sports", "alreadyConfirmed"],
          modifierMode: "none",
          body: "tengo un conflicto de horario absolutamente inmóvil y propongo incorporarme al cumpleaños cuando termine su segundo tiempo reglamentario.",
          followUp:
            "No diré qué compromiso es porque el tribunal considera que algunos datos solo empeoran una defensa correcta.",
          weakness:
            "Tu primo también ve el partido y comunicará el marcador al grupo. Hay un informante dentro de la familia.",
          repair:
            "Lleva el regalo y el postre. La jurisprudencia familiar reconoce el soborno cuando viene con velas.",
        },
        {
          id: "es-familia-grupo-v",
          conceptId: "familia-grupo-evidencia",
          styles: ["internet", "selfIncriminating", "hyperSpecific"],
          signals: ["familyPressure", "groupChatEvidence", "enthusiasticConfirmation"],
          modifierMode: "none",
          body: "debo retirar mi confirmación familiar, emitida con entusiasmo injustificable y sin la debida revisión de agenda.",
          followUp:
            "Reconozco el mensaje, los tres signos de exclamación y el emoji. Impugno únicamente mi criterio de aquel momento.",
          weakness:
            "El grupo de WhatsApp será considerado evidencia y tu tía ya hizo captura por motivos que nadie comprende.",
          repair:
            "No abandones el grupo. Convertirte en «salió» elevaría una falta leve a crisis constitucional.",
        },
        {
          id: "es-familia-madre-v",
          conceptId: "familia-interrogatorio-materno",
          styles: ["bureaucratic", "hyperSpecific", "selfIncriminating"],
          signals: ["familyPressure", "closeRelationship", "visibilityRisk"],
          modifierMode: "none",
          body: "una gestión doméstica requiere mi presencia y he decidido no someterla todavía al interrogatorio materno de primer grado.",
          followUp:
            "Está controlado. No, no puedo mandar foto. Sí, entiendo exactamente por qué esa respuesta empeora todo.",
          weakness:
            "Tu madre formulará cuatro preguntas seguidas y tú solo preparaste una respuesta y media.",
          repair:
            "Llama caminando por casa. La acústica doméstica puede ser admitida como prueba circunstancial.",
        },
        {
          id: "es-familia-honestidad-v",
          conceptId: "familia-honestidad-diplomatica",
          styles: ["radicalHonesty", "selfIncriminating"],
          signals: ["familyPressure", "lowEnergy"],
          modifierMode: "none",
          body: "confirmé cuando todavía creía que hoy querría socializar y solicito corregir esa declaración manifiestamente optimista.",
          followUp:
            "Os quiero mucho. Esa afirmación y mi ausencia pueden coexistir según doctrina reciente.",
          weakness:
            "La doctrina reciente fue redactada por ti hace treinta segundos. Fuente: de los deseos.",
          repair:
            "No conviertas el mensaje en ensayo. El afecto pierde credibilidad a partir del tercer párrafo.",
        },
      ],
      sin_retorno: [
        {
          id: "es-familia-partido-s",
          conceptId: "familia-partido-prohibido",
          styles: ["absurdAuthority", "selfIncriminating", "escalation"],
          signals: ["familyPressure", "birthday", "sports", "alreadyConfirmed"],
          modifierMode: "none",
          body: "solicito ausentarme del cumpleaños porque una final deportiva de interés nacional para mi sofá coincide íntegramente con el acto familiar.",
          followUp:
            "No alego fuerza mayor. Alego debilidad personal documentada y voluntad de asumir las consecuencias.",
          weakness:
            "La cumpleañera puede leer esto. El tribunal recomienda redactar testamento social antes de enviarlo.",
          repair:
            "Manda regalo, postre y felicitación antes del partido. Después, todo mensaje parecerá celebración del resultado equivocado.",
        },
        {
          id: "es-familia-grupo-s",
          conceptId: "familia-grupo-evidencia",
          styles: ["absurdAuthority", "internet", "escalation"],
          signals: ["familyPressure", "groupChatEvidence", "enthusiasticConfirmation"],
          modifierMode: "none",
          body: "revoco mi «de unaaa 🔥» por vicio del consentimiento: fue emitido bajo emoción momentánea y sin asesoría de calendario.",
          followUp:
            "Acepto que el emoji demuestra intención, pero niego que constituya capacidad logística.",
          weakness:
            "Hay captura, doble check y reacción de tu madre. El expediente tiene mejor archivo que muchas administraciones.",
          repair:
            "Silencia el grupo, no lo abras y bajo ninguna circunstancia escribas «¿qué me perdí?» esta noche.",
        },
        {
          id: "es-familia-madre-s",
          conceptId: "familia-interrogatorio-materno",
          styles: ["absurdAuthority", "hyperSpecific", "bureaucratic"],
          signals: ["familyPressure", "closeRelationship", "visibilityRisk"],
          modifierMode: "none",
          body: "he sometido mi ausencia a revisión materna y el procedimiento exige permanecer incomunicado hasta que disminuya el número de preguntas por minuto.",
          followUp:
            "La autoridad competente no aceptó la explicación inicial ni reconoce mi derecho a guardar silencio.",
          weakness:
            "La autoridad competente te crió y conoce todos tus precedentes, incluidos los que tú archivaste.",
          repair:
            "Confiesa una parte pequeña y verdadera. Los interrogatorios maternos detectan ficción ornamental.",
        },
        {
          id: "es-familia-honestidad-s",
          conceptId: "familia-honestidad-diplomatica",
          styles: ["radicalHonesty", "absurdAuthority", "deadpan"],
          signals: ["familyPressure", "lowEnergy"],
          modifierMode: "none",
          body: "no asistiré porque agoté mi presupuesto social y el Ministerio de Fingir Entusiasmo ha cerrado por insolvencia.",
          followUp:
            "No hay un motivo oculto. Hay sofá, silencio y una decisión que sorprendentemente sí consulté conmigo.",
          weakness:
            "La radical honestidad no evita que tu nombre aparezca en la sobremesa como punto extraordinario del día.",
          repair:
            "Acepta la condena, llama mañana y no publiques stories. No podemos enfatizar esto lo suficiente.",
        },
      ],
    },
    cita: {
      prudente: [
        {
          id: "es-cita-agenda-p",
          conceptId: "cita-agenda-defectuosa",
          styles: ["bureaucratic", "deadpan"],
          signals: ["romanticExpectation", "timingConflict", "alreadyConfirmed"],
          modifierMode: "none",
          body: "mi calendario ha encontrado un conflicto y prefiero mover nuestra cita antes de que sea la primera cosa que resolvemos juntos.",
          followUp: "Quiero verte; impugno únicamente la fecha, no el expediente completo.",
          weakness:
            "Aceptaste ayer. La defensa dispone de poco tiempo para explicar este súbito descubrimiento del calendario.",
          repair:
            "Propón día, hora y sitio en el mismo mensaje. Sin esos tres datos esto se clasificará como desaparición.",
        },
        {
          id: "es-cita-energia-p",
          conceptId: "cita-control-calidad",
          styles: ["radicalHonesty", "deadpan"],
          signals: ["romanticExpectation", "lowEnergy"],
          modifierMode: "none",
          body: "hoy no llego en mi mejor versión y prefiero no gastar nuestra cita en una representación de bajo presupuesto.",
          followUp:
            "No tiene que ver contigo. Mi departamento de conversación cerró antes de tiempo.",
          weakness:
            "La frase es razonable, adulta y por eso mismo sospechosamente revisada por tres asesores.",
          repair:
            "Escribe mañana antes de que te escriban. La iniciativa es la única prueba admisible de interés.",
        },
        {
          id: "es-cita-transporte-p",
          conceptId: "cita-transporte-adverso",
          styles: ["hyperSpecific", "deadpan"],
          signals: ["romanticExpectation", "transport", "timingConflict"],
          modifierMode: "none",
          body: "el trayecto se ha complicado y ya no puedo llegar a una hora compatible con una cita digna.",
          followUp:
            "Podría aparecer muy tarde, pero eso convertiría la cena en declaración de testigos.",
          weakness:
            "El mapa comparte tiempos estimados y no respalda tragedias superiores a veintidós minutos.",
          repair: "No falsifiques geografía. Reprograma y elige tú un sitio más cercano.",
        },
        {
          id: "es-cita-chat-p",
          conceptId: "cita-presencia-digital",
          styles: ["internet", "selfIncriminating"],
          signals: ["romanticExpectation", "socialMediaRisk", "visibilityRisk"],
          modifierMode: "none",
          body: "necesito mover el plan de hoy y prefiero avisarte con margen en vez de gestionar mal el silencio.",
          followUp:
            "No estoy desapareciendo. Estoy presentando una solicitud formal de segunda fecha.",
          weakness:
            "Tu estado «en línea» será vigilado con una precisión que ninguna institución pública ha alcanzado.",
          repair:
            "No subas stories. La libertad de publicación cede temporalmente ante la coherencia narrativa.",
        },
      ],
      valiente: [
        {
          id: "es-cita-agenda-v",
          conceptId: "cita-agenda-defectuosa",
          styles: ["bureaucratic", "selfIncriminating", "escalation"],
          signals: ["romanticExpectation", "timingConflict", "alreadyConfirmed"],
          modifierMode: "none",
          body: "mi calendario ha encontrado una obligación previa que permanecía oculta detrás de mi entusiasmo por aceptar.",
          followUp:
            "Reconozco que confirmé demasiado rápido. Solicito que se valore la confesión espontánea.",
          weakness:
            "«Me hacía ilusión» no borra el sello horario ni mejora tus competencias de agenda.",
          repair:
            "Reserva tú el nuevo sitio. El tribunal acepta reservas como prueba material de buenas intenciones.",
        },
        {
          id: "es-cita-energia-v",
          conceptId: "cita-control-calidad",
          styles: ["radicalHonesty", "selfIncriminating"],
          signals: ["romanticExpectation", "lowEnergy"],
          modifierMode: "none",
          body: "hoy solo podría ofrecer presencia física y respuestas de una sílaba, y ninguna de las dos supera el control de calidad romántico.",
          followUp:
            "Prefiero aplazarlo a obligarte a entrevistar a una persona mirando su propio vaso.",
          weakness:
            "Podrían apreciar la honestidad o asumir falta de interés. El tribunal registra un empate técnico.",
          repair: "Incluye un plan concreto que demuestre que estás cansado, no evaporándote.",
        },
        {
          id: "es-cita-transporte-v",
          conceptId: "cita-transporte-adverso",
          styles: ["hyperSpecific", "bureaucratic"],
          signals: ["romanticExpectation", "transport", "timingConflict"],
          modifierMode: "none",
          body: "el transporte ha convertido un trayecto de treinta minutos en una audiencia sin hora estimada de cierre.",
          followUp:
            "Llevo catorce minutos viendo el mismo semáforo. Ya tenemos una relación más estable que la movilidad urbana.",
          weakness:
            "La ubicación compartida resolvería el caso, pero también puede revelar que sigues en casa.",
          repair:
            "No ofrezcas ubicación si no estás dispuesto a producirla. Reprograma antes de que te la soliciten.",
        },
        {
          id: "es-cita-chat-v",
          conceptId: "cita-presencia-digital",
          styles: ["internet", "selfIncriminating", "hyperSpecific"],
          signals: ["romanticExpectation", "socialMediaRisk", "visibilityRisk"],
          modifierMode: "none",
          body: "solicito mover la cita antes de que mi indicador de escritura produzca una explicación más larga y menos creíble.",
          followUp: "He borrado tres versiones. Esta es la que sobrevivió al comité de dignidad.",
          weakness:
            "La otra persona vio «escribiendo…» durante cuatro minutos. Ya sabe que esto pasó por gabinete de crisis.",
          repair:
            "Envía la nueva fecha y deja el teléfono. Cada mensaje adicional es una declaración no asesorada.",
        },
      ],
      sin_retorno: [
        {
          id: "es-cita-agenda-s",
          conceptId: "cita-agenda-defectuosa",
          styles: ["absurdAuthority", "bureaucratic", "escalation"],
          signals: ["romanticExpectation", "timingConflict", "alreadyConfirmed"],
          modifierMode: "none",
          body: "solicito la nulidad de mi confirmación: fue emitida por una versión de mí sin acceso completo al calendario ni representación legal.",
          followUp: "No niego el interés; niego la competencia administrativa del firmante.",
          weakness: "El firmante eras tú ayer y parecía peligrosamente contento con el plan.",
          repair:
            "Reagenda dentro de siete días. Más tarde se presumirá caducado el interés, figura no apelable.",
        },
        {
          id: "es-cita-energia-s",
          conceptId: "cita-control-calidad",
          styles: ["radicalHonesty", "absurdAuthority", "deadpan"],
          signals: ["romanticExpectation", "lowEnergy"],
          modifierMode: "none",
          body: "no tengo una emergencia; sencillamente agoté hoy mi inventario de personalidad y no deseo servir producto incompleto.",
          followUp: "Queda simpatía en almacén, pero conversación no repone hasta mañana.",
          weakness:
            "Es memorable, aunque existe una posibilidad real de que te convierta en anécdota del próximo grupo de amigas.",
          repair:
            "Acepta el riesgo y propón una cita excelente. Has elegido competir en dificultad avanzada.",
        },
        {
          id: "es-cita-transporte-s",
          conceptId: "cita-transporte-adverso",
          styles: ["absurdAuthority", "hyperSpecific", "escalation"],
          signals: ["romanticExpectation", "transport", "timingConflict"],
          modifierMode: "none",
          body: "el sistema de transporte me ha declarado persona no trasladable hasta nuevo aviso y dos aplicaciones discrepan sobre mi existencia.",
          followUp:
            "Una dice que llego en nueve minutos; la otra recomienda que haga noche aquí. He recusado a ambas.",
          weakness:
            "Sigues conectado al wifi de casa. Ese pequeño icono ejerce funciones notariales.",
          repair:
            "No conviertas un retraso en saga. Di la verdad o pide otra fecha antes del siguiente capítulo.",
        },
        {
          id: "es-cita-chat-s",
          conceptId: "cita-presencia-digital",
          styles: ["internet", "absurdAuthority", "selfIncriminating"],
          signals: ["romanticExpectation", "socialMediaRisk", "visibilityRisk"],
          modifierMode: "none",
          body: "hoy debo cancelar y entrar en un período de silencio digital para proteger la integridad de esta coartada.",
          followUp:
            "No es ghosting si existe notificación administrativa previa y propuesta de nueva fecha.",
          weakness:
            "Dar like accidentalmente durante el silencio equivale a comparecer en el lugar del delito.",
          repair: "Activa modo avión. Tu pulgar no está autorizado para gestionar este expediente.",
        },
      ],
    },
    amigos: {
      prudente: [
        {
          id: "es-amigos-p1",
          conceptId: "amigos-logistica-grupal",
          styles: ["internet", "bureaucratic"],
          signals: ["groupChatEvidence", "alreadyConfirmed"],
          body: "hoy no llego al plan; aviso con tiempo para que la reserva no tenga que declarar una silla desaparecida.",
          followUp: "Nada grave. Id sin mí y presentad un acta deliberadamente incompleta.",
          weakness: "El grupo conserva tu «voy sí o sí». Francamente, nos has complicado el caso.",
          repair:
            "Paga la primera ronda del próximo plan. El tribunal reconoce la reparación líquida.",
        },
        {
          id: "es-amigos-p2",
          body: "he agotado hoy mi presupuesto social y prefiero no acudir en modalidad cuerpo presente, personalidad ausente.",
          followUp: "Todo bien. El servicio de conversación reabre mañana en horario habitual.",
          weakness: "Tu última conexión a las 02:13 invalidaría la teoría del descanso preventivo.",
          repair: "Propón el siguiente plan con sitio y hora. La iniciativa limpia antecedentes.",
        },
      ],
      valiente: [
        {
          id: "es-amigos-v1",
          conceptId: "amigos-logistica-grupal",
          styles: ["hyperSpecific", "bureaucratic"],
          signals: ["groupChatEvidence", "visibilityRisk"],
          body: "una incidencia doméstica exige presencia física y una vigilancia que el resto de convivientes ha rechazado por mayoría.",
          followUp:
            "Es largo de explicar y sale peor parado si lo cuento por mensaje. Guardadme la versión de los hechos.",
          weakness:
            "Alguien del grupo vive cerca y acaba de escribir «si quieres me paso». La coartada ha desarrollado auditoría externa.",
          repair:
            "Declina la visita sin añadir detalles. Cada palabra nueva constituye otra oportunidad de incriminarte.",
        },
      ],
      sin_retorno: [
        {
          id: "es-amigos-s1",
          conceptId: "amigos-logistica-grupal",
          styles: ["absurdAuthority", "internet", "escalation"],
          signals: ["groupChatEvidence", "visibilityRisk"],
          body: "estoy retenido por un asunto vecinal que ya ha involucrado a dos plantas, un grupo de mensajes y una persona que se ha autoproclamado coordinadora.",
          followUp:
            "No puedo abandonar ahora sin perder posición en la negociación. Es más serio de lo que suena y más ridículo de lo que parece.",
          weakness: "El relato es tan bueno que exigirán el desenlace la semana que viene.",
          repair: "No prometas un desenlace. El tribunal ya tiene suficientes temporadas abiertas.",
        },
      ],
    },
    ejercicio: {
      prudente: [
        {
          id: "es-ejercicio-p1",
          conceptId: "ejercicio-disponibilidad-fisica",
          styles: ["deadpan", "bureaucratic"],
          signals: ["lowEnergy"],
          body: "hoy no llego al entrenamiento; mi agenda ha ejercido el derecho de admisión antes que el gimnasio.",
          followUp: "Nada físico, solo planificación defectuosa. Recupero la sesión esta semana.",
          weakness:
            "Tu historial de sesiones «recuperadas» contiene exactamente cero sesiones recuperadas.",
          repair: "Fija ahora el día de recuperación. En voz alta y delante de testigos.",
        },
      ],
      valiente: [
        {
          id: "es-ejercicio-v1",
          conceptId: "ejercicio-disponibilidad-fisica",
          styles: ["hyperSpecific", "selfIncriminating"],
          signals: ["lowEnergy"],
          body: "mi disponibilidad física ha emitido un informe desfavorable y recomienda suspender la sesión de hoy.",
          followUp:
            "No es lesión; es una discrepancia profunda entre el entrenamiento previsto y mis ganas verificadas.",
          weakness:
            "El informe fue redactado por ti desde el sofá y no supera una auditoría básica.",
          repair:
            "Vuelve el próximo día antes que nadie. La puntualidad confunde al comité técnico.",
        },
      ],
      sin_retorno: [
        {
          id: "es-ejercicio-s1",
          conceptId: "ejercicio-disponibilidad-fisica",
          styles: ["absurdAuthority", "bureaucratic", "escalation"],
          signals: ["lowEnergy"],
          body: "el Ministerio de Actividad Física ha clausurado temporalmente mis piernas por falta manifiesta de cooperación.",
          followUp:
            "La orden la firmé yo, pero también soy la máxima autoridad disponible en este cuerpo.",
          weakness: "Tus piernas aparecen funcionando en una story subida hace siete minutos.",
          repair:
            "Archiva el recurso, deja el teléfono y acepta que mañana habrá sentadillas con agravantes.",
        },
      ],
    },
    favor: {
      prudente: [
        {
          id: "es-favor-p1",
          conceptId: "favor-deuda-reprogramada",
          styles: ["bureaucratic", "deadpan"],
          signals: ["favorDebt", "timingConflict"],
          body: "hoy no puedo cumplir el favor, pero solicito reprogramar la deuda en una fecha concreta y cercana.",
          followUp: "No estoy cancelando la obligación; estoy refinanciando mi dignidad.",
          weakness:
            "Es la segunda refinanciación y la agencia de calificación ya usa la palabra «basura».",
          repair: "Ofrece tú el día y añade comida. Los intereses de demora son comestibles.",
        },
        {
          id: "es-favor-p2",
          body: "no llego a la mudanza y prefiero declararlo antes de que alguien reserve una caja especialmente pesada con mi nombre.",
          followUp:
            "Sigo disponible para la fase posterior, incluida esa estantería que todos fingen no haber visto.",
          weakness:
            "Los favores llevan contabilidad y tu cuenta acaba de recibir otra comisión de mantenimiento.",
          repair:
            "Aparece mañana con desayuno y herramientas. No preguntes qué queda; queda todo lo malo.",
        },
      ],
      valiente: [
        {
          id: "es-favor-v1",
          conceptId: "favor-deuda-reprogramada",
          styles: ["hyperSpecific", "selfIncriminating"],
          signals: ["favorDebt", "transport"],
          body: "una resolución doméstica me deja sin coche y sin margen, las dos aportaciones que el favor esperaba de mí.",
          followUp:
            "Estoy intentando resolverlo, pero depende de gente que no responde los sábados.",
          weakness:
            "Te vieron conducir ayer y alguien conserva un audio donde ofrecías llevar cajas. Hay prueba material y entusiasmo grabado.",
          repair:
            "Compensa con transporte pagado o una tarde completa. Las disculpas no suben sofás.",
        },
      ],
      sin_retorno: [
        {
          id: "es-favor-s1",
          conceptId: "favor-deuda-reprogramada",
          styles: ["absurdAuthority", "bureaucratic", "escalation"],
          signals: ["favorDebt", "timingConflict"],
          body: "estoy bloqueado por una gestión que empezó con un formulario, continuó con una llamada y terminó con alguien pidiéndome que espere una confirmación que nadie sabe quién emite.",
          followUp:
            "En cuanto alguien reconozca la responsabilidad, me libero. Podría ser hoy o podría ser en marzo.",
          weakness:
            "El trámite empezó exactamente a la hora de cargar el sofá. Hasta la burocracia considera sospechosa la coincidencia.",
          repair:
            "Devuelve el favor duplicado y sin recordatorio. La deuda ya genera intereses y comentarios.",
        },
      ],
    },
    inconfesable: {
      prudente: [
        {
          id: "es-inconf-p1",
          conceptId: "inconfesable-materia-reservada",
          styles: ["deadpan", "bureaucratic"],
          body: "hoy no voy a poder y solicito que el motivo permanezca bajo reserva administrativa.",
          followUp:
            "Nada preocupante. Solo información que empeora al convertirse en conversación.",
          weakness:
            "Declarar algo «reservado» activa inmediatamente el departamento humano de hacer preguntas.",
          repair:
            "No añadas detalles. El misterio ya está trabajando horas extra sin autorización.",
        },
      ],
      valiente: [
        {
          id: "es-inconf-v1",
          conceptId: "inconfesable-materia-reservada",
          styles: ["bureaucratic", "hyperSpecific"],
          body: "un compromiso previo ha solicitado confidencialidad y, por razones estratégicas, he decidido concedérsela.",
          followUp:
            "No es grave. Es una de esas cosas que pierden toda defensa al llegar a la segunda frase.",
          weakness:
            "Has invocado confidencialidad para un plan social. La curiosidad acaba de solicitar acceso al expediente.",
          repair:
            "Responde una vez y guarda silencio. Dos preguntas exceden la resistencia estructural del relato.",
        },
      ],
      sin_retorno: [
        {
          id: "es-inconf-s1",
          conceptId: "inconfesable-materia-reservada",
          styles: ["absurdAuthority", "bureaucratic", "escalation"],
          body: "me encuentro atendiendo un asunto clasificado por mí mismo como reservado, y la institución que lo gestiona soy yo, lo que complica cualquier apelación.",
          followUp:
            "Puedo confirmar que existe. No puedo confirmar nada más. Agradezco la comprensión.",
          weakness:
            "La autoridad que clasificó el asunto, revisó la apelación y destruyó el acta eres tú en tres pestañas distintas.",
          repair:
            "Invita tú la próxima vez y no vuelvas a decir «clasificado» fuera de una película.",
        },
      ],
    },
  },
};

export default es;
