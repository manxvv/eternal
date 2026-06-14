"use client";
import { useState, useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useQueryClient } from "@tanstack/react-query";
import ProductForm from "../../components/ProductForm";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();

export default function AdminProductsPage() {
  const { productsQuery, deleteMutation } = useProducts();
  const { data: products = [], isLoading } = productsQuery;
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    setIsAdding(false);
    setEditingProduct(null);
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("images", {
        header: "",
        enableSorting: false,
        size: 64,
       cell: (info) => {
  console.log("Images value:", `${process.env.NEXT_PUBLIC_API_URL}${info.getValue()}`);
  // console.log("Full row:", info.row.original);

  return (
    <div className="w-12 h-12 rounded overflow-hidden border border-brandGold/15 bg-brandCream/30">
      <img
        src={`${process.env.NEXT_PUBLIC_API_URL}${info.getValue()?.[0]}`}
        alt=""
        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
      />
    </div>
  );
},
      }),
      columnHelper.accessor("name", {
        header: "Product",
        cell: (info) => (
          <span className="font-medium text-sm text-brandBlue">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("category", {
        header: "Category",
        cell: (info) => (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] uppercase tracking-widest font-medium bg-brandGold/10 text-brandGold border border-brandGold/20">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("price", {
        header: "Price",
        cell: (info) => (
          <span className="text-sm font-semibold text-brandBlue">
            ₹{info.getValue().toLocaleString("en-IN")}
          </span>
        ),
      }),
      columnHelper.accessor("countInStock", {
        header: "Stock",
        cell: (info) => {
          const count = info.getValue();
          const low = count <= 5;
          return (
            <span
              className={`text-sm font-medium ${
                low ? "text-red-500" : "text-brandBlue/70"
              }`}
            >
              {count}
              {low && (
                <span className="ml-1.5 text-[9px] uppercase tracking-wider text-red-400">
                  Low
                </span>
              )}
            </span>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-4">
            <button
              onClick={() => {
                setEditingProduct(row.original);
                setIsAdding(false);
              }}
              className="group flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-brandGold hover:text-brandGold/70 transition-colors"
            >
              <span className="w-3.5 h-3.5 border border-current rounded-sm flex items-center justify-center opacity-60 group-hover:opacity-100">
                <svg width="7" height="7" viewBox="0 0 8 8" fill="none">
                  <path d="M5.5 1L7 2.5L2.5 7H1V5.5L5.5 1Z" stroke="currentColor" strokeWidth="0.8" fill="none"/>
                </svg>
              </span>
              Edit
            </button>
            <button
              onClick={() =>
                confirm("Remove this product from Eternal permanently?") &&
                deleteMutation.mutate(row.original._id)
              }
              className="text-[10px] uppercase tracking-widest font-bold text-brandBlue/25 hover:text-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        ),
      }),
    ],
    [deleteMutation]
  );

  const table = useReactTable({
    data: products,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  const showForm = isAdding || editingProduct;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-serif italic text-brandBlue/50 text-lg tracking-wide">
          Curating your collection…
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Page header */}
      <div className="border-b border-brandGold/10 px-10 py-8">
        <div className="max-w-7xl mx-auto flex items-end justify-between">
          <div>
           
            <h1 className="font-serif text-3xl text-brandBlue leading-none">
              {showForm
                ? editingProduct
                  ? "Edit Product"
                  : "New Product"
                : "Inventory"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {showForm ? (
              <button
                onClick={() => {
                  setIsAdding(false);
                  setEditingProduct(null);
                }}
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-medium text-brandBlue/50 hover:text-brandBlue transition-colors"
              >
                <span className="text-base leading-none">←</span> Back to inventory
              </button>
            ) : (
              <>
                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products…"
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="pl-8 pr-4 py-2 text-xs border border-brandGold/20 bg-brandCream/20 text-brandBlue placeholder:text-brandBlue/30 focus:outline-none focus:border-brandGold/50 w-52 transition-colors"
                  />
                  <svg
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-brandBlue/30"
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M10 10L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>

                <button
                  onClick={() => setIsAdding(true)}
                  className="bg-brandBlue text-black px-6 py-2.5 text-[10px] uppercase tracking-[0.25em] font-bold hover:bg-brandBlue/90 transition-colors"
                >
                  + Add Product
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-10 py-8">
        {showForm ? (
          <div className="max-w-3xl">
            <ProductForm initialData={editingProduct} onSuccess={handleSuccess} />
          </div>
        ) : (
          <>
            {/* Summary row */}
            <div className="flex items-center gap-8 mb-6">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-brandBlue/40">Total Products</p>
                <p className="text-2xl font-serif text-brandBlue mt-0.5">{products.length}</p>
              </div>
              <div className="w-px h-8 bg-brandGold/15" />
              <div>
                <p className="text-[9px] uppercase tracking-widest text-brandBlue/40">Showing</p>
                <p className="text-2xl font-serif text-brandBlue mt-0.5">
                  {table.getFilteredRowModel().rows.length}
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="border border-brandGold/10 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-brandGold/10 bg-brandCream/30">
                    {table.getHeaderGroups().map((headerGroup) =>
                      headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-5 py-4 text-[9px] uppercase tracking-[0.25em] font-semibold text-brandBlue/40 whitespace-nowrap"
                          style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                        >
                          {header.column.getCanSort() ? (
                            <button
                              onClick={header.column.getToggleSortingHandler()}
                              className="flex items-center gap-1.5 hover:text-brandBlue/70 transition-colors"
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              <span className="text-brandGold/60">
                                {header.column.getIsSorted() === "asc"
                                  ? "↑"
                                  : header.column.getIsSorted() === "desc"
                                  ? "↓"
                                  : "↕"}
                              </span>
                            </button>
                          ) : (
                            flexRender(header.column.columnDef.header, header.getContext())
                          )}
                        </th>
                      ))
                    )}
                  </tr>
                </thead>
                <tbody>
                  {table.getRowModel().rows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="px-5 py-16 text-center text-sm font-serif italic text-brandBlue/30"
                      >
                        No products found.
                      </td>
                    </tr>
                  ) : (
                    table.getRowModel().rows.map((row, i) => (
                      <tr
                        key={row.id}
                        className={`border-b border-brandGold/10 hover:bg-brandCream/20 transition-colors group ${
                          i % 2 === 0 ? "" : "bg-white"
                        }`}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-5 py-3.5">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {table.getPageCount() > 1 && (
              <div className="flex items-center justify-between mt-5">
                <p className="text-[10px] text-brandBlue/40 uppercase tracking-widest">
                  Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="px-3 py-1.5 text-[10px] uppercase tracking-widest border border-brandGold/20 text-brandBlue/50 hover:text-brandBlue hover:border-brandGold/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Prev
                  </button>
                  {Array.from({ length: table.getPageCount() }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => table.setPageIndex(i)}
                      className={`w-8 h-8 text-[11px] font-medium transition-colors ${
                        table.getState().pagination.pageIndex === i
                          ? "bg-brandBlue text-white"
                          : "text-brandBlue/40 hover:text-brandBlue border border-transparent hover:border-brandGold/20"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="px-3 py-1.5 text-[10px] uppercase tracking-widest border border-brandGold/20 text-brandBlue/50 hover:text-brandBlue hover:border-brandGold/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}