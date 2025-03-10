import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "../ui/chart";
import { BarChartHorizontal, Chart, ChartTooltipContent } from "./chart";

export default function BoardProgressChart() {
  // Sample data for chart
  const boardProgressData = [
    { name: "Design", completed: 85 },
    { name: "Development", completed: 65 },
    { name: "Marketing", completed: 45 },
    { name: "Research", completed: 90 },
    { name: "Planning", completed: 75 },
  ];

  return (
    <Card className="bg-zinc-900/70 border-zinc-800 shadow-lg shadow-cyan-500/5 mb-6">
      <CardHeader>
        <CardTitle className="text-zinc-200">Board Progress</CardTitle>
        <CardDescription className="text-zinc-400">
          Completion percentage by board
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="h-[240px]"
          config={{
            innerWidth: { color: "#ffffff" },
            innerHeight: { color: "#ffffff" },
            margin: { color: "#ffffff" },
          }}
        >
          <Chart>
            <BarChartHorizontal
              data={boardProgressData}
              categories={["completed"]}
              colors={["#06b6d4"]}
              valueFormatter={(value) => `${value}%`}
              showLegend={false}
              showXAxis={true}
              showYAxis={true}
              yAxisWidth={100}
              className="text-zinc-400"
            />
            <ChartTooltip
              content={({ payload }) => {
                if (!payload?.length) return null;
                return (
                  <ChartTooltipContent
                    items={payload.map((entry: any) => ({
                      color: entry.color,
                      label: entry.name,
                      value: `${entry.value}% completed`,
                    }))}
                  />
                );
              }}
            />
          </Chart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
