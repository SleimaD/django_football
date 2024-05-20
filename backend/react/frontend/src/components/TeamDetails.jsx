import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function TeamDetails() {
    const { id } = useParams();
    const [team, setTeam] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/equipes/${id}/`)
            .then(response => {
                setTeam(response.data);
            })
            .catch(error => console.error('Error fetching team details:', error));
    }, [id]);

    return (
        <div className='text-white w-full h-[100vh] flex justify-center items-center gap-3 flex-col '>
            {team ? (
                <div className="container mx-auto px-4 py-8 flex justify-center items-center gap-3 flex-col">
                    <img className='w-[230px] h-[180px]' src={`http://localhost:8000/${team.image}`} alt={team.nom}></img>
                    <h1 className="text-3xl font-bold mb-4">{team.nom_club}</h1>
                    <div className="flex items-center mb-4">
                        <p className="mr-4">Ville: {team.ville}</p>
                        <p>{team.nom_club} - {team.ville} ({team.joueur_count}/{team.max_joueurs} max)</p>
                    </div>
                    <h2>Joueurs:</h2>
                    {team.joueurs && team.joueurs.length > 0 ? (
                        <ul className="list-disc pl-4">
                            {team.joueurs.map(player => (
                                <li key={player.id} className="mb-2">
                                    <Link to={`/players/${player.id}`} className="text-blue-500 hover:underline">
                                        {player.nom} {player.prenom}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : <p>No players found for this team.</p>}
                </div>
            ) : <p>Loading team details...</p>}
        </div>
    );
}

export default TeamDetails;
