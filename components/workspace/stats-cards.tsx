import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card className="bg-zinc-900/70 border-zinc-800 shadow-lg shadow-cyan-500/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-zinc-200 text-sm font-medium">
            Total Boards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">24</div>
          <p className="text-xs text-zinc-400 mt-1">
            <span className="text-emerald-400">↑ 12%</span> from last month
          </p>
        </CardContent>
      </Card>
      <Card className="bg-zinc-900/70 border-zinc-800 shadow-lg shadow-purple-500/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-zinc-200 text-sm font-medium">
            Total Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">189</div>
          <p className="text-xs text-zinc-400 mt-1">
            <span className="text-emerald-400">↑ 8%</span> from last month
          </p>
        </CardContent>
      </Card>
      <Card className="bg-zinc-900/70 border-zinc-800 shadow-lg shadow-cyan-500/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-zinc-200 text-sm font-medium">
            Completed Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">142</div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full mt-2">
            <div
              className="h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600"
              style={{ width: "75%" }}
            ></div>
          </div>
          <p className="text-xs text-zinc-400 mt-1">75% completion rate</p>
        </CardContent>
      </Card>
      <Card className="bg-zinc-900/70 border-zinc-800 shadow-lg shadow-purple-500/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-zinc-200 text-sm font-medium">
            Active Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">16</div>
          <div className="flex -space-x-2 mt-2">
            {[...Array(5)].map((_, i) => (
              <Image
                key={i}
                src={`/placeholder.svg?height=24&width=24&text=${i + 1}`}
                width={24}
                height={24}
                alt={`Team member ${i + 1}`}
                className="rounded-full border border-zinc-800"
              />
            ))}
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-zinc-800 text-xs text-zinc-400">
              +11
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
