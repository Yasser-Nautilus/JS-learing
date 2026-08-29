export class Logger {
  constructor() {
    this.logs = [];
  }

  log(message) {
    const entry = `[${new Date().toISOString()}] ${message}`;
    this.logs.push(entry);
    console.log(entry);
  }

  getLogsCount() {
    return this.logs.length;
  }
}
