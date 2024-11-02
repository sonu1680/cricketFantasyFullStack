import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
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
import { MyContestCard } from "@/components/MyContestCard";
import { toast } from "react-toastify";

export const CreateContest = () => {
  const { contestMatchId, seriesName, teamVerses } = useParams();
  const [contestData, setContestData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [matchContests, setMatchContests] = useState([]);

  // Handle input changes for the form
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setContestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle select input changes
  const handleSelectChange = (value) => {
    setContestData((prevData) => ({
      ...prevData,
      contestType: value,
      matchId: contestMatchId,
    }));
  };

  // Fetch contests for the given match
  const fetchContestOfMatch = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_DB_URL
        }/api/getContestofMatches?matchId=${contestMatchId}`
      );
      setMatchContests(res.data.msg);
    } catch (error) {
      console.error("No contest found");
    }
  };

  // Fetch contest data when component mounts
  useEffect(() => {
    fetchContestOfMatch();
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    const {
      contestTitle,
      contestSubTitle,
      contestType,
      prizePool,
      numberOfSpots,
    } = contestData;

    // Validate required fields
    if (
      !contestTitle ||
      !contestSubTitle ||
      !contestType ||
      !prizePool ||
      !numberOfSpots
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const url = `${import.meta.env.VITE_DB_URL}/api/createContest`;
      await axios.post(url, contestData);
      setIsLoading(false);
      setContestData({}); // Clear form
      fetchContestOfMatch(); // Refresh contests
      toast.success("Contest created!");
    } catch (error) {
      toast.error("Failed to create contest");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full gap-8 bg-gray-100 p-6">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <img src="/loading.gif" className="w-20 h-20" alt="Loading" />
        </div>
      )}

      {/* Contest Creation Form */}
      <Card className="flex-1 max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden w-full">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white">
          <CardTitle className="text-2xl font-bold">Create Contest</CardTitle>
          <CardDescription className="mt-1 text-sm text-white">
            {seriesName} - {teamVerses}
          </CardDescription>
          <CardDescription className="text-xs text-white">
            Match ID: {contestMatchId}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form className="space-y-6">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="contestTitle">Contest Title</Label>
              <Input
                id="contestTitle"
                name="contestTitle"
                placeholder="Enter contest title"
                onChange={handleChanges}
                className="border rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="contestSubTitle">Contest Subtitle</Label>
              <Input
                id="contestSubTitle"
                name="contestSubTitle"
                placeholder="Enter contest subtitle"
                onChange={handleChanges}
                className="border rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="contestType">Contest Type</Label>
              <Select name="contestType" onValueChange={handleSelectChange}>
                <SelectTrigger id="contestType" className="border rounded-lg">
                  <SelectValue placeholder="Select contest type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Head to head">Head to head</SelectItem>
                  <SelectItem value="Grand league">Grand league</SelectItem>
                  <SelectItem value="Free contest">Free contest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="prizePool">Prize Pool</Label>
              <Input
                id="prizePool"
                name="prizePool"
                placeholder="Enter prize pool amount"
                onChange={handleChanges}
                className="border rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="numberOfSpots">Number of Spots</Label>
              <Input
                id="numberOfSpots"
                name="numberOfSpots"
                placeholder="Enter number of spots"
                onChange={handleChanges}
                className="border rounded-lg px-3 py-2"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="p-4 bg-gray-100 flex justify-end">
          <Button
            onClick={handleSubmit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
          >
            Create Contest
          </Button>
        </CardFooter>
      </Card>

      {/* Contest List */}
      <div className="flex-1 lg:max-w-lg">
        <MyContestCard contests={matchContests} />
      </div>
    </div>
  );
};
