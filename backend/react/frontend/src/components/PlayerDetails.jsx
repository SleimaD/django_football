import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function PlayerDetails() {
    const { id } = useParams();
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/joueurs/${id}/`)
            .then(response => {
                setPlayer(response.data);
            })
            .catch(error => console.error('Error fetching player details:', error));
    }, [id]);

    if (!player) return <div>Loading...</div>;

    return (
        <div className='bg-[#2b0b0b] text-white flex flex-col items-center justify-center h-screen'>
            <h1 className="text-3xl font-bold mb-4">{player.nom} {player.prenom}</h1>
            <img src={`http://localhost:8000/${player.image}`} alt={player.nom} className="rounded-full w-[25rem] h-[25rem] mb-4 object-cover" />
            <p className="mb-4">Age: {player.age}</p>
            <p><Link to={`/teams/${player.equipe.id}`} className="text-blue-500 hover:underline">Team: {player.equipe.nom_club}</Link></p>
        </div>
    );
}

export default PlayerDetails;
