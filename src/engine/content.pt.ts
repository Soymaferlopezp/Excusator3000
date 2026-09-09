import type { LocaleContent } from "./types";

const q = (id: string, text: string, options: [string, number][]) => ({
  id,
  text,
  options: options.map(([label, risk], i) => ({ id: `${id}-${i}`, label, risk })),
});

const confirmou = q("confirmado", "Você já cometeu o erro de confirmar presença?", [
  ["Não. Ainda sou legalmente livre.", -8],
  ["Sim, mas sem entusiasmo probatório.", 4],
  ["Sim. Com emojis. Meu caso é grave.", 12],
]);
const local = q("ubicacion", "Dá para comprovar facilmente onde você está?", [
  ["Dificilmente.", -6],
  ["Provavelmente.", 6],
  ["Sim. Cometi erros tecnológicos.", 14],
]);
const historico = q("historial", "Essa pessoa conhece suas desculpas anteriores?", [
  ["É a nossa primeira vez.", -5],
  ["Desconfia, mas não tem provas.", 6],
  ["Mantém um registro. Com datas.", 13],
]);
const tempo = q("tiempo", "De quanto tempo você precisa para sumir?", [
  ["Umas duas horas.", -4],
  ["A tarde inteira.", 5],
  ["Prefiro nunca mais tocar no assunto.", 10],
]);
const data = q("fecha", "Você ofereceria uma data alternativa?", [
  ["Sim, e pretendo cumprir.", -10],
  ["Sim, num futuro impreciso.", 2],
  ["Não. Essa porta precisa fechar.", 9],
]);
const gravidade = q("gravedad", "Quão grave seria cancelar em cima da hora?", [
  ["Ninguém notaria.", -7],
  ["Haveria comentários.", 5],
  ["Seria lembrado por anos.", 12],
]);

const pt: LocaleContent = {
  signature: "Escritório de Desculpas Improváveis",
  categories: {
    trabajo: {
      label: "Trabalho",
      formal: "Obrigação laboral de entusiasmo duvidoso",
      description: "Reuniões, escritório, turnos, mensagens fora de hora.",
    },
    estudios: {
      label: "Estudos",
      formal: "Incidente acadêmico totalmente previsível",
      description: "Aulas, trabalhos, entregas e consequências educativas.",
    },
    familia: {
      label: "Família",
      formal: "Intimação familiar inegociável",
      description: "Almoços, aniversários, visitas e eventos inevitáveis.",
    },
    cita: {
      label: "Encontro",
      formal: "Compromisso afetivo sob investigação",
      description: "Encontros românticos ou planos que envelheceram mal.",
    },
    amigos: {
      label: "Amigos",
      formal: "Comparecimento social voluntariamente aceito",
      description: "Festas, jantares, planos em grupo e arrependimento posterior.",
    },
    ejercicio: {
      label: "Exercício",
      formal: "Obrigação física incompatível com o estado atual",
      description: "Academia, corrida, futebol e outras decisões otimistas.",
    },
    favor: {
      label: "Favor pendente",
      formal: "Dívida moral administrativamente incômoda",
      description: "Mudanças, favores, recados e promessas perigosas.",
    },
    inconfesable: {
      label: "Algo inconfessável",
      formal: "Matéria reservada sob sigilo administrativo",
      description: "O tribunal fará poucas perguntas.",
    },
  },
  questions: {
    trabajo: [confirmou, local, gravidade],
    estudios: [confirmou, tempo, data],
    familia: [confirmou, historico, gravidade],
    cita: [confirmou, local, data],
    amigos: [confirmou, historico, local],
    ejercicio: [historico, tempo],
    favor: [confirmou, data, gravidade],
    inconfesable: [local, tempo],
  },
  verdicts: [
    "CULPADO DE ACEITAR PLANOS SEM CONSULTAR O CALENDÁRIO",
    "ABSOLVIÇÃO SOCIAL CONDICIONAL",
    "NEGLIGÊNCIA ORGANIZATIVA EM SEGUNDO GRAU",
    "RETIRADA TÁTICA AUTORIZADA",
    "IMPRUDÊNCIA SOCIAL COM ATENUANTES",
    "ÁLIBI APROVADO SOB SUPERVISÃO",
  ],
  deliberation: [
    "Revisando precedentes questionáveis…",
    "Consultando o Departamento de Consequências…",
    "Calculando margem de arrependimento…",
    "Eliminando contradições evidentes…",
    "Adicionando uma quantidade prudente de drama…",
    "Buscando uma saída juridicamente criativa…",
    "Avaliando danos à sua reputação…",
    "Ignorando recomendações de bom senso…",
  ],
  dramaTail: {
    seco: "",
    cinematografico: " Poupo você dos detalhes, mas não foi um dia organizado.",
    telenovela: " Sendo sincero, ainda estou processando emocionalmente como chegamos aqui.",
  },
  relationshipOpening: {
    formal: "Bom dia. Lamento comunicar um contratempo:",
    cercana: "Ei, desculpa o aviso em cima da hora:",
    confianza: "Senta antes de ler isto:",
  },
  credibilityNote: {
    sospechosa: "",
    razonable: " Aviso assim que resolver.",
    impecable: " Já reorganizei o resto para que só isto fique pendente.",
  },
  riskStatus: {
    low: "RAZOAVELMENTE CRÍVEL",
    mid: "MODERADAMENTE SUSPEITO",
    high: "ESTRUTURALMENTE FRÁGIL",
    extreme: "INDEFENSÁVEL PERANTE QUALQUER TRIBUNAL",
  },
  refusal: {
    title: "O tribunal não tem jurisdição para falsificar provas.",
    body: "Podemos autorizar um cancelamento honesto ou um pedido de prorrogação.",
  },
  excuses: {
    trabajo: {
      prudente: [
        {
          id: "pt-trabajo-p1",
          body: "surgiu um assunto pessoal que preciso resolver hoje e não vou conseguir estar presente.",
          followUp: "Nada grave, burocracia doméstica que só dá para fazer em horário comercial.",
          weakness: "Aparecer online no chat interno arruinaria o argumento.",
          repair: "Envie por escrito o que você diria na reunião.",
        },
      ],
      valiente: [
        {
          id: "pt-trabajo-v1",
          body: "tenho uma situação doméstica que exige supervisão imediata e prefiro não explicar por que há um técnico, uma escada e dois vizinhos envolvidos.",
          followUp: "Está controlado, mas só enquanto eu ficar aqui.",
          weakness: "Se perguntarem o nome do técnico, você não tem um pronto.",
          repair: "Proponha o novo horário antes que proponham por você.",
        },
      ],
      sin_retorno: [
        {
          id: "pt-trabajo-s1",
          body: "a administração do prédio pediu que eu fique disponível enquanto apuram um incidente que, por recomendação de todas as partes, ainda não descreveremos em detalhe.",
          followUp: "Não posso detalhar: há uma versão oficial em preparação.",
          weakness: "Uma única pergunta concreta derruba toda a estrutura.",
          repair: "Apareça amanhã pontualíssimo e com algo resolvido a mais.",
        },
      ],
    },
    estudios: {
      prudente: [
        {
          id: "pt-estudios-p1",
          body: "meu dia complicou com uma pendência e não vou conseguir ir à aula hoje.",
          followUp: "Nada importante, coisas acumuladas. Recupero a matéria hoje à noite.",
          weakness: "Um colega pode confirmar que ontem você não tinha pendência alguma.",
          repair: "Peça o conteúdo primeiro; parece interesse, não fuga.",
        },
      ],
      valiente: [
        {
          id: "pt-estudios-v1",
          body: "tive um problema com o computador e tudo o que eu precisava está num arquivo que no momento se recusa a existir.",
          followUp: "Estou tentando recuperar. O procedimento envolve reiniciar coisas que não deveria.",
          weakness: "Qualquer documento enviado hoje desse mesmo computador te entrega.",
          repair: "Entregue algo antes do prazo, mesmo pela metade.",
        },
      ],
      sin_retorno: [
        {
          id: "pt-estudios-s1",
          body: "estou preso num procedimento da secretaria que, segundo três pessoas diferentes, ainda não tem responsável designado.",
          followUp: "Sigo esperando alguém assumir competência sobre o processo.",
          weakness: "Ninguém nunca viu a secretaria responder rápido assim.",
          repair: "Apareça na próxima aula com o trabalho pronto e sem citar o assunto.",
        },
      ],
    },
    familia: {
      prudente: [
        {
          id: "pt-familia-p1",
          body: "surgiu um problema em casa que preciso resolver antes que piore e vou ter que sair do plano de hoje.",
          followUp: "Nada grave, mas incômodo o bastante para me segurar aqui.",
          weakness: "Postar stories de outro lugar destrói a defesa em oito segundos.",
          repair: "Proponha uma nova data antes que a vítima reconsidere a relação.",
        },
      ],
      valiente: [
        {
          id: "pt-familia-v1",
          body: "tenho uma situação doméstica que exige supervisão constante e prefiro não explicar por que há um aspirador, um balde e uma decisão questionável envolvidos.",
          followUp: "Está sob controle num sentido bem generoso da palavra.",
          weakness: "Algum parente curioso vai pedir foto. E você não tem foto.",
          repair: "Ofereça-se para organizar o próximo encontro.",
        },
      ],
      sin_retorno: [
        {
          id: "pt-familia-s1",
          body: "o condomínio pediu que eu fique disponível enquanto esclarecem um incidente que, por recomendação de todos, ainda não chamaremos de “o caso do elevador”.",
          followUp: "Há versões contraditórias e decidi não dar a minha por enquanto.",
          weakness: "Se alguém conhecer alguém do seu prédio, isto acaba hoje.",
          repair: "Apareça no próximo domingo com sobremesa e sem explicações extras.",
        },
      ],
    },
    cita: {
      prudente: [
        {
          id: "pt-cita-p1",
          body: "surgiu algo que não consigo mudar e prefiro avisar agora a aparecer com a cabeça em outro lugar.",
          followUp: "Assunto pessoal, nada dramático. Quero te ver, mas hoje não seria justo.",
          weakness: "Ficar online a noite toda contradiz a urgência.",
          repair: "Proponha dia e hora concretos na mesma mensagem.",
        },
      ],
      valiente: [
        {
          id: "pt-cita-v1",
          body: "minha tarde desandou de um jeito que ainda estou tentando entender, e prefiro cancelar a chegar tarde com explicações piores.",
          followUp: "Te conto pessoalmente, porque por mensagem soa inventado.",
          weakness: "Prometer contar pessoalmente te obriga a inventar a segunda parte.",
          repair: "Reserve você o lugar do novo encontro.",
        },
      ],
      sin_retorno: [
        {
          id: "pt-cita-s1",
          body: "preciso ficar resolvendo algo que começou pequeno, passou por três pessoas e agora tem grupo de mensagens próprio.",
          followUp: "Quando acabar eu te mostro os prints, embora já sem graça nenhuma.",
          weakness: "Oferecer prints inexistentes é um risco processual evidente.",
          repair: "Chegue dez minutos antes na próxima. Sem exceção.",
        },
      ],
    },
    amigos: {
      prudente: [
        {
          id: "pt-amigos-p1",
          body: "surgiu um assunto em casa e hoje eu saio do rolê; aviso agora para não contarem comigo na reserva.",
          followUp: "Nada sério, só timing ruim. Vão sem mim e me contem tudo errado depois.",
          weakness: "O grupo tem memória coletiva e prints.",
          repair: "Pague a primeira rodada do próximo encontro sem pedirem.",
        },
      ],
      valiente: [
        {
          id: "pt-amigos-v1",
          body: "tenho uma situação em casa que exige presença física e uma vigilância que ninguém mais quer assumir.",
          followUp: "É longo de explicar e fica pior por mensagem. Guardem a versão oficial.",
          weakness: "Alguém do grupo mora perto e pode passar para conferir.",
          repair: "Apareça na última meia hora. Muda toda a percepção.",
        },
      ],
      sin_retorno: [
        {
          id: "pt-amigos-s1",
          body: "estou retido por um assunto de vizinhança que já envolve dois andares, um grupo de mensagens e uma pessoa que se autoproclamou coordenadora.",
          followUp: "Não posso sair agora sem perder posição na negociação.",
          weakness: "A história é tão boa que vão exigir o desfecho semana que vem.",
          repair: "Traga o desfecho pronto e coerente. Ou confesse com estilo.",
        },
      ],
    },
    ejercicio: {
      prudente: [
        {
          id: "pt-ejercicio-p1",
          body: "hoje não chego no treino; surgiu algo e prefiro não aparecer pela metade.",
          followUp: "Nada lesionado, só agenda. Recupero a sessão durante a semana.",
          weakness: "Seu histórico de sessões recuperadas não sustenta essa afirmação.",
          repair: "Marque você mesmo o dia da reposição. Em voz alta.",
        },
      ],
      valiente: [
        {
          id: "pt-ejercicio-v1",
          body: "estou com um incômodo desde o último treino e decidi não piorar isso bem antes de um compromisso já assumido.",
          followUp: "Melhor perder uma sessão agora do que três na semana que vem.",
          weakness: "Ninguém lembra de você reclamando no último treino.",
          repair: "Volte no próximo dia sem reclamar nenhuma vez.",
        },
      ],
      sin_retorno: [
        {
          id: "pt-ejercicio-s1",
          body: "consultei minha própria disponibilidade física e o relatório interno recomenda não comparecer hoje em nenhuma circunstância.",
          followUp: "O relatório é de elaboração própria, mas é o único disponível e portanto vinculante.",
          weakness: "Admitir que o relatório é seu destrói o valor probatório.",
          repair: "Chegue primeiro no próximo dia e não diga nada.",
        },
      ],
    },
    favor: {
      prudente: [
        {
          id: "pt-favor-p1",
          body: "não vou conseguir te ajudar hoje; apareceu um assunto que não consigo remarcar.",
          followUp: "Continuo inscrito no favor, só não nesta data.",
          weakness: "É a segunda vez que “aparece um assunto” nesse mesmo favor.",
          repair: "Ofereça um dia concreto você mesmo, e que seja logo.",
        },
      ],
      valiente: [
        {
          id: "pt-favor-v1",
          body: "tenho um problema em casa que me deixa sem carro e sem margem, que eram exatamente as duas coisas necessárias hoje.",
          followUp: "Estou tentando resolver, mas depende de gente que não responde aos sábados.",
          weakness: "Te viram dirigindo essa mesma semana.",
          repair: "Compense com algo tangível: comida, transporte ou uma tarde inteira.",
        },
      ],
      sin_retorno: [
        {
          id: "pt-favor-s1",
          body: "estou travado num trâmite que começou com um formulário, seguiu com uma ligação e terminou com alguém pedindo que eu aguarde uma confirmação que ninguém sabe quem emite.",
          followUp: "Assim que alguém assumir a responsabilidade, eu me libero.",
          weakness: "Ninguém acredita em trâmites que acontecem justo no dia do favor.",
          repair: "Devolva o favor em dobro e sem que te lembrem.",
        },
      ],
    },
    inconfesable: {
      prudente: [
        {
          id: "pt-inconf-p1",
          body: "hoje não vai dar; tenho um assunto pessoal que prefiro não detalhar e que não admite espera.",
          followUp: "Nada preocupante. Só meu. Você entenderia se um dia eu contasse.",
          weakness: "O mistério convida exatamente à pergunta que você não quer.",
          repair: "Não dê detalhes depois. Acréscimos sempre entregam.",
        },
      ],
      valiente: [
        {
          id: "pt-inconf-v1",
          body: "tenho um compromisso anterior que não posso mudar e que, por respeito a todas as partes, prefiro não descrever.",
          followUp: "Não é nada ruim. É só incômodo de explicar em duas frases.",
          weakness: "Quanto mais formal soa, mais curiosidade gera.",
          repair: "Ofereça disponibilidade total na próxima. Sem condições.",
        },
      ],
      sin_retorno: [
        {
          id: "pt-inconf-s1",
          body: "estou tratando de um assunto classificado por mim mesmo como reservado, e a instituição que o administra sou eu, o que complica qualquer recurso.",
          followUp: "Posso confirmar que existe. Não posso confirmar mais nada.",
          weakness: "Esse nível de teatro só funciona com plateia generosa.",
          repair: "Pague a próxima e nunca mais use a palavra “classificado”.",
        },
      ],
    },
  },
};

export default pt;
