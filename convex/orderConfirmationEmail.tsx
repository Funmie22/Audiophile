import * as React from "react";
import type { Doc } from "./_generated/dataModel";

interface OrderConfirmationEmailProps {
  order: Doc<"orders">;
}

export default function OrderConfirmationEmail({ order }: OrderConfirmationEmailProps) {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  return (
    <div
      style={{
        backgroundColor: "#f1f1f1",
        fontFamily:
          '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
        padding: "20px",
      }}
    >
      <div
        style={{
          margin: "0 auto",
          padding: "20px 30px 40px",
          width: "580px",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
        }}
      >
        {/* Header */}
        <h1 style={{ color: "#111", textAlign: "center" }}>Order Confirmation</h1>
        <p>Dear {order.name || "Customer"},</p>
        <p>
          Thank you for your order! Your order number is:{" "}
          <strong>{order._id}</strong>.
        </p>
        <p>We will process your order shortly.</p>

        {/* Order Details */}
        <div style={{ marginTop: "30px" }}>
          <h2
            style={{
              borderBottom: "2px solid #f1f1f1",
              paddingBottom: "5px",
              color: "#333",
            }}
          >
            Order Details
          </h2>

          <table
            width="100%"
            style={{
              borderCollapse: "collapse",
              marginTop: "10px",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr>
                <th
                  align="left"
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "8px",
                    fontWeight: "bold",
                  }}
                >
                  Item
                </th>
                <th
                  align="center"
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "8px",
                    fontWeight: "bold",
                  }}
                >
                  Quantity
                </th>
                <th
                  align="right"
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "8px",
                    fontWeight: "bold",
                  }}
                >
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {order.items?.length ? (
                order.items.map((item) => (
                  <tr key={item.id}>
                    <td style={{ padding: "8px 0" }}>{item.shortName}</td>
                    <td align="center" style={{ padding: "8px 0" }}>
                      {item.quantity}
                    </td>
                    <td align="right" style={{ padding: "8px 0" }}>
                      {formatCurrency(item.price)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      color: "#888",
                    }}
                  >
                    No items found in your order.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Totals */}
          <div
            style={{
              marginTop: "20px",
              lineHeight: "1.6",
              textAlign: "right",
              fontSize: "14px",
            }}
          >
            <p>Subtotal: {formatCurrency(order.total || 0)}</p>
            <p>Shipping: {formatCurrency(order.shipping || 0)}</p>
            <p>VAT: {formatCurrency(order.vat || 0)}</p>
            <p>
              <strong>
                Grand Total: {formatCurrency(order.grandTotal || 0)}
              </strong>
            </p>
          </div>
        </div>

        {/* Shipping Details */}
        <div style={{ marginTop: "30px" }}>
          <h2
            style={{
              borderBottom: "2px solid #f1f1f1",
              paddingBottom: "5px",
              color: "#333",
            }}
          >
            Shipping Details
          </h2>
          <p>{order.name}</p>
          <p>{order.address}</p>
          <p>
            {order.city}, {order.zip}
          </p>
          <p>{order.country}</p>
          <p>Phone: {order.phone}</p>
        </div>

        {/* Footer */}
        <footer
          style={{
            marginTop: "40px",
            fontSize: "13px",
            color: "#777",
            borderTop: "1px solid #eee",
            paddingTop: "15px",
            textAlign: "center",
          }}
        >
          <p>
            If you have any questions, reply to this email or contact us at{" "}
            <a href="mailto:support@example.com" style={{ color: "#007bff" }}>
              support@example.com
            </a>
            .
          </p>
          <p>Thank you for shopping with us!</p>
        </footer>
      </div>
    </div>
  );
}
