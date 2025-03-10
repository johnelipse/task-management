import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Chart, LineChart } from "./chart";

export default function TaskCompletionChart() {
  // Sample data for chart
  const taskCompletionData = [
    { name: "Mon", completed: 12, pending: 5 },
    { name: "Tue", completed: 18, pending: 7 },
    { name: "Wed", completed: 15, pending: 9 },
    { name: "Thu", completed: 20, pending: 3 },
    { name: "Fri", completed: 25, pending: 2 },
    { name: "Sat", completed: 10, pending: 1 },
    { name: "Sun", completed: 5, pending: 0 },
  ];

  return (
    <Card className="bg-zinc-900/70 border-zinc-800 shadow-lg shadow-cyan-500/5">
      <CardHeader>
        <CardTitle className="text-zinc-200">Task Completion</CardTitle>
        <CardDescription className="text-zinc-400">
          Weekly task completion statistics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="h-[240px]"
          config={{
            interpolation: { label: "linear" },
            yAxis: { label: "Value" },
            xAxis: { label: "Category" },
          }}
        >
          <Chart>
            <LineChart
              data={taskCompletionData}
              categories={["completed", "pending"]}
              colors={["#06b6d4", "#8b5cf6"]}
              valueFormatter={(value) => `${value} tasks`}
              showLegend={true}
              showXAxis={true}
              showYAxis={true}
              yAxisWidth={30}
              className="text-zinc-400"
            />
            <ChartTooltip
              content={({ payload }) => {
                if (!payload?.length) return null;
                return (
                  <ChartTooltipContent className="bg-zinc-800 border-zinc-700">
                    {payload.map((entry) => (
                      <div
                        key={entry.dataKey}
                        className="flex items-center gap-2"
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span>
                          {entry.dataKey === "completed"
                            ? "Completed"
                            : "Pending"}
                          : {entry.value} tasks
                        </span>
                      </div>
                    ))}
                  </ChartTooltipContent>
                );
              }}
            />
          </Chart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
