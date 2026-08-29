import { nanoid } from 'nanoid';

export class UrlStore {
  constructor() {
    this.store = new Map();
  }

  shorten(longUrl) {
    const code = nanoid(6);
    this.store.set(code, longUrl);
    return code;
  }

  resolve(code) {
    return this.store.get(code);
  }
}