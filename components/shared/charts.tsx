"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function SalesExpensesChart({ data }: { data: Array<{ month: string; sales: number; expenses: number }> }) {
  return (
    <div className="card p-4 h-80">
      <h3 className="font-semibold mb-3">اتجاه المبيعات والمصروفات</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" name="المبيعات" fill="#2563eb" />
          <Bar dataKey="expenses" name="المصروفات" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
