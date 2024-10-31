import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from 'axios';
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
import { useParams } from "react-router-dom";
import { toast, Toaster } from "sonner";



export const CreateContest = () => {
  const { contestMatchId, seriesName, teamVerses } = useParams();
  const [contestData, setContestData] = useState({});

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setContestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setContestData((prevData) => ({
      ...prevData,
      contestType: value,
      matchId: contestMatchId,
    }));
    
  };

  const handleSubmit = async () => {
    // Check if all required fields are filled
    const {
      contestTitle,
      contestSubTitle,
      contestType,
      prizePool,
      numberOfSpots,
    } = contestData;
    if (
      !contestTitle ||
      !contestSubTitle ||
      !contestType ||
      !prizePool ||
      !numberOfSpots
    ) {
     alert('fill all details')
      return; 
    }

  

try {
  const url = "http://localhost:3000/api/createContest";
  const res=await axios.post(url,contestData);
  console.log(res)
 // setContestData({});
} catch (error) {
  console.log(error,'api post error')
}

  
    
  };

  return (
    <>
      <Card className="w-screen bg-gray-400">
        <CardHeader>
          <CardTitle>Contest Form</CardTitle>
          <CardTitle>{seriesName}</CardTitle>
          <CardTitle>{teamVerses}</CardTitle>
          <CardDescription>{contestMatchId}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="contestTitle">Contest Title</Label>
                <Input
                  id="contestTitle"
                  name="contestTitle"
                  placeholder="Name of your contest"
                  required
                  onChange={handleChanges}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="contestSubTitle">Contest Subtitle</Label>
                <Input
                  id="contestSubTitle"
                  name="contestSubTitle"
                  placeholder="Subtitle of your contest"
                  onChange={handleChanges}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="contestType">Contest Type</Label>
                <Select name="contestType" onValueChange={handleSelectChange}>
                  <SelectTrigger id="contestType">
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
                <Label htmlFor="prizePool">Prize Pool</Label>
                <Input
                  id="prizePool"
                  name="prizePool"
                  placeholder="Enter the prize pool amount"
                  onChange={handleChanges}
                />
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="numberOfSpots">Number of Spots/Entries</Label>
                <Input
                  id="numberOfSpots"
                  name="numberOfSpots"
                  placeholder="Enter the number of spots"
                  onChange={handleChanges}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleSubmit}>Create</Button>
        </CardFooter>
      </Card>
    </>
  );
};
