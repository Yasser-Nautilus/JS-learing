const startTime = Date.now();

let sum = 0;
for (let i = 0; i < 1e7; i++) {
  sum += i;
}
const endTime = Date.now();
console.log(`Operation took ${endTime - startTime}ms`);