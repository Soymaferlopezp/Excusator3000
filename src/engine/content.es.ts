import type { LocaleContent } from "./types";

const q = (
  id: string,
  text: string,
  options: [string, number][],
): { id: string; text: string; options: { id: string; label: string; risk: number }[] } => ({
  id,
  text,
  options: options.map(([label, risk], i) => ({ id: `${id}-${i}`, label, risk })),
});

const confirmado = q("confirmado", "¿Ya cometiste el error de confirmar asistencia?", [
  ["No. Todavía soy legalmente libre.", -8],
  ["Sí, pero sin entusiasmo probatorio.", 4],
  ["Sí. Con emojis. Mi caso es grave.", 12],
]);

const ubicacion = q("ubicacion", "¿Pueden comprobar fácilmente dónde estás?", [
  ["Difícilmente.", -6],
  ["Probablemente.", 6],
  ["Sí. Cometí errores tecnológicos.", 14],
]);

const historial = q("historial", "¿Esta persona conoce tus excusas anteriores?", [
  ["Es nuestra primera vez.", -5],
  ["Sospecha algo, pero no tiene pruebas.", 6],
  ["Lleva un registro. Con fechas.", 13],
]);

const tiempo = q("tiempo", "¿Cuánto tiempo necesitas desaparecer?", [
  ["Un par de horas.", -4],
  ["La tarde entera.", 5],
  ["Preferiría no volver a hablar del tema.", 10],
]);

const fecha = q("fecha", "¿Aceptarías ofrecer una fecha alternativa?", [
  ["Sí, y pienso cumplirla.", -10],
  ["Sí, en un futuro impreciso.", 2],
  ["No. Esa puerta debe cerrarse.", 9],
]);

const gravedad = q("gravedad", "¿Qué tan grave sería una cancelación de último minuto?", [
  ["Nadie lo notaría.", -7],
  ["Habría comentarios.", 5],
  ["Se mencionaría durante años.", 12],
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
  ],
  deliberation: [
    "Revisando precedentes cuestionables…",
    "Consultando al Departamento de Consecuencias…",
    "Calculando margen de arrepentimiento…",
    "Eliminando contradicciones evidentes…",
    "Añadiendo una cantidad prudente de drama…",
    "Buscando una salida jurídicamente creativa…",
    "Evaluando daños a su reputación…",
    "Ignorando recomendaciones de sentido común…",
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
  credibilityNote: {
    sospechosa: "",
    razonable: " Te aviso en cuanto se aclare.",
    impecable:
      " Ya reorganicé lo demás para que esto no afecte a nada más, así que solo queda esto pendiente.",
  },
  riskStatus: {
    low: "RAZONABLEMENTE CREÍBLE",
    mid: "MODERADAMENTE SOSPECHOSO",
    high: "ESTRUCTURALMENTE FRÁGIL",
    extreme: "INDEFENDIBLE ANTE CUALQUIER TRIBUNAL",
  },
  refusal: {
    title: "El tribunal carece de jurisdicción para falsificar evidencia.",
    body: "Podemos autorizar una cancelación honesta o una solicitud de extensión.",
  },
  excuses: {
    trabajo: {
      prudente: [
        {
          id: "es-trabajo-p1",
          body: "me ha surgido un asunto personal que tengo que resolver hoy sí o sí y no voy a poder estar presente.",
          followUp:
            "Nada grave, papeleo doméstico que solo puedo hacer en horario laboral. Mañana estoy operativo.",
          weakness: "Aparecer conectado en el chat interno arruinaría el argumento.",
          repair: "Envía por escrito lo que ibas a decir en la reunión antes de que alguien lo pida.",
        },
        {
          id: "es-trabajo-p2",
          body: "tengo un tema en casa que requiere que esté localizable aquí durante la mañana, así que no llego a la reunión.",
          followUp: "Un asunto del edificio, nada dramático. Prefiero no dejarlo a medias.",
          weakness: "Cualquier foto tuya fuera de casa cerraría el caso en segundos.",
          repair: "Ofrece resumir tú mismo el acta para compensar la ausencia.",
        },
      ],
      valiente: [
        {
          id: "es-trabajo-v1",
          body: "tengo una situación doméstica que exige supervisión inmediata y preferiría no explicar por qué hay un técnico, una escalera y dos vecinos implicados.",
          followUp:
            "Está controlado, pero si me alejo diez minutos vuelve a estar descontrolado. Te cuento cuando deje de ser ridículo.",
          weakness: "Si preguntan por el nombre del técnico, no tienes uno preparado.",
          repair: "Propón tú la nueva hora antes de que la propongan por ti.",
        },
      ],
      sin_retorno: [
        {
          id: "es-trabajo-s1",
          body: "la administración del edificio me ha pedido permanecer disponible mientras revisan un incidente que, por recomendación de todas las partes, todavía no describiremos con detalle.",
          followUp:
            "No puedo entrar en detalles porque hay una versión oficial en preparación. Cuando se cierre el asunto lo comentamos.",
          weakness: "Una sola pregunta concreta sobre el incidente derrumba toda la estructura.",
          repair: "Aparece mañana especialmente puntual y con algo resuelto de más.",
        },
      ],
    },
    estudios: {
      prudente: [
        {
          id: "es-estudios-p1",
          body: "se me ha complicado el día con un tema que tenía pendiente y no voy a poder ir a clase hoy.",
          followUp: "Nada importante, gestiones que se me acumularon. Recupero los apuntes esta noche.",
          weakness: "Un compañero puede confirmar que ayer no tenías nada pendiente.",
          repair: "Pide los apuntes tú primero, así parece interés y no huida.",
        },
        {
          id: "es-estudios-p2",
          body: "tengo un problema con la entrega de otra asignatura que se me ha comido el día entero.",
          followUp: "Es cuestión de horas, pero justo coinciden con la sesión de hoy.",
          weakness: "La fecha real de esa otra entrega es públicamente consultable.",
          repair: "Manda tu parte del trabajo antes de que nadie la reclame.",
        },
      ],
      valiente: [
        {
          id: "es-estudios-v1",
          body: "he tenido un contratiempo con el ordenador y todo lo que necesitaba está en un archivo que ahora mismo se niega a existir.",
          followUp:
            "Estoy intentando recuperarlo. Prefiero no describir el procedimiento porque incluye reiniciar cosas que no debería reiniciar.",
          weakness: "Cualquier documento enviado hoy desde ese mismo ordenador te delata.",
          repair: "Entrega algo antes del plazo, aunque sea a medias, para sostener la versión.",
        },
      ],
      sin_retorno: [
        {
          id: "es-estudios-s1",
          body: "estoy atrapado en un procedimiento administrativo con la secretaría del centro que, según me han explicado tres personas distintas, aún no tiene un responsable asignado.",
          followUp:
            "Sigo esperando a que alguien reconozca competencia sobre el expediente. En cuanto haya un nombre, avanzo.",
          weakness: "Nadie ha visto jamás a la secretaría responder tan rápido como para justificarlo.",
          repair: "Preséntate en la siguiente sesión con el trabajo hecho y sin mencionar el tema.",
        },
      ],
    },
    familia: {
      prudente: [
        {
          id: "es-familia-p1",
          body: "me ha surgido un problema en casa que necesito resolver antes de que empeore y voy a tener que bajarme del plan de hoy.",
          followUp:
            "Nada grave, pero lo bastante incómodo como para tenerme aquí un rato. Después te cuento cuando deje de ser ridículo.",
          weakness: "Publicar historias desde otro lugar destruiría la defensa en unos ocho segundos.",
          repair: "Propón una nueva fecha antes de que la víctima tenga tiempo de reconsiderar la relación.",
        },
        {
          id: "es-familia-p2",
          body: "se me ha juntado todo hoy y no llego a la comida; prefiero avisar ahora y no cancelar a mitad de camino.",
          followUp: "Cosas de logística doméstica. Aburridísimo, pero inaplazable.",
          weakness: "El resto de la familia comparará versiones en menos de una hora.",
          repair: "Llama por teléfono durante la sobremesa. Reduce la condena a la mitad.",
        },
      ],
      valiente: [
        {
          id: "es-familia-v1",
          body: "tengo una situación doméstica que requiere supervisión constante y preferiría no explicar por qué hay una aspiradora, un cubo y una decisión cuestionable implicados.",
          followUp:
            "Está bajo control en un sentido muy amplio de la palabra. Prometo contarlo entero cuando pueda hacerlo sin quedar mal.",
          weakness: "Un familiar curioso pedirá foto. Y tú no tienes foto.",
          repair: "Ofrécete a organizar tú el próximo encuentro. Los tribunales valoran la iniciativa.",
        },
      ],
      sin_retorno: [
        {
          id: "es-familia-s1",
          body: "la comunidad del edificio me ha pedido permanecer disponible mientras se aclara un incidente que, por recomendación de todas las partes, todavía no describiremos como “el asunto del ascensor”.",
          followUp:
            "Hay versiones contradictorias y he decidido no aportar la mía hasta que alguien tenga razón. Prefiero no comprometerme por escrito.",
          weakness: "Si alguien conoce a alguien de tu edificio, esto termina hoy.",
          repair: "Aparece el próximo domingo con postre y sin explicaciones adicionales.",
        },
      ],
    },
    cita: {
      prudente: [
        {
          id: "es-cita-p1",
          body: "me ha surgido algo que no puedo mover y prefiero avisarte ahora en vez de aparecer con la cabeza en otro sitio.",
          followUp: "Un tema personal, nada dramático. Me apetece verte, pero hoy no sería justo.",
          weakness: "Estar en línea toda la noche contradice el tono de urgencia.",
          repair: "Propón día y hora concretos en el mismo mensaje. Sin fecha, esto es una huida.",
        },
        {
          id: "es-cita-p2",
          body: "hoy no llego bien y prefiero no gastar nuestra primera cena en mi peor versión.",
          followUp: "Solo es un día raro. Nada que tenga que ver contigo, prometido.",
          weakness: "La frase es tan correcta que suena ensayada.",
          repair: "Escribe al día siguiente sin que te escriban primero.",
        },
      ],
      valiente: [
        {
          id: "es-cita-v1",
          body: "se me ha complicado la tarde de una manera que todavía estoy intentando entender, y prefiero cancelar antes que llegar tarde y con explicaciones peores.",
          followUp:
            "Te lo cuento en persona porque por mensaje suena inventado y no quiero empezar así.",
          weakness: "Prometer contarlo en persona te obliga a inventar una segunda parte.",
          repair: "Reserva tú el sitio para el nuevo día. Compensa mucho.",
        },
      ],
      sin_retorno: [
        {
          id: "es-cita-s1",
          body: "hoy tengo que quedarme resolviendo un asunto que empezó siendo pequeño, pasó por tres personas y ahora tiene grupo de mensajes propio.",
          followUp:
            "Cuando termine te enseño las capturas, aunque para entonces habrá perdido toda la gracia.",
          weakness: "Ofrecer capturas que no existen es un riesgo procesal evidente.",
          repair: "Llega diez minutos antes a la próxima. Sin excepción.",
        },
      ],
    },
    amigos: {
      prudente: [
        {
          id: "es-amigos-p1",
          body: "me ha surgido un tema en casa y hoy me bajo del plan; aviso ahora para que no contéis conmigo en la reserva.",
          followUp: "Nada serio, solo mal timing. Id sin mí y contádmelo todo mal luego.",
          weakness: "El grupo tiene memoria colectiva y capturas.",
          repair: "Paga tú la primera ronda del próximo plan sin que te lo pidan.",
        },
        {
          id: "es-amigos-p2",
          body: "llevo un día que no aguanto ni yo, así que prefiero no ir y no arrastrar la fiesta conmigo.",
          followUp: "Todo bien, solo cansancio acumulado. Mañana vuelvo a ser una persona.",
          weakness: "Cualquier actividad tuya después de medianoche invalida el argumento.",
          repair: "Propón tú el plan de la semana que viene, con sitio y hora.",
        },
      ],
      valiente: [
        {
          id: "es-amigos-v1",
          body: "tengo una situación en casa que exige presencia física y una vigilancia que nadie más quiere asumir.",
          followUp:
            "Es largo de explicar y sale peor parado si lo cuento por mensaje. Guardadme la versión de los hechos.",
          weakness: "Alguien del grupo vive cerca y puede pasarse a comprobarlo.",
          repair: "Aparece al final del plan aunque sea media hora. Cambia toda la percepción.",
        },
      ],
      sin_retorno: [
        {
          id: "es-amigos-s1",
          body: "estoy retenido por un asunto vecinal que ya ha involucrado a dos plantas, un grupo de mensajes y una persona que se ha autoproclamado coordinadora.",
          followUp:
            "No puedo abandonar ahora sin perder posición en la negociación. Es más serio de lo que suena y más ridículo de lo que parece.",
          weakness: "El relato es tan bueno que exigirán el desenlace la semana que viene.",
          repair: "Trae el desenlace inventado ya cerrado y coherente. O confiesa con estilo.",
        },
      ],
    },
    ejercicio: {
      prudente: [
        {
          id: "es-ejercicio-p1",
          body: "hoy no llego al entrenamiento; me ha surgido algo y prefiero no aparecer a medias.",
          followUp: "Nada roto, solo agenda. Recupero la sesión en la semana.",
          weakness: "Tu historial de sesiones recuperadas no respalda esta afirmación.",
          repair: "Fija tú mismo el día de recuperación. En voz alta.",
        },
      ],
      valiente: [
        {
          id: "es-ejercicio-v1",
          body: "arrastro una molestia desde el último entrenamiento y he decidido no empeorarla justo antes de un plan que ya tengo comprometido.",
          followUp: "Prefiero perder una sesión ahora que tres la semana que viene.",
          weakness: "Nadie recuerda que te quejaras durante el último entrenamiento.",
          repair: "Vuelve el próximo día sin quejarte ni una vez.",
        },
      ],
      sin_retorno: [
        {
          id: "es-ejercicio-s1",
          body: "he consultado mi propia disponibilidad física y el informe interno recomienda no presentarme hoy bajo ninguna circunstancia.",
          followUp:
            "El informe es de elaboración propia, pero es el único disponible y por tanto vinculante.",
          weakness: "Reconocer que el informe es tuyo destruye su valor probatorio.",
          repair: "Preséntate el próximo día antes que nadie y sin decir nada.",
        },
      ],
    },
    favor: {
      prudente: [
        {
          id: "es-favor-p1",
          body: "no voy a poder echarte una mano hoy; se me ha cruzado un tema que no puedo mover.",
          followUp: "Sigo apuntado al favor, solo que no en esta fecha. No me he escapado.",
          weakness: "Es la segunda vez que “se te cruza un tema” con este mismo favor.",
          repair: "Ofrece un día concreto tú mismo, y que sea pronto.",
        },
        {
          id: "es-favor-p2",
          body: "hoy me es imposible ayudarte con la mudanza, y prefiero decirlo ahora que fallar a media tarde.",
          followUp: "Cuenta conmigo para lo siguiente, incluso para lo pesado.",
          weakness: "Los favores tienen contabilidad y la tuya está en números rojos.",
          repair: "Aparece sin avisar el día siguiente a ayudar con lo que quede.",
        },
      ],
      valiente: [
        {
          id: "es-favor-v1",
          body: "tengo un asunto en casa que me deja sin coche y sin margen, que son exactamente las dos cosas que hacían falta hoy.",
          followUp:
            "Estoy intentando resolverlo, pero depende de gente que no responde los sábados.",
          weakness: "Te han visto conducir esta misma semana.",
          repair: "Compensa con algo tangible: comida, transporte o una tarde entera.",
        },
      ],
      sin_retorno: [
        {
          id: "es-favor-s1",
          body: "estoy bloqueado por una gestión que empezó con un formulario, continuó con una llamada y terminó con alguien pidiéndome que espere una confirmación que nadie sabe quién emite.",
          followUp:
            "En cuanto alguien reconozca la responsabilidad, me libero. Podría ser hoy o podría ser en marzo.",
          weakness: "Nadie cree en trámites que ocurren precisamente el día del favor.",
          repair: "Devuelve el favor duplicado y sin que te lo recuerden.",
        },
      ],
    },
    inconfesable: {
      prudente: [
        {
          id: "es-inconf-p1",
          body: "hoy no voy a poder; tengo un asunto personal que prefiero no detallar y que no admite espera.",
          followUp: "Nada preocupante. Solo mío. Lo entenderás si algún día lo cuento.",
          weakness: "El misterio invita a preguntar exactamente lo que no quieres responder.",
          repair: "No des más detalles después. Los añadidos siempre delatan.",
        },
      ],
      valiente: [
        {
          id: "es-inconf-v1",
          body: "tengo un compromiso previo que no puedo mover y que, por respeto a todas las partes, prefiero no describir.",
          followUp: "No es nada malo. Es simplemente incómodo de explicar en dos frases.",
          weakness: "Cuanto más formal suena, más curiosidad genera.",
          repair: "Ofrece disponibilidad total la próxima vez. Sin condiciones.",
        },
      ],
      sin_retorno: [
        {
          id: "es-inconf-s1",
          body: "me encuentro atendiendo un asunto clasificado por mí mismo como reservado, y la institución que lo gestiona soy yo, lo que complica cualquier apelación.",
          followUp:
            "Puedo confirmar que existe. No puedo confirmar nada más. Agradezco la comprensión.",
          weakness: "Este nivel de teatro solo funciona con público generoso.",
          repair: "Invita tú la próxima vez y no vuelvas a usar la palabra “clasificado”.",
        },
      ],
    },
  },
};

export default es;
