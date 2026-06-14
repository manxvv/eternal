// app/(admin)/admin/page.tsx

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-serif text-brand-blue">Admin Dashboard</h1>
      <p className="text-brand-blue/60">Welcome to the Eternal management suite.</p>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 border border-brand-blue/5 shadow-sm">
          <p className="text-[10px] uppercase tracking-widest text-brand-blue/40 font-bold">Total Sales</p>
          <p className="text-2xl font-serif text-brand-blue">₹0.00</p>
        </div>
        <div className="bg-white p-6 border border-brand-blue/5 shadow-sm">
          <p className="text-[10px] uppercase tracking-widest text-brand-blue/40 font-bold">New Orders</p>
          <p className="text-2xl font-serif text-brand-blue">0</p>
        </div>
        <div className="bg-white p-6 border border-brand-blue/5 shadow-sm">
          <p className="text-[10px] uppercase tracking-widest text-brand-blue/40 font-bold">Inventory</p>
          <p className="text-2xl font-serif text-brand-blue">7 Items</p>
        </div>
      </div>
    </div>
  );
}