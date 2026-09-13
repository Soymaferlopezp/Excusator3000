import type { Category, Locale, ScenarioIntent } from "@/engine/types";

export interface ScenarioIntentOption {
  id: ScenarioIntent;
  label: string;
}

interface ScenarioIntentDefinition extends ScenarioIntentOption {
  conceptIds: readonly string[];
}

const defineIntent = (
  id: ScenarioIntent,
  label: string,
  ...conceptIds: string[]
): ScenarioIntentDefinition => ({ id, label, conceptIds });

const INTENTS: Record<Locale, Record<Category, readonly ScenarioIntentDefinition[]>> = {
  en: {
    familia: [
      defineIntent(
        "family-gathering",
        "Skip Sunday lunch with the family",
        "familia-01-skipping-sunday-lunch-with-the-family",
      ),
      defineIntent(
        "family-relationship-questions",
        "Escape questions about dating or marriage",
        "familia-02-the-aunt-asking-when-you-will-date-or-get-married",
      ),
      defineIntent(
        "family-errand",
        "Get out of shopping with your mother",
        "familia-03-going-shopping-with-your-mother-on-saturday-morning",
      ),
      defineIntent(
        "family-debate",
        "Avoid a relative's political or sports debate",
        "familia-04-the-uncle-who-turns-dessert-into-a-political-or-sports-debate",
      ),
      defineIntent(
        "family-money-favor",
        "Avoid lending money to a relative",
        "familia-05-lending-a-relative-money-until-next-week",
      ),
      defineIntent(
        "family-surprise-visitors",
        "Escape surprise relatives arriving with luggage",
        "familia-06-surprise-relatives-arriving-with-luggage",
      ),
      defineIntent(
        "family-comparison-pressure",
        "Deflect comparisons with the perfect cousin",
        "familia-07-being-compared-with-the-perfect-cousin",
      ),
      defineIntent(
        "family-free-professional-work",
        "Decline free professional work for a relative",
        "familia-08-the-relative-requesting-free-professional-work",
      ),
    ],
    amigos: [
      defineIntent(
        "friends-cancel-confirmed",
        "Cancel after saying you are definitely coming",
        "amigos-01-saying-you-are-definitely-coming-and-never-showing-up",
      ),
      defineIntent(
        "friends-group-plan",
        "Escape a group chat that cannot choose a plan",
        "amigos-02-the-group-chat-where-nobody-chooses-a-place-and-the-plan-dies",
      ),
      defineIntent(
        "friends-split-bill",
        "Avoid splitting the bill evenly",
        "amigos-03-splitting-the-check-evenly-after-ordering-only-water",
      ),
    ],
    trabajo: [
      defineIntent(
        "work-quick-call",
        "Avoid an unscheduled quick call",
        "trabajo-01-the-unscheduled-quick-call-on-teams-or-slack",
      ),
      defineIntent(
        "work-friday-request",
        "Escape a Friday 4:55 p.m. request",
        "trabajo-02-the-boss-s-4-55-p-m-friday-message-asking-for-a-quick-look",
      ),
      defineIntent(
        "work-camera-off",
        "Keep the camera off in a company-wide meeting",
        "trabajo-03-keeping-the-camera-off-during-the-company-wide-meeting",
      ),
      defineIntent(
        "work-presentation",
        "Survive a presentation you barely prepared",
        "trabajo-04-presenting-slides-opened-three-minutes-before-the-meeting",
      ),
      defineIntent(
        "work-focus-block",
        "Protect a deep-work calendar block",
        "trabajo-05-reserving-a-public-calendar-block-for-deep-work",
      ),
      defineIntent(
        "work-career-question",
        "Avoid the five-year career question",
        "trabajo-06-the-hr-performance-review-and-the-five-year-question",
      ),
      defineIntent(
        "work-deadline-extension",
        "Request a deadline extension",
        "trabajo-07-requesting-a-deadline-extension-due-to-technical-complexity",
      ),
      defineIntent(
        "work-corporate-jargon",
        "Fill a content gap with corporate jargon",
        "trabajo-08-using-corporate-jargon-to-fill-content-gaps",
      ),
    ],
    estudios: [
      defineIntent(
        "studies-late-submission",
        "Explain a submission at 11:59 p.m.",
        "estudios-01-submitting-an-assignment-at-11-59-p-m",
      ),
      defineIntent(
        "studies-group-project",
        "Handle a group project where everyone disappeared",
        "estudios-02-the-group-project-where-everyone-else-disappeared",
      ),
      defineIntent(
        "studies-presentation",
        "Present seminar slides you have never seen",
        "estudios-03-presenting-seminar-slides-you-had-never-seen-before",
      ),
      defineIntent(
        "studies-cram",
        "Learn six months of material in four hours",
        "estudios-04-learning-six-months-of-material-in-four-hours",
      ),
      defineIntent(
        "studies-final-points",
        "Ask for the final 0.2 points",
        "estudios-05-asking-the-professor-for-the-final-0-2-points",
      ),
      defineIntent(
        "studies-early-class",
        "Avoid a 7:00 a.m. class in winter rain",
        "estudios-06-attending-a-7-00-a-m-class-in-winter-rain",
      ),
      defineIntent(
        "studies-teaching-assistant",
        "Deal with a teaching assistant who knows less",
        "estudios-07-the-teaching-assistant-who-knows-less-than-the-students",
      ),
      defineIntent(
        "studies-blank-exam",
        "Leave a blank exam early to catch the bus",
        "estudios-08-submitting-a-blank-exam-after-ten-minutes-to-catch-the-bus",
      ),
    ],
    cita: [
      defineIntent(
        "dating-cancel-waiting",
        "Cancel when the other person is already waiting",
        "cita-01-canceling-after-the-other-person-is-already-waiting",
      ),
      defineIntent(
        "dating-cancel-second-date",
        "Cancel a second date after no chemistry",
        "cita-02-canceling-the-second-date-after-no-chemistry-on-the-first",
      ),
      defineIntent(
        "dating-back-out-before-leaving",
        "Back out twenty minutes before leaving",
        "cita-03-regretting-the-plan-20-minutes-before-leaving",
      ),
      defineIntent(
        "dating-red-flag",
        "Cancel after finding a red flag online",
        "cita-04-finding-a-giant-red-flag-online-ten-minutes-before-the-date",
      ),
    ],
  },
  es: {
    familia: [
      defineIntent(
        "family-gathering",
        "Escapar de una reunión o cumpleaños familiar",
        "familia-01-escapar-de-la-reunion-familiar-del-domingo-master",
        "familia-09-la-fiesta-de-cumpleanos-de-un-primo-lejano-master",
      ),
      defineIntent(
        "family-relationship-questions",
        "Evitar preguntas sobre pareja o matrimonio",
        "familia-02-la-tia-pregunta-y-la-pareja-o-el-matrimonio-para-cuando",
      ),
      defineIntent(
        "family-errand",
        "Evitar compras o trámites con tu madre",
        "familia-03-acompanar-a-la-madre-a-hacer-compras-el-sabado-por-la-manana",
        "familia-13-acompanar-a-tu-mama-a-hacer-tramites-en-el-centro-master",
      ),
      defineIntent(
        "family-debate",
        "Evitar debates familiares de política o religión",
        "familia-04-el-tio-que-insiste-en-debatir-politica-o-deportes-durante-el-postre",
        "familia-10-responder-en-el-grupo-familiar-sobre-politica-o-religion-master",
      ),
      defineIntent(
        "family-money-favor",
        "Evitar prestar dinero a un pariente",
        "familia-05-prestar-dinero-a-un-pariente-para-la-semana-master",
      ),
      defineIntent(
        "family-surprise-visitors",
        "Escapar de familiares que llegan con equipaje",
        "familia-06-la-visita-sorpresa-de-unos-tios-que-llegan-con-equipaje-master",
      ),
      defineIntent(
        "family-comparison-pressure",
        "Frenar comparaciones con el primo perfecto",
        "familia-07-el-primo-perfecto-que-la-madre-usa-como-comparacion-constante",
      ),
      defineIntent(
        "family-free-professional-work",
        "Rechazar trabajo profesional gratis para un pariente",
        "familia-08-el-pariente-que-pide-habilidades-profesionales-gratis",
      ),
      defineIntent(
        "family-childcare",
        "Evitar cuidar a los sobrinos",
        "familia-11-cuidar-a-los-sobrinos-un-sabado-por-la-noche-master",
      ),
      defineIntent(
        "family-vacation-planning",
        "Evitar la planificación de vacaciones familiares",
        "familia-12-ir-a-la-reunion-de-planificacion-de-las-vacaciones-familiares-master",
      ),
    ],
    amigos: [
      defineIntent(
        "friends-cancel-confirmed",
        "Cancelar después de confirmar asistencia",
        "amigos-01-confirmar-asistencia-y-no-aparecer",
      ),
      defineIntent(
        "friends-group-plan",
        "Salir de un grupo que no decide el plan",
        "amigos-02-el-grupo-donde-nadie-decide-el-lugar-y-el-plan-muere-master",
      ),
      defineIntent(
        "friends-split-bill",
        "Evitar dividir la cuenta en partes iguales",
        "amigos-03-dividir-la-cuenta-en-partes-iguales-cuando-solo-pediste-agua",
      ),
      defineIntent(
        "friends-cannot-afford",
        "Cancelar una salida por falta de dinero",
        "amigos-04-no-tener-dinero-para-salir-de-fiesta-master",
      ),
      defineIntent(
        "friends-sunday-party",
        "Evitar salir un domingo",
        "amigos-05-salir-un-domingo-y-enfrentar-el-lunes-con-resaca-master",
      ),
      defineIntent(
        "friends-moving-help",
        "Evitar ayudar en una mudanza",
        "amigos-06-ayudar-a-un-amigo-a-mudarse-un-sabado-por-la-manana-master",
      ),
      defineIntent(
        "friends-pending-payment",
        "Explicar una transferencia pendiente",
        "amigos-07-pagar-una-cuenta-o-reserva-que-quedaste-en-transferir-master",
      ),
      defineIntent(
        "friends-gym",
        "Faltar al entrenamiento o al gimnasio",
        "amigos-08-faltar-al-entrenamiento-personal-o-al-gimnasio-master",
      ),
      defineIntent(
        "friends-loan-item",
        "Evitar prestar el automóvil o una herramienta",
        "amigos-09-prestar-el-automovil-o-una-herramienta-a-un-conocido-master",
      ),
      defineIntent(
        "friends-noisy-bar",
        "Evitar un bar ruidoso por la noche",
        "amigos-10-salir-a-un-bar-ruidoso-a-las-10-00-p-m-master",
      ),
      defineIntent(
        "friends-host-visitor",
        "Evitar alojar a un amigo",
        "amigos-11-alojar-a-un-amigo-de-otra-ciudad-en-un-departamento-pequeno-master",
      ),
      defineIntent(
        "friends-sports-event",
        "Evitar un evento deportivo que no te interesa",
        "amigos-12-ir-a-un-evento-deportivo-que-no-te-interesa-master",
      ),
      defineIntent(
        "friends-weekend-trip",
        "Cancelar un viaje improvisado de fin de semana",
        "amigos-13-unirte-a-un-viaje-de-fin-de-semana-planeado-a-ultima-hora-master",
      ),
      defineIntent(
        "friends-designated-driver",
        "Evitar ser el conductor designado",
        "amigos-14-ser-el-conductor-designado-de-la-noche-master",
      ),
    ],
    trabajo: [
      defineIntent(
        "work-quick-call",
        "Esquivar una llamada rápida sin agendar",
        "trabajo-01-esquivar-una-quick-call-sin-agendar-en-teams-o-slack",
        "trabajo-17-la-quick-call-de-5-minutos",
      ),
      defineIntent(
        "work-friday-request",
        "Evitar una petición del viernes a las 4:55",
        "trabajo-02-mensaje-del-jefe-el-viernes-a-las-4-55-pm-puedes-ver-esto-rapidito",
        "trabajo-19-correo-prioritario-de-viernes-a-las-4-55-pm",
      ),
      defineIntent(
        "work-camera-off",
        "Mantener la cámara apagada",
        "trabajo-03-mantener-la-camara-apagada-en-la-reunion-general",
        "trabajo-20-camara-apagada-en-reunion-de-todo-el-equipo",
      ),
      defineIntent(
        "work-presentation",
        "Sobrevivir una presentación que apenas preparaste",
        "trabajo-04-no-dominar-las-slides-que-abriste-tres-minutos-antes",
      ),
      defineIntent(
        "work-focus-block",
        "Proteger un bloque de concentración",
        "trabajo-05-rechazar-una-reunion-dentro-de-tu-bloque-de-foco",
      ),
      defineIntent(
        "work-career-question",
        "Evitar la pregunta sobre los próximos cinco años",
        "trabajo-06-evitar-responder-como-te-ves-en-cinco-anos",
      ),
      defineIntent(
        "work-deadline-extension",
        "Pedir una extensión por complejidad técnica",
        "trabajo-07-pedir-una-extension-por-complejidad-tecnica",
      ),
      defineIntent(
        "work-corporate-jargon",
        "Responder con jerga corporativa",
        "trabajo-08-no-tener-una-respuesta-concreta-y-recurrir-a-jerga-corporativa",
      ),
      defineIntent(
        "work-report-deadline",
        "Explicar un reporte entregado tarde",
        "trabajo-09-no-entregar-el-reporte-a-tiempo",
        "trabajo-16-no-entregar-el-reporte-a-tiempo",
        "trabajo-18-entregar-el-reporte-de-metricas-a-ultima-hora",
      ),
      defineIntent(
        "work-hr-training",
        "Evitar una capacitación obligatoria",
        "trabajo-10-evitar-la-capacitacion-obligatoria-de-recursos-humanos",
        "trabajo-22-asistir-a-la-capacitacion-obligatoria-de-recursos-humanos",
      ),
      defineIntent(
        "work-team-lunch",
        "Evitar un almuerzo de equipo",
        "trabajo-11-evitar-el-almuerzo-de-trabajo-para-hacer-equipo",
        "trabajo-23-el-almuerzo-de-trabajo-para-hacer-equipo",
      ),
      defineIntent(
        "work-unwanted-project",
        "Evitar un proyecto que nadie quiere",
        "trabajo-12-no-hacerse-cargo-del-proyecto-que-nadie-quiere",
        "trabajo-24-hacerse-cargo-de-un-proyecto-que-nadie-quiere",
      ),
      defineIntent(
        "work-monday-late",
        "Explicar una llegada tarde el lunes",
        "trabajo-13-llegar-tarde-a-la-primera-reunion-del-lunes",
        "trabajo-25-llegar-tarde-a-la-primera-reunion-del-lunes",
      ),
      defineIntent(
        "work-after-hours-message",
        "Evitar responder al jefe fuera de horario",
        "trabajo-14-no-responder-el-mensaje-del-jefe-a-las-8-00-pm",
        "trabajo-26-responder-un-mensaje-de-slack-del-jefe-a-las-8-00-pm",
      ),
      defineIntent(
        "work-storm-office",
        "Evitar ir a la oficina durante una tormenta",
        "trabajo-15-no-ir-presencial-a-la-oficina-durante-una-tormenta",
        "trabajo-21-ir-presencial-a-la-oficina-un-dia-de-tormenta-lluvia",
      ),
    ],
    estudios: [
      defineIntent(
        "studies-late-submission",
        "Explicar una entrega al límite de las 23:59",
        "estudios-01-entrega-de-trabajo-academico-a-las-23-59-en-el-limite-del-sistema",
      ),
      defineIntent(
        "studies-group-project",
        "Resolver un trabajo grupal donde todos desaparecieron",
        "estudios-02-trabajo-en-grupo-donde-solo-tu-trabajaste-y-los-demas-desaparecieron",
      ),
      defineIntent(
        "studies-presentation",
        "Presentar diapositivas que nunca habías visto",
        "estudios-03-presentacion-de-seminario-improvisando-slides-que-nunca-viste-antes",
      ),
      defineIntent(
        "studies-cram",
        "Aprender seis meses de materia en cuatro horas",
        "estudios-04-aprenderse-6-meses-de-materia-en-4-horas-la-madrugada-anterior-con-cafe-cargado",
      ),
      defineIntent(
        "studies-final-points",
        "Pedir los últimos 0.2 puntos",
        "estudios-05-pedir-punto-de-gracia-al-docente-al-final-del-semestre-falta-solo-0-2",
      ),
      defineIntent(
        "studies-early-class",
        "Evitar una clase a las 7:00 con lluvia",
        "estudios-06-clase-presencial-a-las-7-00-am-en-pleno-invierno-y-con-lluvia-fuerte",
      ),
      defineIntent(
        "studies-teaching-assistant",
        "Lidiar con un profesor que sabe menos",
        "estudios-07-el-profesor-de-la-materia-que-sabe-menos-sobre-el-tema-que-los-propios-alumnos",
      ),
      defineIntent(
        "studies-blank-exam",
        "Entregar un examen en blanco para tomar el autobús",
        "estudios-08-entregar-el-examen-presencial-en-blanco-a-los-10-minutos-para-no-perder-el-autobus",
      ),
    ],
    cita: [
      defineIntent(
        "dating-cancel-waiting",
        "Cancelar cuando la otra persona ya está esperando",
        "cita-01-cancelar-cuando-la-otra-persona-ya-esta-esperando-master",
      ),
      defineIntent(
        "dating-cancel-second-date",
        "Cancelar una segunda cita sin química",
        "cita-02-cancelar-la-segunda-cita-porque-no-hubo-quimica-master",
      ),
      defineIntent(
        "dating-back-out-before-leaving",
        "Arrepentirte veinte minutos antes de salir",
        "cita-03-arrepentimiento-instantaneo-veinte-minutos-antes-de-salir-master",
      ),
      defineIntent(
        "dating-red-flag",
        "Cancelar después de descubrir una alerta roja",
        "cita-04-descubrir-una-alerta-roja-en-redes-sociales-antes-de-salir-master",
      ),
      defineIntent(
        "dating-logistics",
        "Salir de una cita con logística imposible",
        "cita-05-la-logistica-de-la-cita-es-demasiado-complicada-master",
      ),
      defineIntent(
        "dating-outdoor-activity",
        "Evitar una cita de senderismo o ejercicio",
        "cita-06-la-persona-propone-una-cita-de-senderismo-o-ejercicio-al-aire-libre-master",
      ),
      defineIntent(
        "dating-forgot-date",
        "Explicar que olvidaste por completo la cita",
        "cita-07-olvidar-por-completo-la-cita-y-seguir-en-ropa-de-casa-master",
      ),
      defineIntent(
        "dating-double-date",
        "Evitar una cita doble con amistades pesadas",
        "cita-08-cita-doble-con-los-amigos-pesados-de-la-otra-persona-master",
      ),
      defineIntent(
        "dating-expensive-restaurant",
        "Evitar un restaurante demasiado costoso",
        "cita-09-la-cita-exige-un-restaurante-absurdamente-costoso-master",
      ),
      defineIntent(
        "dating-phone-calls",
        "Evitar llamadas antes de verse",
        "cita-10-la-persona-insiste-en-hacer-llamadas-antes-de-verse-master",
      ),
      defineIntent(
        "dating-app-message",
        "Evitar responder un mensaje extravagante",
        "cita-11-no-responder-un-piropo-extravagante-en-una-aplicacion-de-citas",
      ),
    ],
  },
};

export function getScenarioIntentOptions(
  locale: Locale,
  category: Category,
): readonly ScenarioIntentOption[] {
  return INTENTS[locale][category].map(({ id, label }) => ({ id, label }));
}

export function isScenarioIntentValid(
  locale: Locale,
  category: Category,
  intent: ScenarioIntent | null,
): intent is ScenarioIntent {
  return Boolean(intent && INTENTS[locale][category].some((option) => option.id === intent));
}

export function conceptMatchesScenarioIntent(
  locale: Locale,
  category: Category,
  conceptId: string | undefined,
  intent: ScenarioIntent,
): boolean {
  if (!conceptId) return false;
  const definition = INTENTS[locale][category].find((option) => option.id === intent);
  return definition?.conceptIds.includes(conceptId) ?? false;
}

export function getMappedConceptIds(locale: Locale, category: Category): readonly string[] {
  return INTENTS[locale][category].flatMap((intent) => intent.conceptIds);
}
