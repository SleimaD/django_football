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
        <div className='text-white w-full h-[100vh] flex justify-center items-center gap-3'>
            <div className='w-[30%] h-[100%] bg-white text-black flex flex-col justify-center items-center'>
                <p data-aos="fade-right" className='text-[5rem] font-extrabold'>TEAM</p>
                <p data-aos="fade-right" className='text-[5rem] font-extrabold'>DETAILS</p>
            </div>
            <div className='flex justify-center items-center gap-3 flex-col w-[70%]' data-aos="fade-up">
            {team ? (
                <div className="container mx-auto px-4 py-8 flex justify-center items-center gap-3 flex-col">
                    <img className='w-[300px] h-[200px]' src={`http://localhost:8000/${team.image}`} alt={team.nom}></img>
                    <h1 className="text-3xl font-bold mb-2">{team.nom_club}</h1>
                    <div className="flex flex-col items-center justify-center mb-4">
                        <p className="">{team.ville} {team.pays.nom}</p>
                        <p>({team.joueur_count}/{team.max_joueurs} max)</p>
                    </div>
                    <div className='border-2 border-[#dc7070] overflow-auto h-[25rem] rounded-lg p-5 px-8'>
                        <h2 className='text-center text-xl underline font-extrabold mb-2'>Joueurs:</h2>
                        {team.joueurs && team.joueurs.length > 0 ? (
                            <ul className="list-disc pl-4 ">
                                {team.joueurs.map(player => (
                                    <li key={player.id} className="mb-6">
                                        <Link to={`/players/${player.id}`} className="text-blue-500 hover:underline flex  items-end gap-3">
                                            <img className='w-[50px] h-[40px]' src={`http://localhost:8000/${player.image}`} alt={team.nom}></img>
                                            {player.nom} {player.prenom}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : <p>No players found for this team.</p>}
                    </div>
                </div>
            ) : <p>Loading team details...</p>}

            </div>
        </div>
    );
}

export default TeamDetails;
