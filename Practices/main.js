import Room from "./Room.js";
const hotel = new Map();

function addRoom(roomNumber, price) {
  const room = new Room(roomNumber, price);
  hotel.set(roomNumber, room);
}
function bookRoom(roomNumber, date) {
  if (!hotel.has(roomNumber)) return false;
  else {
    const room = hotel.get(roomNumber);
    return room.book(date);
  }
}

addRoom(101, 500);
addRoom(102, 800);

console.log(bookRoom(101, "2026-08-15")); // true
console.log(bookRoom(101, "2026-08-15")); // false (محجوزة بالفعل)
console.log(bookRoom(101, "2026-08-16")); // true (تاريخ مختلف، متاح)
console.log(bookRoom(999, "2026-08-15")); // false (الغرفة مش موجودة أصلاً)

console.log(hotel.get(101).isAvailable("2026-08-15")); // false
console.log(hotel.get(101).isAvailable("2026-08-20")); // true
console.log(hotel.get(101).getPrice()); // 500

console.log(Room.totalRoomsCreated); // 2
