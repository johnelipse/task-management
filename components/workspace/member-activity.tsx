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

export default function MemberActivityChart() {
  // Sample data for chart
  const memberActivityData = [
    { name: "Week 1", activity: 45 },
    { name: "Week 2", activity: 52 },
    { name: "Week 3", activity: 49 },
    { name: "Week 4", activity: 65 },
    { name: "Week 5", activity: 59 },
    { name: "Week 6", activity: 70 },
  ];

  return (
    <Card className="bg-zinc-900/70 border-zinc-800 shadow-lg shadow-purple-500/5">
      <CardHeader>
        <CardTitle className="text-zinc-200">Member Activity</CardTitle>
        <CardDescription className="text-zinc-400">
          Weekly member engagement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="h-[240px]"
          config={{
            interpolation: { theme: { dark: "#000000", light: "#ffffff" } },
          }}
        >
          <Chart>
            <LineChart
              data={memberActivityData}
              categories={["activity"]}
              colors={["#8b5cf6"]}
              valueFormatter={(value: number) => `${value} actions`}
              showLegend={false}
              showXAxis={true}
              showYAxis={true}
              yAxisWidth={30}
              className="text-zinc-400"
            />
            <ChartTooltip
              content={({ payload }) => {
                if (!payload?.length) return null;
                return (
                  <div className="bg-zinc-800 border border-zinc-700 px-3 py-2 rounded-md">
                    {payload.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-zinc-200">
                          Activity: {entry.value} actions
                        </span>
                      </div>
                    ))}
                  </div>
                );
              }}
            />
          </Chart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
