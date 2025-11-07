
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    zip: v.string(),
    city: v.string(),
    country: v.string(),
    paymentMethod: v.union(v.literal("e-money"), v.literal("cash")),
    eMoneyNumber: v.optional(v.string()),
    eMoneyPin: v.optional(v.string()),
    items: v.array(v.object({
        id: v.number(),
        shortName: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
    })),
    total: v.number(),
    shipping: v.number(),
    vat: v.number(),
    grandTotal: v.number(),
    // Optional metadata
    status: v.optional(v.string()),
    createdAt: v.optional(v.number()),
  }).index("by_email", ["email"]),
});
