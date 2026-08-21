import formatPrice, { calculateItemTotal, applyDiscount } from "./helpers.js";

const items = [
  { price: 100, quantity: 2 },   // 200
  { price: 50, quantity: 3 },     // 150
  { price: "20", quantity: 1 }    // 0 (price مش رقم فعلي! نص بدل رقم)
];
for (const item of items) {
  const itemTotal = calculateItemTotal(item.price, item.quantity);
  const discountedTotal = applyDiscount(itemTotal, 10); // Apply a 10% discount
  const formattedPrice = formatPrice(discountedTotal);
  console.log(formattedPrice);
}

const finalTotal = formatPrice(
  applyDiscount(
    items.reduce((acc, item) => acc + calculateItemTotal(item.price, item.quantity), 0),
    10
  )
);
console.log(finalTotal);   // "$315.00"