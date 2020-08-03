import React, { useState } from 'react';
import './assets/main.css';
import './App.css'

function App() {
  const [teamOneInfo, setTeamOneInfo] = useState({});
  const [teamTwoInfo, setTeamTwoInfo] = useState({});
  const [teamOneId, setTeamOneId] = useState('');
  const [teamTwoId, setTeamTwoId] = useState('');

  const getTeams = async () => {
    // e.preventDefault();

    setTeamOneInfo(await getTeam(teamOneId));
    // setTeamTwoInfo(await getTeam(teamTwoId));
  }

  const getTeam = async (id) => {
    let teamInfo =  await fetch('http://localhost:3001/team/' + id, {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        id: id
      }
    });

    return teamInfo.json();
  }

  return (
    <div className="h-screen bg-gray-400">
      <div className="flex flex-col justify-center items-center h-screen">
        <div>
            <div>
              <div>
                <input className="border-solid border-2 border-gray-600 p-5 mb-5 rounded-lg bg-gray-400 outline-none" id="teamOneInput" type="number" value={teamOneId} onChange={e => setTeamOneId(e.target.value)}></input>
              </div>
            </div>
            <div>
              <button className="transition duration-200 ease-in-out border-solid border-2 border-gray-600 rounded pr-5 pl-5 pt-3 pb-3 hover:bg-gray-600" onClick={() => getTeams()}>Submit</button>
            </div>
        </div>
        <div className="m-5 rounded shadow bg-gray-800 text-white px-10">
          {teamOneInfo.name}
        </div>
      </div>
    </div>
  );
}

export default App;
