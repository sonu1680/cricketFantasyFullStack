import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetSeries from "./pages/getSeries";
import GetSeriesMatch from "./pages/getMatch";
import { Contest } from "./pages/contestHome";
import { CreateContest } from "./pages/createContest";
import Sidebar from "./pages/Sidebar";
import Dashboard from "./pages/Dashboard";
import UsersList from "./pages/UsersList";
  import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 min-h-screen p-6 lg:ml-60">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UsersList />} />

            <Route path="/createMatch" element={<GetSeries />} />

            <Route
              path="/match/:matchId/:seriesName"
              element={<GetSeriesMatch />}
            />

            <Route path="/contestHome" element={<Contest />} />

            <Route
              path="/createContest/:contestMatchId/:seriesName/:teamVerses"
              element={<CreateContest />}
            />
          </Routes>
            <ToastContainer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
 