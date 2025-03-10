import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
} from "recharts";

export const ChartContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      {React.isValidElement(children) ? children : <></>}
    </ResponsiveContainer>
  );
};

export const Chart = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const LineChart = ({
  data,
  categories,
  colors,
  valueFormatter,
  showLegend,
  showXAxis,
  showYAxis,
  yAxisWidth,
  className,
}: {
  data: any[];
  categories: string[];
  colors: string[];
  valueFormatter: (value: any) => string;
  showLegend: boolean;
  showXAxis: boolean;
  showYAxis: boolean;
  yAxisWidth: number;
  className?: string;
}) => {
  return (
    <RechartsLineChart
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
      <XAxis
        dataKey="name"
        stroke="#9ca3af"
        tickLine={false}
        axisLine={false}
      />
      {showYAxis && (
        <YAxis
          stroke="#9ca3af"
          tickFormatter={valueFormatter}
          tickLine={false}
          axisLine={false}
          width={yAxisWidth}
        />
      )}
      <Tooltip
        content={({ payload, label }) => (
          <ChartTooltipContent
            items={
              payload?.map((entry: any) => ({
                color: entry.color || "#000000",
                label: entry.name || "Unknown",
                value: valueFormatter(entry.value),
              })) || []
            }
          />
        )}
      />
      {categories.map((category, index) => (
        <Line
          key={category}
          type="monotone"
          dataKey={category}
          stroke={colors[index % colors.length]}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 8 }}
        />
      ))}
    </RechartsLineChart>
  );
};

export const BarChartHorizontal = ({
  data,
  categories,
  colors,
  valueFormatter,
  showLegend,
  showXAxis,
  showYAxis,
  yAxisWidth,
  className,
}: {
  data: any[];
  categories: string[];
  colors: string[];
  valueFormatter: (value: any) => string;
  showLegend: boolean;
  showXAxis: boolean;
  showYAxis: boolean;
  yAxisWidth: number;
  className?: string;
}) => {
  return (
    <BarChart
      layout="vertical"
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
      <XAxis
        type="number"
        stroke="#9ca3af"
        tickFormatter={valueFormatter}
        tickLine={false}
        axisLine={false}
      />
      <YAxis
        dataKey="name"
        type="category"
        stroke="#9ca3af"
        tickLine={false}
        axisLine={false}
        width={yAxisWidth}
      />
      <Tooltip
        content={({ payload, label }) => (
          <ChartTooltipContent
            items={
              payload?.map((entry: any) => ({
                color: entry.color || "#000000",
                label: entry.name || "Unknown",
                value: valueFormatter(entry.value),
              })) || []
            }
          />
        )}
      />
      {categories.map((category, index) => (
        <Bar
          key={category}
          dataKey={category}
          fill={colors[index % colors.length]}
          barSize={20}
        />
      ))}
    </BarChart>
  );
};

export const ChartTooltip = ({ content }: { content: React.ReactNode }) => {
  return <>{content}</>;
};

export const ChartTooltipContent = ({
  items,
}: {
  items: { color: string; label: string; value: string }[];
}) => {
  return (
    <div className="p-2 rounded-md shadow-md">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <span
            className="block w-2 h-2 rounded-full"
            style={{ backgroundColor: item.color }}
          ></span>
          <span>{item.label}:</span>
          <span className="font-medium">{item.value}</span>
        </div>
      ))}
    </div>
  );
};
