import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Teams() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/equipes/')
            .then(response => {
                setTeams(response.data);
            })
            .catch(error => console.error('Error fetching teams:', error));
    }, []);

    return (
        <div className='text-white'>
            <h1>All Teams</h1>
            {teams.map(team => (
                <div key={team.id}>
                    <img className='w-[150px] h-[150px]' src={`http://localhost:8000/${team.image}`} alt={team.nom}></img>
                    <p>{team.nom_club} - {team.ville}</p>
                    {/* <p>{team.nom_club} - {team.ville} ({team.joueurs.length}/{team.max_joueurs} max)</p> */}
                    <button>View</button>
                </div>
            ))}
        </div>
    );
}


export default Teams;
