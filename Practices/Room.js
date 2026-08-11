export default class Room {
  #pricePerNight;
  #bookedDates = new Set();
  static totalRoomsCreated=0; 
  constructor(roomNumber, pricePerNight) {
    this.roomNumber = roomNumber;
    this.#pricePerNight = pricePerNight;
    Room.totalRoomsCreated++;
  }
  book(date) {
    if (this.#bookedDates.has(date)) return false;
    else {
      this.#bookedDates.add(date);
      return true;
    }
  }
  isAvailable(date) {
    if (this.#bookedDates.has(date)) return false;
    else return true;
  }
  getPrice(){
    return this.#pricePerNight;
  }
}
