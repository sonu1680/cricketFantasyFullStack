import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ContestForm({ contestMatchId, seriesName, teamVerses }) {
  // console.log(contestMatchId, seriesName, teamVerses);
  return (
    <Card className="w-[450px] ">
      <CardHeader>
        <CardTitle>Contest Form </CardTitle>
        <CardTitle>{seriesName}</CardTitle>
        <CardTitle>{teamVerses}</CardTitle>
        <CardDescription>{contestMatchId}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Contest Title</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Contest subTitle</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="ContestType">Contest Type</Label>
              <Select>
                <SelectTrigger id="ContestType">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Head to head">Head to head</SelectItem>
                  <SelectItem value="Grad league">Grad league</SelectItem>
                  <SelectItem value="Free contest">Free contest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Prize pool</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Entry fee</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Number of Spots/Entries</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">First prize amount</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Create</Button>
      </CardFooter>
    </Card>
  );
}
