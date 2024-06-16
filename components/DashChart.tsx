"use client";

import { Status } from "@prisma/client";
import { Card, CardContent, CardHeader } from "./ui/card";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface DataProps {
  data: DataElements[];
}

interface DataElements {
  name: Status;
  total: number;
}

const DashChart = ({ data }: DataProps) => {
  return (
    <Card className="col-span-4">
      <CardHeader>Ticket Counts</CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Bar dataKey="total" fill="#60A5FA" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
export default DashChart;
