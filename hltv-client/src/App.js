import React, { useState } from 'react';
import './App.css';

function App() {
  const [teamOneInfo, setTeamOneInfo] = useState({});
  const [teamTwoInfo, setTeamTwoInfo] = useState({});
  const [teamOneId, setTeamOneId] = useState('');
  const [teamTwoId, setTeamTwoId] = useState('');

  const getTeams = async (e) => {
    e.preventDefault();

    setTeamOneInfo(await getTeam(teamOneId));
    setTeamTwoInfo(await getTeam(teamTwoId));
  }

  const getTeam = async (id) => {
    console.log('TCL: getting ', id);
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
    <div className="App">
      <form onSubmit={e => getTeams(e)}>
        <div>
          <label htmlFor="teamOneInput">Enter team ID:</label>
          <input id="teamOneInput" type="number" value={teamOneId} onChange={e => setTeamOneId(e.target.value)}></input>
        </div>
        <div>
          <label htmlFor="teamTwoInput">Enter team ID:</label>
          <input id="teamTwoInput" type="number" value={teamTwoId} onChange={e => setTeamTwoId(e.target.value)}></input>
        </div>
        <div>
          <input type="submit"></input>
        </div>
      </form>
      <div>
        {/* Just here to make sure the fetch works properly */}
        {teamOneInfo.name}
        {teamTwoInfo.name}
      </div>
    </div>
  );
}

export default App;
