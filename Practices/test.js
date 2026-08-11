class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  getInfo() {
    return `${this.name} (${this.email})`;
  }
}
class AdminUser extends User {
  constructor(name, email, permissions) {
    super(name,email);
    this.permissions = permissions;
  }
getInfo() {
  return super.getInfo() + " [ADMIN]";
}
hasPermission(permission){
  return this.permissions.includes(permission);
}
}

const u1 = new User("Ali", "ali@x.com");
console.log(u1.getInfo());   // "Ali (ali@x.com)"

const admin1 = new AdminUser("Sara", "sara@x.com", ["delete_users", "edit_settings"]);
console.log(admin1.getInfo());                        // "Sara (sara@x.com) [ADMIN]"
console.log(admin1.hasPermission("delete_users"));    // true
console.log(admin1.hasPermission("ban_users"));        // false
console.log(admin1.name);                                // "Sara"