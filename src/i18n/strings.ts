import type { Audacity, Locale } from "@/engine/types";

export interface UIStrings {
  brandSubtitle: string;
  nav: { theme: string; language: string; sound: string };
  home: {
    kicker: string;
    title: string;
    subtitle: string;
    cta: string;
    secondary: string;
    micro: string;
    dossier: {
      file: string;
      accusedLabel: string;
      accused: string;
      offenceLabel: string;
      offence: string;
      riskLabel: string;
      risk: string;
      statusLabel: string;
      status: string;
      stamp: string;
    };
  };
  category: { title: string; subtitle: string; cta: string; empty: string };
  config: {
    title: string;
    subtitle: string;
    credibility: string;
    credibilityHelp: string;
    drama: string;
    dramaHelp: string;
    audacity: string;
    audacityHelp: string;
    relationship: string;
    relationshipHelp: string;
    indexTitle: string;
    indexCredibility: string;
    indexDrama: string;
    indexAudacity: string;
    cta: string;
  };
  options: {
    credibility: Record<"sospechosa" | "razonable" | "impecable", string>;
    drama: Record<"seco" | "cinematografico" | "telenovela", string>;
    audacity: Record<"prudente" | "valiente" | "sin_retorno", string>;
    relationship: Record<"formal" | "cercana" | "confianza", string>;
  };
  interrogation: {
    label: string;
    question: string;
    registered: string;
    contextTitle: string;
    contextLabel: string;
    contextPlaceholder: string;
    contextWarning: string;
    cta: string;
    back: string;
  };
  deliberation: { skip: string; stamp: string; session: string };
  verdict: {
    tribunal: string;
    file: string;
    resolution: string;
    authorizedExcuse: string;
    followUp: string;
    risk: string;
    riskDisclaimer: string;
    weakness: string;
    repair: string;
    copy: string;
    copied: string;
    copyError: string;
    variant: string;
    increaseAudacity: string;
    defyTribunal: string;
    maxWarning: string;
    share: string;
    newCase: string;
    audacityLabel: string;
    stamps: Record<Audacity, string[]>;
    escalation: Record<"valiente" | "sin_retorno", string[]>;
    variantTransition: string[];
    limitReached: string;
    refusalStamp: string;
  };
  share: {
    title: string;
    caseLabel: string;
    categoryLabel: string;
    audacityLabel: string;
    verdictLabel: string;
    excuseLabel: string;
    riskLabel: string;
    close: string;
    share: string;
    download: string;
    shared: string;
    downloaded: string;
    copiedText: string;
    shareError: string;
    tagline: string;
    punchlines: string[];
  };
  common: { back: string; step: string };
}

const es: UIStrings = {
  brandSubtitle: "Oficina de Excusas Improbables",
  nav: { theme: "Cambiar tema", language: "Idioma", sound: "Sonido" },
  home: {
    kicker: "Departamento E3K · Admisión de casos",
    title: "Toda gran excusa merece un juicio justo.",
    subtitle:
      "Presenta el compromiso del que quieres escapar. Evaluaremos los hechos, tu nivel de descaro y las posibilidades reales de salir impune.",
    cta: "Presentar mi caso",
    secondary: "Sorpréndeme",
    micro: "No garantizamos absolución.",
    dossier: {
      file: "Expediente",
      accusedLabel: "Acusado",
      accused: "Persona que aceptó planes demasiado rápido",
      offenceLabel: "Delito",
      offence: "Compromiso social de dudoso entusiasmo",
      riskLabel: "Riesgo",
      risk: "Moderadamente preocupante",
      statusLabel: "Estado",
      status: "Pendiente de coartada",
      stamp: "Caso admitido",
    },
  },
  category: {
    title: "¿De qué estás intentando escapar?",
    subtitle: "El tribunal necesita clasificar correctamente su mala decisión.",
    cta: "Continuar",
    empty: "El expediente está sospechosamente vacío.",
  },
  config: {
    title: "Calibremos la defensa.",
    subtitle: "Una mala excusa puede ser peor que presentarse.",
    credibility: "Credibilidad",
    credibilityHelp: "¿Cuánto debería sobrevivir esta historia al contacto con la realidad?",
    drama: "Drama",
    dramaHelp: "Cantidad legalmente tolerable de dramatismo.",
    audacity: "Descaro",
    audacityHelp: "Determina cuánto está dispuesto a arriesgar su reputación.",
    relationship: "Relación con la víctima",
    relationshipHelp: "Ajusta el tono de la comunicación oficial.",
    indexTitle: "Índice provisional",
    indexCredibility: "Credibilidad",
    indexDrama: "Drama",
    indexAudacity: "Descaro",
    cta: "Solicitar interrogatorio",
  },
  options: {
    credibility: { sospechosa: "Sospechosa", razonable: "Razonable", impecable: "Impecable" },
    drama: { seco: "Seco", cinematografico: "Cinematográfico", telenovela: "Telenovela" },
    audacity: { prudente: "Prudente", valiente: "Valiente", sin_retorno: "Sin retorno" },
    relationship: { formal: "Formal", cercana: "Cercana", confianza: "Demasiada confianza" },
  },
  interrogation: {
    label: "Interrogatorio preliminar",
    question: "Pregunta",
    registered: "Declaración incorporada al expediente",
    contextTitle: "Anexo voluntario",
    contextLabel: "¿Algo más que el tribunal deba saber?",
    contextPlaceholder: "Ej.: confirmé una cena familiar y descubrí que juega mi equipo…",
    contextWarning:
      "No incluyas nombres ni información sensible. El tribunal ya tiene suficientes problemas.",
    cta: "Solicitar deliberación",
    back: "Volver",
  },
  deliberation: {
    skip: "Saltar deliberación",
    stamp: "Caso resuelto",
    session: "Sesión reservada del tribunal",
  },
  verdict: {
    tribunal: "Tribunal de Compromisos Sociales",
    file: "Expediente",
    resolution: "Resolución definitiva",
    authorizedExcuse: "Excusa autorizada",
    followUp: "Si preguntan “¿pero qué pasó?”",
    risk: "Riesgo de descubrimiento",
    riskDisclaimer: "Porcentaje orientativo emitido por el Departamento de Cálculos Convenientes.",
    weakness: "Evidencia en tu contra",
    repair: "Instrucciones del tribunal",
    copy: "Copiar excusa",
    copied: "Copia certificada. Niega haber estado aquí.",
    copyError:
      "El sistema judicial ha perdido el expediente detrás de un archivador. Intenta de nuevo.",
    variant: "Generar variante",
    increaseAudacity: "Aumentar descaro",
    defyTribunal: "Desafiar al tribunal",
    maxWarning: "La institución declina toda responsabilidad reputacional.",
    share: "Compartir expediente",
    newCase: "Nuevo caso",
    audacityLabel: "Descaro",
    stamps: {
      prudente: ["Caso admitido", "Defensa autorizada", "Procedimiento regular"],
      valiente: ["Prudencia revocada", "Apelación concedida", "Criterio flexibilizado"],
      sin_retorno: [
        "Bajo su responsabilidad",
        "Jurisprudencia dudosa",
        "No consta en actas",
        "Supervisión revocada",
      ],
    },
    escalation: {
      valiente: [
        "Reabriendo expediente por falta de prudencia…",
        "Solicitando criterios sospechosamente flexibles…",
      ],
      sin_retorno: [
        "Prudencia revocada. Retirando supervisión adulta…",
        "Elevando el caso a una autoridad que no existe…",
        "Archivando las últimas objeciones sensatas…",
      ],
    },
    variantTransition: [
      "Solicitando una segunda versión de los hechos…",
      "Reasignando el expediente a otro funcionario…",
      "Buscando una coartada con distinta jurisprudencia…",
      "Consultando una versión convenientemente alternativa…",
    ],
    limitReached: "Límite institucional alcanzado",
    refusalStamp: "Expediente inadmisible",
  },
  share: {
    title: "Extracto público del expediente",
    caseLabel: "Expediente",
    categoryLabel: "Categoría",
    audacityLabel: "Descaro",
    verdictLabel: "Dictamen",
    excuseLabel: "Excusa autorizada",
    riskLabel: "Riesgo de descubrimiento",
    close: "Cerrar",
    share: "Compartir",
    download: "Descargar imagen",
    shared: "Expediente puesto en circulación.",
    downloaded: "Copia del expediente sustraída correctamente.",
    copiedText: "Documento comprometedor incorporado al portapapeles.",
    shareError: "El archivo se resistió a salir del tribunal. Intenta de nuevo.",
    tagline: "No garantizamos absolución.",
    punchlines: [
      "Fuente: de los deseos.",
      "Fuente: de los deseos.",
      "Documento no verificado por ninguna autoridad competente.",
      "Validez jurídica: ninguna.",
      "Departamento de Cálculos Convenientes.",
    ],
  },
  common: { back: "Volver", step: "Etapa" },
};

const en: UIStrings = {
  brandSubtitle: "Office of Improbable Excuses",
  nav: { theme: "Toggle theme", language: "Language", sound: "Sound" },
  home: {
    kicker: "Department E3K · Case intake",
    title: "Every great excuse deserves a fair trial.",
    subtitle:
      "Submit the commitment you want to escape. We will assess the facts, your level of nerve and your real chances of getting away with it.",
    cta: "Submit my case",
    secondary: "Surprise me",
    micro: "Acquittal not guaranteed.",
    dossier: {
      file: "Case file",
      accusedLabel: "Accused",
      accused: "Person who accepted plans far too quickly",
      offenceLabel: "Offence",
      offence: "Social commitment of questionable enthusiasm",
      riskLabel: "Risk",
      risk: "Moderately concerning",
      statusLabel: "Status",
      status: "Awaiting alibi",
      stamp: "Case admitted",
    },
  },
  category: {
    title: "What are you trying to escape?",
    subtitle: "The tribunal must correctly classify your poor decision.",
    cta: "Continue",
    empty: "The file is suspiciously empty.",
  },
  config: {
    title: "Let us calibrate the defence.",
    subtitle: "A bad excuse can be worse than showing up.",
    credibility: "Credibility",
    credibilityHelp: "How well should this story survive contact with reality?",
    drama: "Drama",
    dramaHelp: "Legally tolerable amount of theatrics.",
    audacity: "Nerve",
    audacityHelp: "Determines how much of your reputation you are willing to risk.",
    relationship: "Relationship with the victim",
    relationshipHelp: "Sets the tone of the official communication.",
    indexTitle: "Provisional index",
    indexCredibility: "Credibility",
    indexDrama: "Drama",
    indexAudacity: "Nerve",
    cta: "Request interrogation",
  },
  options: {
    credibility: { sospechosa: "Suspicious", razonable: "Reasonable", impecable: "Impeccable" },
    drama: { seco: "Dry", cinematografico: "Cinematic", telenovela: "Soap opera" },
    audacity: { prudente: "Prudent", valiente: "Bold", sin_retorno: "No return" },
    relationship: { formal: "Formal", cercana: "Close", confianza: "Far too comfortable" },
  },
  interrogation: {
    label: "Preliminary interrogation",
    question: "Question",
    registered: "Statement entered into the case file",
    contextTitle: "Voluntary appendix",
    contextLabel: "Additional context, should you wish to incriminate yourself",
    contextPlaceholder: "E.g. I confirmed a family dinner and then found out my team plays…",
    contextWarning: "The tribunal advises against incriminating yourself with full names.",
    cta: "Request deliberation",
    back: "Back",
  },
  deliberation: {
    skip: "Skip deliberation",
    stamp: "Case resolved",
    session: "Closed session of the tribunal",
  },
  verdict: {
    tribunal: "Tribunal of Social Commitments",
    file: "Case file",
    resolution: "Final ruling",
    authorizedExcuse: "Authorised excuse",
    followUp: "If they ask “but what happened?”",
    risk: "Discovery risk",
    riskDisclaimer: "Ceremonial figure. The tribunal does not practise real statistics.",
    weakness: "Weakest point of the case",
    repair: "Recommended reparation",
    copy: "Copy excuse",
    copied: "Excuse committed to clipboard. Deny you were ever here.",
    copyError: "The judicial system lost the file behind a cabinet. Try again.",
    variant: "Generate variant",
    increaseAudacity: "Increase nerve",
    defyTribunal: "Defy the tribunal",
    maxWarning: "The institution declines all reputational responsibility.",
    share: "Share case file",
    newCase: "New case",
    audacityLabel: "Nerve",
    stamps: {
      prudente: ["Final ruling"],
      valiente: ["Final ruling"],
      sin_retorno: ["Final ruling"],
    },
    escalation: {
      valiente: ["Reopening the file with reduced caution…"],
      sin_retorno: ["Escalating beyond institutional supervision…"],
    },
    variantTransition: [
      "Requesting a second version of events…",
      "Reassigning the file to another clerk…",
    ],
    limitReached: "Institutional limit reached",
    refusalStamp: "File inadmissible",
  },
  share: {
    title: "Public case extract",
    caseLabel: "Case file",
    categoryLabel: "Category",
    audacityLabel: "Nerve",
    verdictLabel: "Ruling",
    excuseLabel: "Authorised excuse",
    riskLabel: "Discovery risk",
    close: "Close",
    share: "Share",
    download: "Download image",
    shared: "Case file placed into circulation.",
    downloaded: "Case-file copy successfully removed.",
    copiedText: "Compromising document copied to the clipboard.",
    shareError: "The file refused to leave the tribunal. Try again.",
    tagline: "Acquittal not guaranteed.",
    punchlines: [
      "Source: wishful thinking.",
      "Source: wishful thinking.",
      "Not verified by any competent authority.",
      "Legal validity: none.",
    ],
  },
  common: { back: "Back", step: "Stage" },
};

const pt: UIStrings = {
  brandSubtitle: "Escritório de Desculpas Improváveis",
  nav: { theme: "Alternar tema", language: "Idioma", sound: "Som" },
  home: {
    kicker: "Departamento E3K · Admissão de casos",
    title: "Toda grande desculpa merece um julgamento justo.",
    subtitle:
      "Apresente o compromisso do qual quer escapar. Avaliaremos os fatos, seu nível de ousadia e as chances reais de sair impune.",
    cta: "Apresentar meu caso",
    secondary: "Surpreenda-me",
    micro: "Não garantimos absolvição.",
    dossier: {
      file: "Processo",
      accusedLabel: "Acusado",
      accused: "Pessoa que aceitou planos rápido demais",
      offenceLabel: "Delito",
      offence: "Compromisso social de entusiasmo duvidoso",
      riskLabel: "Risco",
      risk: "Moderadamente preocupante",
      statusLabel: "Situação",
      status: "Pendente de álibi",
      stamp: "Caso admitido",
    },
  },
  category: {
    title: "Do que você está tentando escapar?",
    subtitle: "O tribunal precisa classificar corretamente sua má decisão.",
    cta: "Continuar",
    empty: "O processo está suspeitosamente vazio.",
  },
  config: {
    title: "Vamos calibrar a defesa.",
    subtitle: "Uma desculpa ruim pode ser pior do que comparecer.",
    credibility: "Credibilidade",
    credibilityHelp: "Quanto essa história deve sobreviver ao contato com a realidade?",
    drama: "Drama",
    dramaHelp: "Quantidade legalmente tolerável de dramaticidade.",
    audacity: "Ousadia",
    audacityHelp: "Determina quanto da sua reputação você aceita arriscar.",
    relationship: "Relação com a vítima",
    relationshipHelp: "Ajusta o tom da comunicação oficial.",
    indexTitle: "Índice provisório",
    indexCredibility: "Credibilidade",
    indexDrama: "Drama",
    indexAudacity: "Ousadia",
    cta: "Solicitar interrogatório",
  },
  options: {
    credibility: { sospechosa: "Suspeita", razonable: "Razoável", impecable: "Impecável" },
    drama: { seco: "Seco", cinematografico: "Cinematográfico", telenovela: "Novela" },
    audacity: { prudente: "Prudente", valiente: "Corajosa", sin_retorno: "Sem volta" },
    relationship: { formal: "Formal", cercana: "Próxima", confianza: "Intimidade excessiva" },
  },
  interrogation: {
    label: "Interrogatório preliminar",
    question: "Pergunta",
    registered: "Declaração incorporada ao processo",
    contextTitle: "Anexo voluntário",
    contextLabel: "Contexto adicional, caso queira se incriminar",
    contextPlaceholder: "Ex.: confirmei um jantar de família e descobri que meu time joga…",
    contextWarning: "O tribunal recomenda não se incriminar com nomes completos.",
    cta: "Solicitar deliberação",
    back: "Voltar",
  },
  deliberation: {
    skip: "Pular deliberação",
    stamp: "Caso resolvido",
    session: "Sessão reservada do tribunal",
  },
  verdict: {
    tribunal: "Tribunal de Compromissos Sociais",
    file: "Processo",
    resolution: "Resolução definitiva",
    authorizedExcuse: "Desculpa autorizada",
    followUp: "Se perguntarem “mas o que aconteceu?”",
    risk: "Risco de descoberta",
    riskDisclaimer: "Número cerimonial. O tribunal não pratica estatística real.",
    weakness: "Ponto fraco do caso",
    repair: "Reparação recomendada",
    copy: "Copiar desculpa",
    copied: "Desculpa incorporada à área de transferência. Negue ter estado aqui.",
    copyError: "O sistema judicial perdeu o processo atrás de um arquivo. Tente de novo.",
    variant: "Gerar variante",
    increaseAudacity: "Aumentar ousadia",
    defyTribunal: "Desafiar o tribunal",
    maxWarning: "A instituição declina toda responsabilidade reputacional.",
    share: "Compartilhar processo",
    newCase: "Novo caso",
    audacityLabel: "Ousadia",
    stamps: {
      prudente: ["Resolução definitiva"],
      valiente: ["Resolução definitiva"],
      sin_retorno: ["Resolução definitiva"],
    },
    escalation: {
      valiente: ["Reabrindo o processo com menos prudência…"],
      sin_retorno: ["Elevando o caso além da supervisão institucional…"],
    },
    variantTransition: [
      "Solicitando uma segunda versão dos fatos…",
      "Reatribuindo o processo a outro funcionário…",
    ],
    limitReached: "Limite institucional alcançado",
    refusalStamp: "Processo inadmissível",
  },
  share: {
    title: "Extrato público do processo",
    caseLabel: "Processo",
    categoryLabel: "Categoria",
    audacityLabel: "Ousadia",
    verdictLabel: "Decisão",
    excuseLabel: "Desculpa autorizada",
    riskLabel: "Risco de descoberta",
    close: "Fechar",
    share: "Compartilhar",
    download: "Baixar imagem",
    shared: "Processo colocado em circulação.",
    downloaded: "Cópia do processo retirada com sucesso.",
    copiedText: "Documento comprometedor copiado para a área de transferência.",
    shareError: "O arquivo se recusou a sair do tribunal. Tente novamente.",
    tagline: "Não garantimos absolvição.",
    punchlines: [
      "Fonte: pensamento positivo.",
      "Fonte: pensamento positivo.",
      "Documento não verificado por nenhuma autoridade competente.",
      "Validade jurídica: nenhuma.",
    ],
  },
  common: { back: "Voltar", step: "Etapa" },
};

export const STRINGS: Record<Locale, UIStrings> = { es, en, "pt-BR": pt };
