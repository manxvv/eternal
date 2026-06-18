"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import {
  useCartItems,
  useCartTotalPrice,
  useShippingFee,
  useGrandTotal,
} from "@/store/useCartStore";
import {
  useCart,
  useUpdateQuantity,
  useRemoveFromCart,
  useClearCart,
} from "@/hooks/useCart";
import api from "@/lib/axios";
import toast from "react-hot-toast";

interface AddressForm {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

const EMPTY_ADDRESS: AddressForm = {
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
};

// Dynamically load Razorpay script
function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CartPage() {
  const { user } = useAuthStore();
  const items = useCartItems();
  const totalPrice = useCartTotalPrice();
  const shippingFee = useShippingFee();
  const grandTotal = useGrandTotal();

  const { isLoading: cartLoading } = useCart();
  const { mutateAsync: updateQuantity } = useUpdateQuantity();
  const { mutateAsync: removeItem } = useRemoveFromCart();
  const { mutateAsync: clearCart } = useClearCart();

  const [ordered, setOrdered] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [address, setAddress] = useState<AddressForm>(EMPTY_ADDRESS);
  const [addressError, setAddressError] = useState<string | null>(null);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setAddressError(null);
  };

  const validateAddress = (): boolean => {
    const required: (keyof AddressForm)[] = [
      "fullName", "phone", "addressLine1", "city", "state", "pincode",
    ];
    for (const field of required) {
      if (!address[field].trim()) {
        setAddressError("Please fill in all required fields.");
        return false;
      }
    }
    if (!/^\d{10}$/.test(address.phone)) {
      setAddressError("Please enter a valid 10-digit phone number.");
      return false;
    }
    if (!/^\d{6}$/.test(address.pincode)) {
      setAddressError("Please enter a valid 6-digit pincode.");
      return false;
    }
    return true;
  };

  const handleCheckout = async () => {
    if (!validateAddress()) return;
    setIsProcessing(true);

    try {
      // 1. Load Razorpay SDK
      const loaded = await loadRazorpay();
      if (!loaded) {
        alert("Failed to load payment gateway. Please check your connection.");
        setIsProcessing(false);
        return;
      }

      // 2. Create Razorpay order from your backend
      const { data } = await api.post("/payment/create-order", {
        amount: grandTotal, // backend will multiply by 100 for paise
      });
      // data = { orderId, amount, currency, key }

      // 3. Open Razorpay modal
      const options = {
        key: data.key,
        amount: data.amount,          // in paise — from backend
        currency: data.currency,
        name: "Eternal Atelier",
        description: `Order of ${items.length} item${items.length > 1 ? "s" : ""}`,
        order_id: data.orderId,

        prefill: {
          name: address.fullName,
          email: user?.email ?? "",
          contact: address.phone,
        },

        notes: {
          address_line1: address.addressLine1,
          address_line2: address.addressLine2,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
        },

        theme: { color: "#1B2B4B" },  // brand-blue

        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          // 4. Verify payment + create order on backend
          await api.post("/payment/verify", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            shippingAddress: address,
            orderItems: items.map((i) => ({
              product: i._id,
              quantity: i.quantity,
              price: i.price,
            })),
            totalPrice: grandTotal,
          });

          await clearCart();
          setOrdered(true);
        },

        modal: {
          ondismiss: () => setIsProcessing(false),
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", (response: any) => {
        // console.error("Payment failed:", response.error);
        toast.error(`Payment failed: ${response.error.description}`)
        // alert(`Payment failed: ${response.error.description}`);
        setIsProcessing(false);
      });
      rzp.open();

    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error("Could not initiate payment. Please try again.");
      setIsProcessing(false);
    }
  };

  // ── UNAUTHORIZED ──
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream pt-20 px-6">
        <div className="text-center max-w-md">
          <p className="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-4">
            Your Selection
          </p>
          <h1 className="font-cormorant text-5xl text-brand-blue mb-6">
            Sign in to view cart
          </h1>
          <p className="text-brand-blue/60 text-sm mb-10 leading-relaxed">
            Your curated collection awaits. Please sign in to manage your ritual items.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" className="bg-brand-blue text-brand-gold px-10 py-4 uppercase tracking-widest text-[11px] font-bold">
              Sign In
            </Link>
            <Link href="/register" className="border border-brand-blue text-brand-blue px-10 py-4 uppercase tracking-widest text-[11px] font-bold hover:bg-brand-blue hover:text-white transition-all">
              Join the Atelier
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── ORDER PLACED ──
  if (ordered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream pt-20 px-6">
        <div className="text-center max-w-lg">
          <div className="w-16 h-16 border border-brand-gold rounded-full flex items-center justify-center mx-auto mb-8">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EAD292" strokeWidth="1.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-4">
            Order Confirmed
          </p>
          <h1 className="font-cormorant text-5xl text-brand-blue mb-6">
            Thank you, {user.name.split(" ")[0]}.
          </h1>
          <p className="text-brand-blue/60 text-sm leading-loose mb-10">
            Your selection has been received. Your ritual begins soon.
          </p>
          <Link href="/tea" className="bg-brand-blue text-brand-gold px-12 py-5 uppercase tracking-widest text-[11px] font-bold">
            Continue Exploration
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-brand-cream min-h-screen">
      <section className="pt-40 pb-20 bg-brand-blue text-center px-6">
        <div className="max-w-[1280px] mx-auto">
          <p className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6">
            Atelier Review
          </p>
          <h1 className="font-cormorant text-6xl md:text-7xl text-white">
            Your Cart
          </h1>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-20 max-w-[1280px] mx-auto">
        {cartLoading ? (
          <div className="flex flex-col gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white p-8 h-32 rounded" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="font-cormorant text-3xl text-brand-blue/30 italic mb-8">
              Your cart is currently empty.
            </h2>
            <Link href="/tea" className="bg-brand-blue text-brand-gold px-12 py-5 uppercase tracking-widest text-[11px] font-bold">
              Shop the Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            {/* ── LEFT COLUMN ── */}
            <div className="lg:col-span-8 flex flex-col gap-10">

              {/* Cart Items */}
              <div className="border-t border-brand-blue/10">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr_auto] gap-4 sm:gap-8 py-8 border-b border-brand-blue/10 items-start sm:items-center"
                  >
                    <div className="relative aspect-square bg-white overflow-hidden shadow-sm rounded-sm">
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${item.images[0]}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="font-cormorant text-xl sm:text-2xl text-brand-blue mb-1">
                        {item.name}
                      </h3>
                      <p className="text-[11px] font-bold text-brand-gold uppercase tracking-widest mb-4">
                        ₹{item.price.toLocaleString()}
                      </p>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center border border-brand-blue/10">
                          <button
                            onClick={() => updateQuantity({ productId: item._id, quantity: item.quantity - 1 })}
                            className="w-9 h-9 flex items-center justify-center text-brand-blue hover:bg-brand-blue/5 text-lg"
                          >
                            −
                          </button>
                          <span className="w-9 text-center text-xs font-bold text-brand-blue">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity({ productId: item._id, quantity: item.quantity + 1 })}
                            className="w-9 h-9 flex items-center justify-center text-brand-blue hover:bg-brand-blue/5 text-lg"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="text-[10px] uppercase tracking-widest text-red-800/40 hover:text-red-800 font-bold underline underline-offset-4"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Line total — hidden on mobile, shown on sm+ */}
                    <p className="hidden sm:block font-cormorant text-2xl text-brand-blue text-right">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* ── SHIPPING ADDRESS ── */}
              <div className="bg-white p-8 sm:p-10 border border-brand-blue/5">
                <h4 className="font-cormorant text-2xl text-brand-blue mb-8 border-b border-brand-blue/5 pb-4">
                  Delivery Address
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-blue/50 mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="fullName"
                      value={address.fullName}
                      onChange={handleAddressChange}
                      placeholder="As per delivery address"
                      className="w-full border border-brand-blue/10 px-4 py-3 text-sm text-brand-blue placeholder:text-brand-blue/20 focus:outline-none focus:border-brand-blue/30 bg-brand-cream/30"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-blue/50 mb-2">
                      Phone <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="phone"
                      value={address.phone}
                      onChange={handleAddressChange}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="w-full border border-brand-blue/10 px-4 py-3 text-sm text-brand-blue placeholder:text-brand-blue/20 focus:outline-none focus:border-brand-blue/30 bg-brand-cream/30"
                    />
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-blue/50 mb-2">
                      Pincode <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="pincode"
                      value={address.pincode}
                      onChange={handleAddressChange}
                      placeholder="6-digit pincode"
                      maxLength={6}
                      className="w-full border border-brand-blue/10 px-4 py-3 text-sm text-brand-blue placeholder:text-brand-blue/20 focus:outline-none focus:border-brand-blue/30 bg-brand-cream/30"
                    />
                  </div>

                  {/* Address Line 1 */}
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-blue/50 mb-2">
                      Address Line 1 <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="addressLine1"
                      value={address.addressLine1}
                      onChange={handleAddressChange}
                      placeholder="House / Flat no., Building, Street"
                      className="w-full border border-brand-blue/10 px-4 py-3 text-sm text-brand-blue placeholder:text-brand-blue/20 focus:outline-none focus:border-brand-blue/30 bg-brand-cream/30"
                    />
                  </div>

                  {/* Address Line 2 */}
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-blue/50 mb-2">
                      Address Line 2 <span className="text-brand-blue/20">(optional)</span>
                    </label>
                    <input
                      name="addressLine2"
                      value={address.addressLine2}
                      onChange={handleAddressChange}
                      placeholder="Landmark, Area"
                      className="w-full border border-brand-blue/10 px-4 py-3 text-sm text-brand-blue placeholder:text-brand-blue/20 focus:outline-none focus:border-brand-blue/30 bg-brand-cream/30"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-blue/50 mb-2">
                      City <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="city"
                      value={address.city}
                      onChange={handleAddressChange}
                      placeholder="City"
                      className="w-full border border-brand-blue/10 px-4 py-3 text-sm text-brand-blue placeholder:text-brand-blue/20 focus:outline-none focus:border-brand-blue/30 bg-brand-cream/30"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-blue/50 mb-2">
                      State <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="state"
                      value={address.state}
                      onChange={handleAddressChange}
                      placeholder="State"
                      className="w-full border border-brand-blue/10 px-4 py-3 text-sm text-brand-blue placeholder:text-brand-blue/20 focus:outline-none focus:border-brand-blue/30 bg-brand-cream/30"
                    />
                  </div>
                </div>

                {addressError && (
                  <p className="mt-4 text-red-500 text-xs font-medium">{addressError}</p>
                )}
              </div>
            </div>

            {/* ── SUMMARY (RIGHT) ── */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="bg-white p-8 sm:p-10 border border-brand-blue/5 shadow-2xl shadow-brand-blue/5">
                <h4 className="font-cormorant text-2xl text-brand-blue mb-8 border-b border-brand-blue/5 pb-4">
                  Summary
                </h4>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-blue/50 uppercase tracking-widest text-[10px] font-bold">
                      Subtotal
                    </span>
                    <span className="text-brand-blue font-medium">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-blue/50 uppercase tracking-widest text-[10px] font-bold">
                      Shipping
                    </span>
                    <span className={`font-bold ${shippingFee === 0 ? "text-green-700" : "text-brand-gold"}`}>
                      {shippingFee === 0 ? "Complimentary" : `₹${shippingFee}`}
                    </span>
                  </div>
                  {shippingFee > 0 && (
                    <p className="text-[10px] text-brand-blue/30 leading-relaxed">
                      Add ₹{(999 - totalPrice).toLocaleString()} more for free shipping
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-end border-t border-brand-blue/5 pt-6 mb-8">
                  <span className="text-brand-blue uppercase tracking-[0.2em] text-[11px] font-bold">
                    Total
                  </span>
                  <span className="font-cormorant text-4xl text-brand-blue">
                    ₹{grandTotal.toLocaleString()}
                  </span>
                </div>

                {/* Razorpay badge */}
                <p className="text-[10px] text-brand-blue/30 uppercase tracking-widest text-center mb-6">
                  Secured by Razorpay
                </p>

                <button
                  disabled={isProcessing}
                  onClick={handleCheckout}
                  className={`w-full py-5 uppercase tracking-[0.2em] text-[11px] font-bold shadow-xl transition-all
                    ${isProcessing
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-brand-blue text-brand-gold hover:bg-brand-blue/90 shadow-brand-blue/10"
                    }`}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Proceed to Pay"
                  )}
                </button>
              </div>
            </div>

          </div>
        )}
      </section>
    </main>
  );
}