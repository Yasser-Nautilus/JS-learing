class Employee {
  #baseSalary;
  static totalEmployees = 0;
  constructor(name, baseSalary) {
    this.name = name;
    this.#baseSalary = baseSalary;
    Employee.totalEmployees++;
  }
  getSalary() {
    return this.#baseSalary;
  }
  getInfo() {
    return `${this.name}: ${this.getSalary()}`;
  }
}
class Manager extends Employee {
  constructor(name, baseSalary, teamSize) {
    super(name, baseSalary);
    this.teamSize = teamSize;
  }
  getSalary() {
    const currentSalary = super.getSalary();
    return currentSalary + this.teamSize * 500;
  }
  getInfo() {
    const currentInfo = super.getInfo();
    return currentInfo + " [MANAGER]";
  }
}

const e1 = new Employee("Ali", 5000);
const m1 = new Manager("Sara", 6000, 4);

console.log(e1.getInfo());         // "Ali: $5000"
console.log(e1.getSalary());        // 5000

console.log(m1.getSalary());        // 8000  (6000 + 4*500)
console.log(m1.getInfo());          // "Sara: $8000 [MANAGER]"
console.log(m1.teamSize);            // 4

console.log(Employee.totalEmployees); // 2  (e1 + m1)