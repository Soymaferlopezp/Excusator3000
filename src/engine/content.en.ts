import { EN_EXCUSES } from "./content.en.bank";
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

const confirmed = q("confirmado", "Did you already make the mistake of confirming?", [
  ["No. I am still legally free.", -8],
  ["Yes, but with no evidential enthusiasm.", 4, ["alreadyConfirmed"]],
  [
    "Yes. With emojis. My case is serious.",
    12,
    ["alreadyConfirmed", "enthusiasticConfirmation", "groupChatEvidence"],
  ],
]);

const location = q("ubicacion", "Can they easily verify where you are?", [
  ["Hardly.", -6],
  ["Probably.", 6, ["visibilityRisk"]],
  ["Yes. I made technological mistakes.", 14, ["visibilityRisk", "socialMediaRisk"]],
]);

const history = q("historial", "Do they know your previous excuses?", [
  ["This is our first time.", -5],
  ["They suspect, but hold no proof.", 6, ["closeRelationship"]],
  ["They keep a record. With dates.", 13, ["closeRelationship", "visibilityRisk"]],
]);

const time = q("tiempo", "How long do you need to disappear?", [
  ["A couple of hours.", -4],
  ["The whole afternoon.", 5, ["timingConflict"]],
  ["I would rather never discuss it again.", 10, ["timingConflict"]],
]);

const reschedule = q("fecha", "Would you offer an alternative date?", [
  ["Yes, and I intend to honor it.", -10],
  ["Yes, in an imprecise future.", 2, ["lowEnergy"]],
  ["No. That door must close.", 9],
]);

const severity = q("gravedad", "How serious is a last-minute cancellation here?", [
  ["Nobody would notice.", -7],
  ["There would be comments.", 5, ["groupChatEvidence"]],
  ["It would be mentioned for years.", 12, ["familyPressure", "groupChatEvidence"]],
]);

const en: LocaleContent = {
  signature: "Office of Improbable Excuses",
  categories: {
    familia: {
      label: "Family",
      formal: "Non-negotiable family summons",
      description: "Lunches, birthdays, visits and unavoidable events.",
    },
    amigos: {
      label: "Friends",
      formal: "Voluntarily accepted social appearance",
      description: "Parties, dinners, group plans and later regret.",
    },
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
    cita: {
      label: "Dating",
      formal: "Romantic commitment under investigation",
      description: "Dates, encounters or plans that aged badly.",
    },
  },
  questions: {
    familia: [confirmed, history, severity],
    amigos: [confirmed, history, location],
    trabajo: [confirmed, location, severity],
    estudios: [confirmed, time, reschedule],
    cita: [confirmed, location, reschedule],
  },
  verdicts: [
    "GUILTY OF ACCEPTING PLANS WITHOUT CONSULTING A CALENDAR",
    "CONDITIONAL SOCIAL ACQUITTAL",
    "ORGANIZATIONAL NEGLIGENCE IN THE SECOND DEGREE",
    "TACTICAL WITHDRAWAL AUTHORIZED",
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
  relationshipOpenings: {
    formal: ["A quick scheduling note:", "I need to be unusually direct:", "For the record:"],
    cercana: ["Hey—bad news:", "Okay, hear me out:", "I owe you the honest version:"],
    confianza: [
      "Look, you know who you're dealing with:",
      "Please lower your expectations:",
      "I have chosen honesty over dignity:",
    ],
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
  institutionalPunchlines: [
    { id: "en-micro-well", text: "Source: the wishing well.", minRisk: 45 },
    {
      id: "en-micro-words",
      text: "Every additional detail is currently working for the prosecution.",
      minRisk: 50,
    },
    {
      id: "en-micro-chat",
      text: "The group chat has been admitted as evidence.",
      signals: ["groupChatEvidence"],
    },
    {
      id: "en-micro-status",
      text: "Your online status has declined to testify on your behalf.",
      signals: ["visibilityRisk", "socialMediaRisk"],
    },
    {
      id: "en-micro-calendar",
      text: "The calendar recognizes the conflict and none of your innocence.",
      signals: ["timingConflict"],
    },
    {
      id: "en-micro-rest",
      text: "The defense rests. Mainly on the couch.",
      signals: ["lowEnergy"],
    },
    {
      id: "en-micro-questions",
      text: "Two follow-up questions exceed this story's load rating.",
      minRisk: 65,
    },
    {
      id: "en-micro-file",
      text: "The Department of Bad Decisions has signed the report.",
      minRisk: 30,
    },
  ],
  refusal: {
    title: "The tribunal lacks jurisdiction to forge evidence.",
    body: "We can authorize an honest cancellation or a request for an extension.",
  },
  discriminationRefusal: {
    title: "Case partially inadmissible.",
    body: "The tribunal does not issue excuses based on who other attendees are. We can file this under 'I don't want to go,' which was already sufficient.",
  },
  excuses: EN_EXCUSES,
};

export default en;
