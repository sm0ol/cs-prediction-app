import React, { useState } from 'react';
import { TeamCard } from './components/TeamCard';
import './assets/main.css';
import './App.css'

function App() {
  const [teamOneInfo, setTeamOneInfo] = useState({});
  const [teamTwoInfo, setTeamTwoInfo] = useState({});
  const [teamOneId, setTeamOneId] = useState('');
  const [teamTwoId, setTeamTwoId] = useState('');

  const getTeams = async () => {
    setTeamOneInfo(await getTeam(teamOneId));
    setTeamTwoInfo(await getTeam(teamTwoId));
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
          <span className="block m-auto font-bold text-center mb-10 text-gray-700">CS Match Prediction</span>
            <div className="flex flex-row">
              <div>
                <label className="font-semibold block ml-5 text-gray-700">Team 1:</label>
                <input className="m-5 border-solid border-2 border-gray-600 p-5 mb-5 rounded-lg bg-gray-400 outline-none transition duration-200 hover:shadow-lg focus:shadow-lg" id="teamOneInput" type="number" value={teamOneId} onChange={e => setTeamOneId(e.target.value)}></input>
              </div>
              <div>
                <label className="font-semibold block ml-5 text-gray-700">Team 2:</label>
                <input className="m-5 border-solid border-2 border-gray-600 p-5 mb-5 rounded-lg bg-gray-400 outline-none transition duration-200 hover:shadow-lg focus:shadow-lg" id="teamOneInput" type="number" value={teamTwoId} onChange={e => setTeamTwoId(e.target.value)}></input>
              </div>
            </div>
            <div>
              <button className="m-5 transition duration-200 ease-in-out border-solid border-2 border-gray-600 rounded pr-5 pl-5 pt-3 pb-3 hover:bg-gray-600" onClick={() => getTeams()}>Submit</button>
            </div>
        </div>
        {/* <div className="flex flex-row content-between">
            <TeamCard teamInfo={teamOneInfo} />
            <TeamCard teamInfo={teamTwoInfo} />
          </div> */}
        {(teamOneInfo.name && teamTwoInfo.name) &&
          <div className="flex flex-row content-between">
            <TeamCard teamInfo={teamOneInfo} />
            <TeamCard teamInfo={teamTwoInfo} />
          </div>
        }
        
      </div>
    </div>
  );
}

export default App;
