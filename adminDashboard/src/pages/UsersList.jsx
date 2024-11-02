import PlayerLists from '@/components/PlayersList'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UsersList = () => {
const [users,setUsers]=useState([]);
const fetchUserList=async()=>{
const res=await axios.get("http://localhost:3000/api/admin/getUserList");
setUsers(res.data.message);
}

    useEffect(()=>{
fetchUserList();
    },[])

      
  return (
    <>
      <PlayerLists data={users} />
    </>
  );
}

export default UsersList