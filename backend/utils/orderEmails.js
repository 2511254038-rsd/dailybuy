const itemsRows = (items) =>
  items
    .map(
      (i) => `<tr><td>${i.title}</td><td>${i.quantity}</td><td>৳${i.price}</td></tr>`
    )
    .join("");

export const orderReceivedTemplate = (name, order) => `
  <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
    <h2>Thanks for your order, ${name}!</h2>
    <p>Order #${order._id}</p>
    <table border="1" cellpadding="6" style="border-collapse: collapse; width: 100%;">
      <tr><th>Item</th><th>Qty</th><th>Price</th></tr>
      ${itemsRows(order.items)}
    </table>
    <p><strong>Total: ৳${order.total}</strong></p>
    <p>Payment method: ${order.paymentMethod.toUpperCase()}</p>
  </div>
`;

export const newOrderAdminTemplate = (order) => `
  <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
    <h2>New order #${order._id}</h2>
    <table border="1" cellpadding="6" style="border-collapse: collapse; width: 100%;">
      <tr><th>Item</th><th>Qty</th><th>Price</th></tr>
      ${itemsRows(order.items)}
    </table>
    <p><strong>Total: ৳${order.total}</strong></p>
    <p>Payment: ${order.paymentMethod.toUpperCase()} — ${order.paymentStatus}</p>
  </div>
`;

export const orderConfirmedTemplate = (name, order) => `
  <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
    <h2>Your order is confirmed, ${name}!</h2>
    <p>Order #${order._id} has been verified and is being prepared for shipping.</p>
  </div>
`;