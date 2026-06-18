"use client";

import React, { useState, useMemo } from "react";
import { useOrders } from "@/hooks/useOrders";
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
import { format } from "date-fns"; // Recommended for date formatting

const columnHelper = createColumnHelper<any>();

export default function AdminOrdersPage() {
  const { data: orders = [], isLoading } = useOrders();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo(
    () => [
      columnHelper.accessor("_id", {
        header: "Order ID",
        cell: (info) => (
          <span className="font-mono text-[10px] text-brandBlue/70 uppercase">
            #{info.getValue().slice(-8)}
          </span>
        ),
      }),
      columnHelper.accessor("user.name", {
        header: "Customer",
        cell: (info) => (
          <div className="flex flex-col">
            <span className="font-medium text-sm text-brandBlue">
              {info.getValue() || "Guest Customer"}
            </span>
            <span className="text-[10px] text-brandBlue/50 lowercase">
              {info.row.original.user?.email}
            </span>
          </div>
        ),
      }),
      columnHelper.accessor("createdAt", {
        header: "Date",
        cell: (info) => (
          <span className="text-sm text-brandBlue/70">
            {format(new Date(info.getValue()), "MMM dd, yyyy")}
          </span>
        ),
      }),
      columnHelper.accessor("totalPrice", {
        header: "Total",
        cell: (info) => (
          <span className="text-sm font-semibold text-brandBlue">
            ₹{info.getValue().toLocaleString("en-IN")}
          </span>
        ),
      }),
      columnHelper.accessor("isPaid", {
        header: "Payment",
        cell: (info) => {
          const isPaid = info.getValue();
          return (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] uppercase tracking-widest font-medium border ${
                isPaid
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-700 border-red-200"
              }`}
            >
              {isPaid ? "Paid" : "Pending"}
            </span>
          );
        },
      }),
      columnHelper.accessor("isDelivered", {
        header: "Delivery",
        cell: (info) => {
          const isDelivered = info.getValue();
          return (
            <div className="flex flex-col gap-1">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] uppercase tracking-widest font-medium border ${
                  isDelivered
                    ? "bg-brandBlue text-white border-brandBlue"
                    : "bg-brandGold/10 text-brandGold border-brandGold/20"
                }`}
              >
                {isDelivered ? "Shipped" : "Processing"}
              </span>
              {isDelivered && info.row.original.deliveredAt && (
                <span className="text-[9px] text-black">
                  {format(new Date(info.row.original.deliveredAt), "MMM dd")}
                </span>
              )}
            </div>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex items-center justify-end">
            <button
              onClick={() => (window.location.href = `/admin/orders/${row.original._id}`)}
              className="group flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-brandGold hover:text-brandGold/70 transition-colors"
            >
              Details
              <span className="text-sm">→</span>
            </button>
          </div>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: orders,
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-serif italic text-brandBlue/50 text-lg tracking-wide animate-pulse">
          Reviewing order logs…
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-brandGold/10 px-10 py-8">
        <div className="max-w-7xl mx-auto flex items-end justify-between">
          <div>
            <h1 className="font-serif text-3xl text-brandBlue leading-none">
              Order Registry
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-brandGold mt-2">
              Management & Fulfillment
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-8 pr-4 py-2 text-xs border border-brandGold/20 bg-brandCream/20 text-brandBlue focus:outline-none focus:border-brandGold/50 w-64 transition-colors"
              />
              <svg
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-brandBlue/30"
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
              >
                <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 10L14 14" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-10 py-8">
        {/* Quick Stats */}
        <div className="flex items-center gap-8 mb-8">
          <div>
            <p className="text-[9px] uppercase tracking-widest text-black">Total Volume</p>
            <p className="text-2xl font-serif text-brandBlue mt-0.5">{orders.length}</p>
          </div>
          <div className="w-px h-8 bg-brandGold/15" />
          <div>
            <p className="text-[9px] uppercase tracking-widest text-black">Pending Payment</p>
            <p className="text-2xl font-serif text-red-400 mt-0.5">
              {orders.filter((o: any) => !o.isPaid).length}
            </p>
          </div>
          <div className="w-px h-8 bg-brandGold/15" />
          <div>
            <p className="text-[9px] uppercase tracking-widest text-black">To Ship</p>
            <p className="text-2xl font-serif text-brandGold mt-0.5">
              {orders.filter((o: any) => !o.isDelivered).length}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="border border-brandGold/10 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-brandGold/10 bg-brandCream/30">
                {table.getHeaderGroups().map((headerGroup) =>
                  headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-5 py-4 text-[9px] uppercase tracking-[0.25em] font-semibold text-black"
                    >
                      {header.column.getCanSort() ? (
                        <button
                          onClick={header.column.getToggleSortingHandler()}
                          className="flex items-center gap-1.5 hover:text-brandBlue/70 transition-colors"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <span>
                            {header.column.getIsSorted() === "asc" ? "↑" : header.column.getIsSorted() === "desc" ? "↓" : "↕"}
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
                  <td colSpan={columns.length} className="px-5 py-16 text-center text-sm font-serif italic text-brandBlue/30">
                    No order records found.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row, i) => (
                  <tr
                    key={row.id}
                    className={`border-b border-brandGold/10 hover:bg-brandCream/10 transition-colors ${
                      i % 2 === 0 ? "" : "bg-white"
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-5 py-4">
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
          <div className="flex items-center justify-between mt-6">
            <p className="text-[10px] text-black uppercase tracking-widest">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-4 py-2 text-[10px] uppercase tracking-widest border border-brandGold/20 text-brandBlue/50 hover:text-brandBlue disabled:opacity-30 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-4 py-2 text-[10px] uppercase tracking-widest border border-brandGold/20 text-brandBlue/50 hover:text-brandBlue disabled:opacity-30 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}