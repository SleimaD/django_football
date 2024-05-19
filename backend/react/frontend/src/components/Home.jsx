import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
    const [data, setData] = useState({
        filled_teams: [],
        not_filled_teams: [],
        free_players: [],
        players_with_teams: [],
        european_teams: [],
        non_european_teams: [],
        random_female_players:[],
        random_players: []
    });

    useEffect(() => {
        axios.get('http://localhost:8000/api/home/')  
            .then(response => {
                console.log('Data received:', response.data);
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the home data:', error);
            });
    }, []);

    return (

        <div className='text-white'>
            <section>
                <h2 className='text-[3rem] font-bold'>Filled Teams</h2>
                {data.filled_teams.map(team => (
                    <p key={team.id}>{team.nom_club} - {team.ville}</p>
                ))}
            </section>
            <br/>
            <section>
                <h2 className='text-[3rem] font-bold'>Not Filled Teams</h2>
                {data.not_filled_teams.map(team => (
                    <p key={team.id}>{team.nom_club} - {team.ville}</p>
                ))}
            </section>
            <br/>
            <section>
                <h2 className='text-[3rem] font-bold'>Free Players</h2>
                {data.free_players.map(team => (
                    <p key={team.id}>{team.nom_club} - {team.ville}</p>
                ))}
            </section>
            <br/>
            <section>
                <h2 className='text-[3rem] font-bold'>Players with teams</h2>
                {data.players_with_teams.map(team => (
                    <p key={team.id}>{team.nom} - {team.prenom}</p>
                ))}
            </section>
            <br/>
            <section>
                <h2 className='text-[3rem] font-bold'>European teams</h2>
                {data.european_teams.map(team => (
                    <p key={team.id}>{team.nom_club} - {team.ville}</p>
                ))}
            </section>
            <br/>
            <section>
                <h2 className='text-[3rem] font-bold'>Non European teams</h2>
                {data.non_european_teams.map(team => (
                    <p key={team.id}>{team.nom_club} - {team.ville}</p>
                ))}
            </section>
            <br/>
            <section>
                <h2 className='text-[3rem] font-bold'>Random Female Players</h2>
                {data.random_female_players.map(team => (
                    <p key={team.id}>{team.nom} - {team.prenom}</p>
                ))}
            </section>
            <br/>
            <section>
                <h2 className='text-[3rem] font-bold'>Random Male Players</h2>
                {data.random_players.map(team => (
                    <p key={team.id}>{team.nom} - {team.prenom}</p>
                ))}
            </section>
        </div>
    );
}

export default Home;
