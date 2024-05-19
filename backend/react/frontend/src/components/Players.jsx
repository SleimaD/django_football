import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Players() {
    const [Players, setPlayers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/joueurs/')
            .then(response => {
                setPlayers(response.data);
            })
            .catch(error => console.error('Error fetching Players:', error));
    }, []);

    return (
        <div className='text-white'>
            <h1>All Players</h1>
            {Players.map(player => (
                <div key={player.id}>
                    <img className='w-[100px]' src={`http://localhost:8000/${player.image}`} alt={player.nom}></img>
                    <p>{player.nom} - {player.prenom}</p>
                    <button>Details</button>
                </div>
            ))}
        </div>
    );
}


export default Players;
