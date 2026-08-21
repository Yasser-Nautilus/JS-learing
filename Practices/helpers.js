export function calculateItemTotal(price, quantity) {
  if (typeof price === Number && typeof quantity === Number) {
    return price * quantity;
  } else return 0;
}
