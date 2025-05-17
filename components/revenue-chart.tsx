"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={revenueData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="labor" name="Labor" fill="#1e40af" />
        <Bar dataKey="parts" name="Parts" fill="#dc2626" />
      </BarChart>
    </ResponsiveContainer>
  )
}

const revenueData = [
  {
    month: "Jan",
    labor: 4000,
    parts: 2400,
  },
  {
    month: "Feb",
    labor: 3000,
    parts: 1398,
  },
  {
    month: "Mar",
    labor: 2000,
    parts: 9800,
  },
  {
    month: "Apr",
    labor: 2780,
    parts: 3908,
  },
  {
    month: "May",
    labor: 1890,
    parts: 4800,
  },
  {
    month: "Jun",
    labor: 2390,
    parts: 3800,
  },
]
