const url = "https://jsonplaceholder.typicode.com/users";
class UserService {
  #cache = new Map();
  constructor() {}
  async getUser(userId) {
    if (!this.#cache.has(userId)) {
      try {
        const resp = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
        );
        const user = await resp.json();
        this.#cache.set(userId, user);
        console.log("the User from API");
        return user;
      } catch (error) {
        console.log("Failed:", error.message);
      }
    } else {
      console.log("the User from cache"); 
      return this.#cache.get(userId);
    }
  }
}
async function main() {
  const service = new UserService();

  const user1 = await service.getUser(1); // "From API"
  console.log(user1.name);

  const user1Again = await service.getUser(1); // "From cache" — من غير fetch تاني!
  console.log(user1Again.name);

  const user2 = await service.getUser(2); // "From API" — مستخدم مختلف
  console.log(user2.name);
}
main();
