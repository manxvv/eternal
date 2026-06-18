"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useDeliverOrder, useOrder } from "@/hooks/useOrders";
import { format } from "date-fns";
import toast from "react-hot-toast";

export default function OrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // ── DATA FETCHING ──
  const { data: order, isLoading, error } = useOrder(id as string);
  
  // ── MUTATION FOR DELIVERY ──
  const { mutate: deliverOrder, isPending: isDelivering } = useDeliverOrder();

  const handleDeliver = () => {
    if (window.confirm("Are you sure you want to mark this consignment as dispatched?")) {
      deliverOrder(id as string);
    }
  };

  // ── LOADING STATE ──
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--cream)" }}>
        <p className="font-display italic text-lg animate-pulse" style={{ color: "var(--charcoal)", opacity: 0.6 }}>
          Opening Registry...
        </p>
      </div>
    );
  }

  // ── ERROR STATE ──
  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "var(--cream)" }}>
        <p className="font-display text-xl mb-4 text-brand-blue">Manifest not found.</p>
        <button 
          onClick={() => router.push("/admin/orders")} 
          className="px-8 py-3 bg-brand-blue text-brand-gold uppercase tracking-widest text-[10px] font-bold"
        >
          Return to Registry
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen pb-20" style={{ backgroundColor: "var(--cream)", color: "var(--charcoal)" }}>
      
      {/* ── HEADER SECTION ── */}
      <div className="border-b px-6 py-10 md:px-12" style={{ borderColor: "var(--mist)" }}>
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => router.push("/admin/orders")}
            className="text-[10px] uppercase tracking-[0.2em] mb-6 flex items-center gap-2 transition-opacity hover:opacity-60 font-bold"
          >
            ← Back to Registry
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold">Order Record</span>
              <h1 className="font-display text-4xl md:text-5xl mt-2 italic text-brand-blue">
                #{order._id.slice(-8).toUpperCase()}
              </h1>
              <p className="text-[11px] uppercase tracking-widest mt-4" style={{ opacity: 0.5 }}>
                Registered on {format(new Date(order.createdAt), "MMMM dd, yyyy")}
              </p>
            </div>

            <div className="flex gap-3">
              <StatusBadge active={order.isPaid} label={order.isPaid ? "Payment Received" : "Payment Pending"} />
              <StatusBadge active={order.isDelivered} label={order.isDelivered ? "Dispatched" : "In Preparation"} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* ── LEFT SIDE: ITEMS & TRANSACTIONS ── */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Consignment Items */}
            <section>
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-8">Consignment Items</h2>
              <div className="border-t border-b" style={{ borderColor: "var(--mist)" }}>
                {order.orderItems.map((item) => (
                  <div 
                    key={item._id} 
                    className="flex items-center gap-8 py-6 border-b last:border-b-0"
                    style={{ borderColor: "var(--mist)" }}
                  >
                    <div className="w-24 h-32 flex-shrink-0 bg-white border overflow-hidden" style={{ borderColor: "var(--mist)" }}>
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`}
                        alt={item.name}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-2xl text-brand-blue">{item.name}</h3>
                      <p className="text-[10px] uppercase tracking-widest mt-2 font-bold" style={{ opacity: 0.6 }}>
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm text-brand-blue">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Digital Signature (Razorpay Details) */}
            <section className="p-8 border bg-white" style={{ borderColor: "var(--mist)" }}>
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-6">Digital Signature</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-[9px] uppercase tracking-widest mb-2 font-bold" style={{ opacity: 0.5 }}>Gateway Order ID</p>
                  <p className="font-mono text-[11px] break-all text-brand-blue">{order.paymentResult?.razorpay_order_id || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest mb-2 font-bold" style={{ opacity: 0.5 }}>Gateway Payment ID</p>
                  <p className="font-mono text-[11px] break-all text-brand-blue">{order.paymentResult?.razorpay_payment_id || "N/A"}</p>
                </div>
              </div>
            </section>
          </div>

          {/* ── RIGHT SIDE: CUSTOMER & SUMMARY ── */}
          <div className="space-y-10">
            
            {/* Customer info */}
            <section className="border-l-2 pl-8 border-brand-gold">
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-4">Customer</h2>
              <p className="font-display text-2xl text-brand-blue">{order.user.name}</p>
              <p className="text-sm italic text-brand-blue/60">{order.user.email}</p>
            </section>

            {/* Shipping info */}
            <section className="border-l-2 pl-8 border-brand-gold">
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-4">Destination</h2>
              <div className="text-sm space-y-1 leading-relaxed text-brand-blue/80">
                <p className="font-medium">{order.shippingAddress.city}</p>
                <p>{order.shippingAddress.state}</p>
                <p className="text-[10px] uppercase tracking-widest pt-4 font-bold opacity-40">India</p>
              </div>
            </section>

            {/* Financial Summary */}
            <section className="p-8 text-white bg-brand-blue shadow-2xl">
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-brand-gold">
                Financial Summary
              </h2>
              <div className="space-y-5">
                <div className="flex justify-between text-xs">
                  <span className="opacity-60 uppercase tracking-widest text-[9px]">Consignment Subtotal</span>
                  <span className="font-bold">₹{order.totalPrice.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="opacity-60 uppercase tracking-widest text-[9px]">Shipping & Handling</span>
                  <span className="uppercase tracking-widest text-[9px] text-brand-gold font-bold">Complimentary</span>
                </div>
                
                <div className="h-px bg-white/10 my-6" />
                
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Grand Total</span>
                  <span className="font-display text-4xl text-brand-gold">₹{order.totalPrice.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <div className="mt-10">
                {!order.isDelivered ? (
                  <button 
                    onClick={handleDeliver}
                    disabled={isDelivering}
                    className="w-full py-4 bg-brand-gold text-brand-blue text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDelivering ? "Updating Registry..." : "Mark as Dispatched"}
                  </button>
                ) : (
                  <div className="border border-brand-gold/30 p-4 text-center">
                    <p className="text-[9px] uppercase tracking-widest text-brand-gold mb-1 font-bold">Dispatched on</p>
                    <p className="font-display text-xl">
                      {order.deliveredAt ? format(new Date(order.deliveredAt), "MMM dd, yyyy") : "Date Unknown"}
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

        </div>
      </div>
    </main>
  );
}

/**
 * Reusable Status Badge Component
 */
function StatusBadge({ active, label }: { active: boolean; label: string }) {
  return (
    <span
      className="px-4 py-2 text-[9px] uppercase tracking-[0.2em] font-bold border transition-colors"
      style={{
        backgroundColor: active ? "var(--gold)" : "transparent",
        color: active ? "var(--cream)" : "var(--charcoal)",
        borderColor: active ? "var(--gold)" : "var(--mist)",
      }}
    >
      {label}
    </span>
  );
}