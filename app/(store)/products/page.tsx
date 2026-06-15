// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useCartStore } from "@/store/useCartStore";
// import { useAuthStore } from "@/store/useAuthStore";

// const products = [
//   {
//     id: "everyday-assam-100g",
//     name: "Everyday Assam Tea",
//     subtitle: "Classic Bold Blend",
//     weight: "100g",
//     price: 349,
//     image: "/everyday_assam_tea_product_front.jpeg",
//     hoverImage: "/everyday_assam_tea_product_back.jpeg",
//     desc: "Begin each morning with this bold, malty companion. Sourced from Assam's finest estates.",
//     note: "Best served: With whole milk",
//     category: "tea",
//     badge: "Bestseller",
//   },
//   {
//     id: "majestic-assam-100g",
//     name: "Majestic Assam Tea",
//     subtitle: "Single Estate Reserve",
//     weight: "100g",
//     price: 499,
//     image: "/majestic_assam_tea_product_front.jpeg",
//     hoverImage: "/majestic_assam_tea_product_back.jpeg",
//     desc: "Rich and full-bodied, from single-garden estates. A tea for moments that deserve ceremony.",
//     note: "Best served: Black, steeped 4 min",
//     category: "tea",
//     badge: "Premium",
//   },
//   // ... (Add other items as needed)
// ];

// function ProductCard({ product }: { product: typeof products[0] }) {
//   const { user } = useAuthStore();
//   const { addItem, items } = useCartStore();
//   const [hovered, setHovered] = useState(false);
//   const [added, setAdded] = useState(false);

//   const inCart = items.find((i) => i.id === product.id);

//   const handleAddToCart = () => {
//     if (!user) return;
//     addItem({
//       id: product.id,
//       name: `${product.name} (${product.weight})`,
//       price: product.price,
//       image: product.image,
//     });
//     setAdded(true);
//     setTimeout(() => setAdded(false), 1800);
//   };

//   return (
//     <div 
//       className="group bg-white border border-brand-blue/5 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-blue/5"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {/* Image Area */}
//       <div className="relative aspect-[4/5] overflow-hidden bg-brand-cream">
//         <Image
//           src={hovered ? product.hoverImage : product.image}
//           alt={product.name}
//           fill
//           className="object-cover transition-transform duration-1000 group-hover:scale-105"
//           sizes="(max-width: 768px) 100vw, 33vw"
//         />
        
//         {product.badge && (
//           <div className="absolute top-4 left-4 bg-brand-blue text-brand-gold text-[9px] uppercase tracking-widest px-3 py-1.5 font-bold z-10">
//             {product.badge}
//           </div>
//         )}

//         {/* Hover Overlay for Quick Action */}
//         {!user && hovered && (
//           <Link href="/login" className="absolute inset-0 bg-brand-blue/40 backdrop-blur-[2px] flex items-center justify-center p-6 animate-fade-in">
//              <span className="bg-white text-brand-blue text-[10px] uppercase tracking-widest font-bold py-3 px-6 shadow-xl">
//                Sign in to Shop
//              </span>
//           </Link>
//         )}
//       </div>

//       {/* Content Area */}
//       <div className="p-8">
//         <div className="flex items-center gap-2 mb-4">
//           <div className="h-[1px] w-6 bg-brand-gold"></div>
//           <p className="text-[9px] uppercase tracking-[0.2em] text-brand-gold font-bold">
//             {product.subtitle}
//           </p>
//         </div>

//         <h3 className="font-cormorant text-2xl text-brand-blue mb-1 leading-tight">
//           {product.name}
//         </h3>
//         <p className="text-[11px] text-brand-blue/40 font-dmsans mb-4 italic">
//           Weight: {product.weight}
//         </p>
        
//         <p className="text-brand-blue/60 text-sm leading-relaxed mb-6 line-clamp-2">
//           {product.desc}
//         </p>

//         <div className="flex items-center justify-between mt-auto pt-6 border-t border-brand-blue/5">
//           <p className="font-cormorant text-2xl text-brand-blue font-light">
//             ₹{product.price.toLocaleString()}
//           </p>

//           {user && (
//             <button
//               onClick={handleAddToCart}
//               className={`px-6 py-3 text-[10px] uppercase tracking-widest font-bold transition-all duration-300 border
//                 ${added 
//                   ? "bg-brand-gold border-brand-gold text-brand-blue" 
//                   : "bg-brand-blue border-brand-blue text-brand-gold hover:bg-white hover:text-brand-blue"}
//               `}
//             >
//               {added ? "Added ✓" : inCart ? `In Cart (${inCart.quantity})` : "Add to Cart"}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function ProductsPage() {
//   const { user } = useAuthStore();
//   const [filter, setFilter] = useState("all");

//   const filtered = filter === "all" ? products : products.filter((p) => p.category === filter);

//   return (
//     <main className="bg-brand-cream min-h-screen">
      
//       {/* ── HERO SECTION ────────────────────────────────── */}
//       <section className="relative pt-40 pb-24 text-center overflow-hidden bg-brand-blue">
//         {/* Banner Background */}
//         <div className="absolute inset-0 opacity-20">
//           <img src="/everyday_assam_tea_product_banner.jpeg" className="w-full h-full object-cover" alt="Banner" />
//         </div>
        
//         <div className="container mx-auto px-6 relative z-10">
//           <p className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6">The Eternal Atelier</p>
//           <h1 className="font-cormorant text-6xl md:text-8xl text-white mb-8">Our Products</h1>
//           <p className="font-cormorant italic text-xl text-white/60 max-w-lg mx-auto mb-10">
//             Teas & accessories crafted for life's finest moments.
//           </p>

//           {!user && (
//             <div className="inline-flex items-center gap-4 bg-white/5 border border-brand-gold/30 px-6 py-4 backdrop-blur-sm">
//               <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></div>
//               <p className="text-[11px] text-brand-gold uppercase tracking-widest font-bold">
//                 <Link href="/login" className="underline underline-offset-4">Sign in</Link> to build your collection.
//               </p>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* ── FILTER BAR ────────────────────────────────── */}
//       <nav className="sticky top-[80px] z-40 bg-white border-b border-brand-blue/5 overflow-x-auto">
//         <div className="container mx-auto flex justify-center whitespace-nowrap">
//           {[["all", "All"], ["tea", "Teas"], ["coffee", "Coffee"], ["accessories", "Accessories"]].map(([val, label]) => (
//             <button
//               key={val}
//               onClick={() => setFilter(val)}
//               className={`px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-bold transition-all border-b-2 
//                 ${filter === val ? "border-brand-gold text-brand-blue" : "border-transparent text-brand-blue/40 hover:text-brand-blue"}
//               `}
//             >
//               {label}
//             </button>
//           ))}
//         </div>
//       </nav>

//       {/* ── PRODUCT GRID ─────────────────────────────── */}
//       <section className="py-24 container mx-auto px-6 lg:px-20">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {filtered.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>

//         {filtered.length === 0 && (
//           <div className="py-40 text-center">
//             <h3 className="font-cormorant text-3xl text-brand-blue/20 italic">Coming Soon to the Atelier</h3>
//           </div>
//         )}
//       </section>

//       {/* ── FEATURED PROMO ───────────────────────────── */}
//       <section className="relative py-40 flex items-center bg-brand-blue overflow-hidden">
//         <Image 
//           src="/majestic_assam_tea_product_banner.jpeg" 
//           alt="Majestic" 
//           fill 
//           className="object-cover opacity-40" 
//         />
//         <div className="container mx-auto px-6 lg:px-20 relative z-10">
//           <div className="max-w-xl">
//              <p className="text-brand-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-6">Estate Reserve</p>
//              <h2 className="font-cormorant text-5xl md:text-6xl text-white mb-8 leading-tight">
//                Majestic Assam <br /> <span className="italic text-brand-gold text-4xl">Single Estate</span>
//              </h2>
//              <p className="text-white/60 mb-10 leading-relaxed text-lg">
//                Sourced from high-altitude gardens where the air is thin and the flavor is bold. A masterpiece of Indian tea heritage.
//              </p>
//              <Link href="/tea" className="bg-brand-gold text-brand-blue px-12 py-5 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-all">
//                Discover the Reserve
//              </Link>
//           </div>
//         </div>
//       </section>

//       {/* ── BULK CTA ─────────────────────────────────── */}
//       <section className="py-24 bg-white text-center">
//         <div className="max-w-2xl mx-auto px-6">
//            <h2 className="font-cormorant text-4xl text-brand-blue mb-6">Corporate Gifting</h2>
//            <p className="text-brand-blue/60 mb-10 text-sm leading-relaxed">
//              Elevate your brand with the art of slow luxury. Custom packaging and bulk pricing available for global delivery.
//            </p>
//            <Link href="/bulk" className="text-brand-blue font-bold text-xs uppercase tracking-widest border-b-2 border-brand-gold pb-2">
//              Enquire About Gifting
//            </Link>
//         </div>
//       </section>
//     </main>
//   );
// }


import React from 'react'

function page() {
  return (
    <div>
      page
    </div>
  )
}

export default page
