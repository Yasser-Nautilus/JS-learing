import getSessionDuration, { createSession } from "./sessionUtils.js";

const session = createSession("ali");
console.log(session); // { userId: "ali", startTime: 1234567890123 }

// انتظر شوية (أو خليها تتنفذ فوراً، مش هيبقى فيه فرق كبير)
console.log(getSessionDuration(session)); // رقم صغير جداً، زي 0 أو 0.001 (لأن الوقت قريب جداً من بعضه)
