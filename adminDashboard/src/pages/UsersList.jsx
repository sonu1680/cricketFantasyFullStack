import PlayerLists from "@/components/PlayersList";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchUserList = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_DB_URL}/api/admin/getUserList`
    );
    setUsers(res.data.message);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          <p className="text-lg font-medium">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PlayerLists data={users} />
    </>
  );
};

export default UsersList;
