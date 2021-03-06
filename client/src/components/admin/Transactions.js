import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

export default function Transactions() {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [players, setPlayers] = useState([]);
  const [selectedPlayerOptions, setSelectedPlayerOptions] = useState([]);
  const [type, setType] = useState('');
  const [claimedTeamId, setClaimedTeamId] = useState('');

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    if (teamName) {
      fetchPlayers(teamName);
    }
  }, [teamName]);

  async function fetchTeams() {
    try {
      const res = await axios.get('/api/teams');
      setTeams(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchPlayers(name) {
    try {
      const res = await axios.get(`/api/teams/${name}`);
      setPlayers(res.data.players);
    } catch (error) {
      console.log(error);
    }
  }

  async function submit() {
    const templateBody = { type };
    templateBody.teamId = teams.find((team) => team.name === teamName).id;
    debugger;
    if (type === 'Release') {
      templateBody.teamId = 31;
    } else if (type === 'Claimed') {
      templateBody.teamId = claimedTeamId;
    }
    if (type === 'Cleared' || type === 'Minors') {
      templateBody.status = 'Minors';
    } else if (type === 'NHL') {
      templateBody.status = 'NHL';
    } else if (type === 'Waivers') {
      templateBody.status = 'Waivers';
    } else if (type === 'Retired') {
      templateBody.status = 'Retired';
    }
    for (let selectedPlayerOption of selectedPlayerOptions) {
      const { value: id } = selectedPlayerOption;
      try {
        debugger;
        await axios.post('/api/transactions', {
          playerId: id,
          ...templateBody,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div>
      <select
        value={teamName}
        onChange={(event) => setTeamName(event.target.value)}
      >
        <option disabled value="">
          SELECT A TEAM
        </option>
        {teams.map((team) => (
          <option value={team.name} key={team.id}>
            {team.name}
          </option>
        ))}
      </select>

      <Select
        isMulti
        name="players"
        value={selectedPlayerOptions}
        onChange={(options) => {
          setSelectedPlayerOptions(options);
        }}
        options={players.map((player) => ({
          value: player.id,
          label: player.name,
        }))}
      />

      <select value={type} onChange={(event) => setType(event.target.value)}>
        <option value="" disable>
          SELECT A TYPE
        </option>
        <option value="Minors">Send Down</option>
        <option value="NHL">Call Up</option>
        <option value="Waivers">Waive</option>
        <option value="Cleared">Cleared</option>
        <option value="Claimed">Claimed</option>
        <option value="Release">Released</option>
        <option value="Retired">Retired</option>
      </select>

      {type === 'Claimed' ? (
        <select
          value={claimedTeamId}
          onChange={(event) => setClaimedTeamId(event.target.value)}
        >
          <option disabled value="">
            SELECT A TEAM
          </option>
          {teams
            .filter((team) => team.name !== teamName)
            .map((team) => (
              <option value={team.id} key={team.id}>
                {team.name}
              </option>
            ))}
        </select>
      ) : null}
      <button onClick={submit}>SUBMIT</button>
    </div>
  );
}
// send down, call up, waive, cleared, retired,
//    Minor(cleared), NHL, Retired, waivers,
//   TEAM CHANGE
//   Claimed, Release, */
