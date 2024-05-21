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
                console.log(response.data);
                setPlayer(response.data);
            })
            .catch(error => console.error('Error fetching player details:', error));
    }, [id]);

    if (!player) return <div>Loading...</div>;

    return (
        <div className='bg-[#0f0404] text-white h-screen flex justify-center items-center '>
            <div className='w-[30%] h-[100%] bg-white text-black flex flex-col justify-center items-center'>
                <p data-aos="fade-right" className='text-[5rem] mr-7 font-extrabold'>PLAYER</p>
                <p data-aos="fade-right" className='text-[4rem] ms-7 font-extrabold'>DETAILS</p>
            </div>
            <div className='w-[70%] flex flex-col items-center justify-center ' data-aos="fade-up">
                <h1 className="text-3xl font-bold mb-4"> {player.prenom} {player.nom} </h1>
                <img src={`http://localhost:8000/${player.image}`} alt={player.nom} className="rounded-full w-[25rem] h-[25rem] mb-4 object-cover border" />
                <p className="mb-4">{player.age} ans</p>
                <p className='mb-6 '><Link to={`/teams/${player.equipe.id}`} className="text-6xl hover:underline ">{player.equipe.nom_club}<span className='text-sm text-[#8e8888] '> ~ {player.role?.nom_role}</span></Link></p>
                <p className='border-b border-s p-2'>gsm : +{player.telephone} </p>
                <p className='border-b border-r p-2'>email : {player.email}</p>
                <p className='border-b border-s p-2'>genre : {player.genre} </p>
            </div>
        </div>
    );
}

export default PlayerDetails;
