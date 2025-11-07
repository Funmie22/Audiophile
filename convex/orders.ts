// convex/orders.ts
import { mutation, action, query } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";

export const createOrder = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const orderId = await ctx.db.insert("orders", {
      ...args,
      status: "pending",
      createdAt: Date.now(),
    });
    
    // Schedule email (commented out until Resend is set up)
    // await ctx.scheduler.runAfter(0, api.orders.sendConfirmationEmail, {
    //   orderId: orderId,
    // });

    return orderId;
  },
});

// Simple email function without Resend for now
export const sendConfirmationEmail: any = action({
  args: {
    orderId: v.id("orders"),
  },
  handler: async (ctx, args): Promise<any> => {
    const order: any = await ctx.runQuery(api.orders.getOrder, { orderId: args.orderId });

    if (!order) {
      console.error(`Order with ID ${args.orderId} not found.`);
      return;
    }

    // Log email instead of sending for now
    console.log(`📧 Would send confirmation email to: ${order.email}`);
    console.log(`📦 Order details: ${order.items.length} items, Total: $${order.grandTotal}`);
    
    return { success: true, email: order.email, orderId: order._id };
  },
});

export const getOrder = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, { orderId }) => {
    return await ctx.db.get(orderId);
  },
});

export const getAllOrders = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("orders").collect();
  },
});