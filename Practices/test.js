const rateLimit = new Map();

function checkRateLimit(userId) {
  if (!rateLimit.has(userId)) {
    rateLimit.set(userId, 1);
    console.log("the user init the first request");
  } else if (rateLimit.get(userId) < 3) {
    let numReq = rateLimit.get(userId);
    numReq += 1;
    rateLimit.set(userId, numReq);
    console.log("True");
  } else if (rateLimit.get(userId) === 3) {
    console.log("False");
  }
}
checkRateLimit(15);
checkRateLimit(15);
checkRateLimit(15);
checkRateLimit(15);

checkRateLimit(16);
