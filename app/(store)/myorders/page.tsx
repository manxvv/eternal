"use client";

import Link from "next/link";
import {  Order, useMyOrders } from "@/hooks/useOrders"; // Using your provided hook
import { useAuthStore } from "@/store/useAuthStore";

export default function OrderHistoryPage() {
  const { user } = useAuthStore();
  const { data: orders, isLoading } = useMyOrders();

  // Loading Skeleton
  const Skeleton = () => (
    <div className="space-y-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-48 w-full bg-brand-blue/5 animate-pulse rounded-sm" />
      ))}
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream pt-20 px-6">
        <div className="text-center">
          <h1 className="font-cormorant text-4xl text-brand-blue mb-6">Access Restricted</h1>
          <Link href="/login" className="bg-brand-blue text-brand-gold px-8 py-3 uppercase tracking-widest text-[10px] font-bold">
            Sign In to View History
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-brand-cream min-h-screen">
      {/* HEADER */}
      <section className="pt-40 pb-20 bg-brand-blue text-center px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6">
            The Eternal Archive
          </p>
          <h1 className="font-cormorant text-6xl md:text-7xl text-white">
            Your Orders
          </h1>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-20 max-w-[1200px] mx-auto">
        {isLoading ? (
          <Skeleton />
        ) : !orders || orders.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-brand-blue/10 bg-white/50">
            <h2 className="font-cormorant text-3xl text-brand-blue/30 italic mb-8">
              No orders found in your history.
            </h2>
            <Link href="/tea" className="bg-brand-blue text-brand-gold px-12 py-5 uppercase tracking-widest text-[11px] font-bold">
              Explore the Collection
            </Link>
          </div>
        ) : (
          <div className="space-y-16">
            {orders.map((order: Order) => (
              <div key={order._id} className="group">
                {/* ORDER META INFO */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 pb-4 border-b border-brand-blue/10 gap-4">
                  <div>
                    <p className="text-[10px] font-mono text-brand-blue/40 uppercase mb-2">
                      Ref ID: {order._id.toUpperCase()}
                    </p>
                    <h3 className="font-cormorant text-2xl text-brand-blue">
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { 
                        day: 'numeric', month: 'long', year: 'numeric' 
                      })}
                    </h3>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="text-right">
                      <p className="text-[9px] uppercase tracking-widest font-bold text-brand-blue/40 mb-1">Status</p>
                      <div className="flex gap-2">
                        <span className={`text-[9px] uppercase tracking-tighter px-3 py-1 font-bold border ${
                          order.isPaid ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"
                        }`}>
                          {order.isPaid ? "Paid" : "Unpaid"}
                        </span>
                        <span className={`text-[9px] uppercase tracking-tighter px-3 py-1 font-bold border ${
                          order.isDelivered ? "bg-brand-blue text-white border-brand-blue" : "bg-white text-brand-blue/40 border-brand-blue/10"
                        }`}>
                          {order.isDelivered ? "Delivered" : "Processing"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ORDER CONTENT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-8 shadow-sm border border-brand-blue/5">
                  
                  {/* Items List (Left) */}
                  <div className="lg:col-span-8 space-y-8">
                    {order.orderItems.map((item) => (
                      <div key={item._id} className="flex gap-6 items-center">
                        <div className="w-20 h-20 bg-brand-cream flex-shrink-0 border border-brand-blue/5 relative overflow-hidden">
                          <img 
                            src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`} 
                            alt={item.name}
                            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-cormorant text-xl text-brand-blue">{item.name}</h4>
                          <p className="text-[10px] text-brand-gold font-bold uppercase tracking-[0.2em] mt-1">
                            {item.quantity} Unit{item.quantity > 1 ? 's' : ''} — ₹{item.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right hidden sm:block">
                           <p className="font-cormorant text-xl text-brand-blue">
                             ₹{(item.price * item.quantity).toLocaleString()}
                           </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Sidebar (Right) */}
                  <div className="lg:col-span-4 lg:border-l lg:border-brand-blue/5 lg:pl-8 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-brand-gold mb-4">Ship to</p>
                      <p className="font-cormorant text-lg text-brand-blue leading-tight mb-1">
                        {user.name}
                      </p>
                      <p className="text-sm text-brand-blue/60 italic">
                        {order.shippingAddress.city}, {order.shippingAddress.state}
                      </p>
                    </div>

                    <div className="mt-10 pt-6 border-t border-brand-blue/5">
                      <div className="flex justify-between items-end">
                         <span className="text-[10px] uppercase tracking-widest font-bold text-brand-blue/40">Grand Total</span>
                         <span className="font-cormorant text-3xl text-brand-blue">₹{order.totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER CALLOUT */}
      <section className="py-32 text-center">
        <div className="h-px w-24 bg-brand-gold mx-auto mb-12 opacity-30" />
        <h2 className="font-cormorant text-3xl text-brand-blue mb-6 italic">Building your personal collection.</h2>
        <Link href="/tea" className="text-brand-blue uppercase tracking-[0.3em] text-[10px] font-bold border-b border-brand-blue pb-2 hover:text-brand-gold hover:border-brand-gold transition-colors">
          Return to Shop
        </Link>
      </section>
    </main>
  );
}