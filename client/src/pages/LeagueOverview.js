import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';

export default function LeagueOverview() {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    fetchTeams();
  }, []);

  async function fetchTeams() {
    try {
      const res = await axios.get('/api/teams');
      setTeams(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div style={{ maxWidth: '98%', margin: '10px auto' }}>
        <MaterialTable
          options={{
            search: false,
            paging: false,
            showTitle: false,
            padding: 'dense',
            toolbar: false,
          }}
          columns={[
            {
              title: '',
              field: '',
              cellStyle: {
                // width: 35,
                // maxWidth: 35,
                paddingRight: 0,
              },
              headerStyle: {
                paddingRight: 0,
                // width: 35,
                // maxWidth: 35,
              },
              render: (rowData) => (
                <img
                  src={`/assets/logos/${rowData.name}.png`}
                  width="30px"
                  height="30px"
                />
              ),
            },
            {
              title: 'Team',
              field: 'name',
              render: (rowData) => (
                <Link to={`/teams/${rowData.name}`}>{rowData.name}</Link>
              ),
            },
            { title: 'Manager', field: 'gmName' },
            { title: 'Cap Hit', field: 'capHit', type: 'numeric' },
            { title: 'buyout', field: 'buyout', type: 'numeric' },
            { title: 'averageAge', field: 'averageAge', type: 'numeric' },
            { title: 'forwardCount', field: 'forwardCount', type: 'numeric' },
            { title: 'defenceCount', field: 'defenceCount', type: 'numeric' },
            { title: 'goalieCount', field: 'goalieCount', type: 'numeric' },
            { title: 'contractCount', field: 'contractCount', type: 'numeric' },
            { title: 'minorsCount', field: 'minorsCount', type: 'numeric' },
            { title: 'capSpace', field: 'capSpace', type: 'numeric' },
            { title: 'playerCount', field: 'playerCount', type: 'numeric' },
          ]}
          data={teams}
        />
      </div>
    </div>
  );
}
// "name": "Avalanche",
// "gmName": "dough teeth",
// "capHit": 0,
// "retained": 0,
// "buyout": 0,
// "averageAge": 0,
// "forwardCount": 0,
// "defenceCount": 0,
// "goalieCount": 0,
// "contractCount": 0,
// "minorsCount": 0,
// "capSpace": 44,
// "playerCount": 0
