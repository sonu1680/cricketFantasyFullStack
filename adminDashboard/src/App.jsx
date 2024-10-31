import { useState } from 'react'
import GetSeries from './pages/getSeries';
import { BrowserRouter,Routes ,Route } from 'react-router-dom';
import GetSeriesMatch from './pages/getMatch';
import { Contest } from './pages/contestHome';
import {CreateContest} from './pages/createContest';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetSeries />}></Route>
        <Route
          path="/match/:matchId/:seriesName"
          element={<GetSeriesMatch />}
        ></Route>
        <Route path="/contestHome" element={<Contest />}></Route>
        <Route path="/createContest/:contestMatchId/:seriesName/:teamVerses" element={<CreateContest />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
