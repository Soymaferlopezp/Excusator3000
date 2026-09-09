import type { LocaleContent } from "./types";

const q = (id: string, text: string, options: [string, number][]) => ({
  id,
  text,
  options: options.map(([label, risk], i) => ({ id: `${id}-${i}`, label, risk })),
});

const confirmed = q("confirmado", "Did you already make the mistake of confirming?", [
  ["No. I am still legally free.", -8],
  ["Yes, but with no evidential enthusiasm.", 4],
  ["Yes. With emojis. My case is serious.", 12],
]);
const location = q("ubicacion", "Can they easily verify where you are?", [
  ["Hardly.", -6],
  ["Probably.", 6],
  ["Yes. I made technological mistakes.", 14],
]);
const history = q("historial", "Do they know your previous excuses?", [
  ["This is our first time.", -5],
  ["They suspect, but hold no proof.", 6],
  ["They keep a record. With dates.", 13],
]);
const time = q("tiempo", "How long do you need to disappear?", [
  ["A couple of hours.", -4],
  ["The whole afternoon.", 5],
  ["I would rather never discuss it again.", 10],
]);
const reschedule = q("fecha", "Would you offer an alternative date?", [
  ["Yes, and I intend to honour it.", -10],
  ["Yes, in an imprecise future.", 2],
  ["No. That door must close.", 9],
]);
const severity = q("gravedad", "How serious is a last-minute cancellation here?", [
  ["Nobody would notice.", -7],
  ["There would be comments.", 5],
  ["It would be mentioned for years.", 12],
]);

const en: LocaleContent = {
  signature: "Office of Improbable Excuses",
  categories: {
    trabajo: {
      label: "Work",
      formal: "Occupational duty of questionable enthusiasm",
      description: "Meetings, office, shifts, after-hours messages.",
    },
    estudios: {
      label: "Studies",
      formal: "Entirely foreseeable academic incident",
      description: "Classes, assignments, deadlines and educational consequences.",
    },
    familia: {
      label: "Family",
      formal: "Non-negotiable family summons",
      description: "Lunches, birthdays, visits and unavoidable events.",
    },
    cita: {
      label: "Date",
      formal: "Romantic commitment under investigation",
      description: "Dates, encounters or plans that aged badly.",
    },
    amigos: {
      label: "Friends",
      formal: "Voluntarily accepted social appearance",
      description: "Parties, dinners, group plans and later regret.",
    },
    ejercicio: {
      label: "Exercise",
      formal: "Physical obligation incompatible with current condition",
      description: "Gym, running, football and other optimistic decisions.",
    },
    favor: {
      label: "Pending favour",
      formal: "Administratively awkward moral debt",
      description: "Moves, favours, errands and dangerous promises.",
    },
    inconfesable: {
      label: "Something unspeakable",
      formal: "Matter withheld under administrative secrecy",
      description: "The tribunal will ask few questions.",
    },
  },
  questions: {
    trabajo: [confirmed, location, severity],
    estudios: [confirmed, time, reschedule],
    familia: [confirmed, history, severity],
    cita: [confirmed, location, reschedule],
    amigos: [confirmed, history, location],
    ejercicio: [history, time],
    favor: [confirmed, reschedule, severity],
    inconfesable: [location, time],
  },
  verdicts: [
    "GUILTY OF ACCEPTING PLANS WITHOUT CONSULTING A CALENDAR",
    "CONDITIONAL SOCIAL ACQUITTAL",
    "ORGANISATIONAL NEGLIGENCE IN THE SECOND DEGREE",
    "TACTICAL WITHDRAWAL AUTHORISED",
    "SOCIAL RECKLESSNESS WITH MITIGATING FACTORS",
    "ALIBI APPROVED UNDER SUPERVISION",
  ],
  deliberation: [
    "Reviewing questionable precedents…",
    "Consulting the Department of Consequences…",
    "Calculating margin of regret…",
    "Removing obvious contradictions…",
    "Adding a prudent amount of drama…",
    "Seeking a legally creative exit…",
    "Assessing damage to your reputation…",
    "Ignoring common-sense recommendations…",
  ],
  dramaTail: {
    seco: "",
    cinematografico: " I'll spare you the details, but it has not been an orderly day.",
    telenovela: " Honestly, I'm still emotionally processing how we got here.",
  },
  relationshipOpening: {
    formal: "Good morning. I regret to report a complication:",
    cercana: "Hey, sorry for the short notice:",
    confianza: "You should sit down before reading this:",
  },
  credibilityNote: {
    sospechosa: "",
    razonable: " I'll let you know as soon as it clears up.",
    impecable: " I've already rearranged everything else so this is the only loose end.",
  },
  riskStatus: {
    low: "REASONABLY BELIEVABLE",
    mid: "MODERATELY SUSPICIOUS",
    high: "STRUCTURALLY FRAGILE",
    extreme: "INDEFENSIBLE BEFORE ANY TRIBUNAL",
  },
  refusal: {
    title: "The tribunal lacks jurisdiction to forge evidence.",
    body: "We can authorise an honest cancellation or a request for an extension.",
  },
  excuses: {
    trabajo: {
      prudente: [
        {
          id: "en-trabajo-p1",
          body: "a personal matter came up that has to be settled today, so I won't be able to attend.",
          followUp: "Nothing serious, domestic paperwork I can only do during office hours.",
          weakness: "Appearing online in the internal chat would ruin the argument.",
          repair: "Send in writing whatever you were going to say in the meeting.",
        },
      ],
      valiente: [
        {
          id: "en-trabajo-v1",
          body: "I have a domestic situation requiring immediate supervision, and I'd rather not explain why a technician, a ladder and two neighbours are involved.",
          followUp: "It's contained, but only while I stay here. I'll explain when it stops being ridiculous.",
          weakness: "If they ask the technician's name, you don't have one ready.",
          repair: "Propose the new time yourself before someone proposes it for you.",
        },
      ],
      sin_retorno: [
        {
          id: "en-trabajo-s1",
          body: "the building management has asked me to remain available while they review an incident that, on everyone's advice, we will not yet describe in detail.",
          followUp: "I can't elaborate, an official version is being prepared.",
          weakness: "One specific question about the incident collapses the whole structure.",
          repair: "Show up tomorrow unusually early with something extra finished.",
        },
      ],
    },
    estudios: {
      prudente: [
        {
          id: "en-estudios-p1",
          body: "my day got complicated with something I had pending, so I can't make it to class today.",
          followUp: "Nothing important, admin that piled up. I'll catch up on the notes tonight.",
          weakness: "A classmate can confirm you had nothing pending yesterday.",
          repair: "Ask for the notes first, so it reads as interest rather than flight.",
        },
      ],
      valiente: [
        {
          id: "en-estudios-v1",
          body: "I've had a computer problem and everything I needed is in a file that currently refuses to exist.",
          followUp: "I'm trying to recover it. The procedure involves restarting things I shouldn't restart.",
          weakness: "Any document sent today from that same computer exposes you.",
          repair: "Submit something before the deadline, even partial, to hold the story up.",
        },
      ],
      sin_retorno: [
        {
          id: "en-estudios-s1",
          body: "I'm stuck in an administrative procedure that, according to three different people, still has no assigned owner.",
          followUp: "I'm waiting for someone to claim responsibility for the file.",
          weakness: "Nobody has ever seen that office move fast enough to justify this.",
          repair: "Turn up to the next session with the work done and say nothing.",
        },
      ],
    },
    familia: {
      prudente: [
        {
          id: "en-familia-p1",
          body: "a problem came up at home that I need to solve before it gets worse, so I have to drop out of today's plan.",
          followUp: "Nothing serious, but awkward enough to keep me here a while.",
          weakness: "Posting stories from anywhere else destroys the defence in eight seconds.",
          repair: "Propose a new date before the victim reconsiders the relationship.",
        },
      ],
      valiente: [
        {
          id: "en-familia-v1",
          body: "I have a domestic situation requiring constant supervision, and I'd rather not explain why a vacuum cleaner, a bucket and a questionable decision are involved.",
          followUp: "It's under control in a very generous sense of the word.",
          weakness: "A curious relative will ask for a photo. You have no photo.",
          repair: "Offer to host the next gathering yourself.",
        },
      ],
      sin_retorno: [
        {
          id: "en-familia-s1",
          body: "the building committee has asked me to stay available while they clarify an incident that, on everyone's advice, we will not yet call \u201cthe lift matter\u201d.",
          followUp: "There are conflicting versions and I've decided not to add mine yet.",
          weakness: "If anyone knows anyone in your building, this ends today.",
          repair: "Show up next Sunday with dessert and no further explanations.",
        },
      ],
    },
    cita: {
      prudente: [
        {
          id: "en-cita-p1",
          body: "something came up that I can't move, and I'd rather tell you now than show up with my head elsewhere.",
          followUp: "A personal thing, nothing dramatic. I do want to see you, just not badly today.",
          weakness: "Being online all evening contradicts the urgency.",
          repair: "Propose a specific day and time in the same message.",
        },
      ],
      valiente: [
        {
          id: "en-cita-v1",
          body: "my afternoon fell apart in a way I'm still trying to understand, and I'd rather cancel than arrive late with worse explanations.",
          followUp: "I'll tell you in person, because over text it sounds invented.",
          weakness: "Promising to explain in person commits you to a sequel.",
          repair: "Book the place yourself for the new date.",
        },
      ],
      sin_retorno: [
        {
          id: "en-cita-s1",
          body: "I have to stay and settle something that started small, passed through three people and now has its own group chat.",
          followUp: "When it's over I'll show you the screenshots, though they'll have lost all charm.",
          weakness: "Offering screenshots that don't exist is a clear procedural risk.",
          repair: "Arrive ten minutes early next time. No exceptions.",
        },
      ],
    },
    amigos: {
      prudente: [
        {
          id: "en-amigos-p1",
          body: "something came up at home, so I'm out for today; telling you now so you don't count me in the booking.",
          followUp: "Nothing serious, just bad timing. Go without me and tell me everything wrong later.",
          weakness: "The group has collective memory and screenshots.",
          repair: "Buy the first round next time without being asked.",
        },
      ],
      valiente: [
        {
          id: "en-amigos-v1",
          body: "I have a situation at home that requires physical presence and a level of vigilance nobody else will take on.",
          followUp: "It's long to explain and sounds worse in writing. Save me the official version.",
          weakness: "Someone in the group lives nearby and could drop by.",
          repair: "Show up for the last half hour. It changes everything.",
        },
      ],
      sin_retorno: [
        {
          id: "en-amigos-s1",
          body: "I'm detained by a neighbourhood matter now involving two floors, a group chat and a person who has appointed herself coordinator.",
          followUp: "I can't leave now without losing my position in the negotiation.",
          weakness: "The story is so good they'll demand the ending next week.",
          repair: "Bring a coherent ending, or confess with style.",
        },
      ],
    },
    ejercicio: {
      prudente: [
        {
          id: "en-ejercicio-p1",
          body: "I can't make training today; something came up and I'd rather not show up halfway.",
          followUp: "Nothing injured, just scheduling. I'll make the session up this week.",
          weakness: "Your record of made-up sessions does not support this claim.",
          repair: "Name the make-up day yourself. Out loud.",
        },
      ],
      valiente: [
        {
          id: "en-ejercicio-v1",
          body: "I've been carrying a niggle since the last session and I've decided not to make it worse right before a plan I'm already committed to.",
          followUp: "Better to lose one session now than three next week.",
          weakness: "Nobody remembers you complaining during the last session.",
          repair: "Come back next time without complaining once.",
        },
      ],
      sin_retorno: [
        {
          id: "en-ejercicio-s1",
          body: "I have consulted my own physical availability and the internal report advises against attending today under any circumstances.",
          followUp: "The report is self-issued, but it is the only one available and therefore binding.",
          weakness: "Admitting the report is yours destroys its evidential value.",
          repair: "Turn up first next time and say nothing.",
        },
      ],
    },
    favor: {
      prudente: [
        {
          id: "en-favor-p1",
          body: "I won't be able to give you a hand today; something came up that I can't move.",
          followUp: "I'm still signed up for the favour, just not on this date.",
          weakness: "It's the second time something has come up for this same favour.",
          repair: "Offer a specific day yourself, and make it soon.",
        },
      ],
      valiente: [
        {
          id: "en-favor-v1",
          body: "I have a situation at home that leaves me without a car and without slack, which are precisely the two things today required.",
          followUp: "I'm trying to fix it, but it depends on people who don't answer on Saturdays.",
          weakness: "You were seen driving this very week.",
          repair: "Compensate with something tangible: food, transport or a full afternoon.",
        },
      ],
      sin_retorno: [
        {
          id: "en-favor-s1",
          body: "I'm blocked by a process that began with a form, continued with a phone call and ended with someone asking me to await a confirmation nobody can say who issues.",
          followUp: "The moment someone claims responsibility, I'm free. Could be today, could be March.",
          weakness: "Nobody believes in paperwork that happens exactly on favour day.",
          repair: "Return the favour twice over, unprompted.",
        },
      ],
    },
    inconfesable: {
      prudente: [
        {
          id: "en-inconf-p1",
          body: "I can't today; I have a personal matter I'd rather not detail and that can't wait.",
          followUp: "Nothing worrying. Just mine. You'd understand if I ever told it.",
          weakness: "Mystery invites exactly the question you don't want.",
          repair: "Add no further details afterwards. Additions always betray.",
        },
      ],
      valiente: [
        {
          id: "en-inconf-v1",
          body: "I have a prior commitment I can't move and, out of respect for everyone involved, would rather not describe.",
          followUp: "It's nothing bad. It's simply awkward to explain in two sentences.",
          weakness: "The more formal it sounds, the more curiosity it creates.",
          repair: "Offer total availability next time. No conditions.",
        },
      ],
      sin_retorno: [
        {
          id: "en-inconf-s1",
          body: "I am attending to a matter I have personally classified as confidential, and the institution handling it is me, which complicates any appeal.",
          followUp: "I can confirm it exists. I cannot confirm anything else.",
          weakness: "This level of theatre only works with a generous audience.",
          repair: "Pay next time and never use the word \u201cclassified\u201d again.",
        },
      ],
    },
  },
};

export default en;
