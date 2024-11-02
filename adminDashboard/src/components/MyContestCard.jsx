import { BellRing, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function MyContestCard({ className, contests, ...props }) {
  return (
    <Card
      className={cn("w-[380px] bg-white shadow-lg rounded-lg", className)}
      {...props}
    >
      <CardHeader className="p-6 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800">
          My Contests
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          You have {contests.length} ongoing contests.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {contests.map((contest, index) => (
          <div
            key={index}
            className="bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-200 transition-all border-2 border-gray-200 "
          >
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-800">
                Type: {contest.contestType}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                Title: {contest.contestTitle}
              </p>
              <p className="text-sm text-gray-600">
                Entry Fee: ${contest.contestData[0].entryFee}
              </p>
              <p className="text-sm text-gray-600">
                Spots: {contest.contestData[0].numberOfSpots}
              </p>
              <p className="text-sm text-gray-600">
                Prize Pool: ${contest.contestData[0].prizePool}
              </p>
              <p className="text-xs text-gray-400">
                Contest ID: {contest._id}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
