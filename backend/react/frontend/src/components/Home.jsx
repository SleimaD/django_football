import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import img1 from "./../assets/img-1.png"
import img2 from "./../assets/img-2.png"
import img3 from "./../assets/img-3.png"
import Enrique from "./../assets/luis.jpeg"


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

        <div className='text-white mt-16'>
            <section className='sectioncoach w-full flex justify-between items-center p-4 '>
                <div className='w-[50%] flex flex-col justify-center items-center'>
                    <h3 className=' p-2 text-3xl font-bold mb-4'>Actu-Coachs</h3>
                    <p className='ms-6 p-3'>
                    Il est encore trop tôt pour parler d'avantage psychologique, on le saura en partie ce soir, encore plus la semaine prochaine après le match retour.
                    Mais ça n’empêche que depuis le tirage au sort Luis Enrique enchaine la très bonne communication positive pour le Paris Saint-Germain.
                    Ça a commencé avec les questions sur la Remontada, cette rencontre en 2017 alors qu’il était dans l’autre camp. Il n’a pas renié l’événement mais a quand même nuancé l’importance que ça a eu dans sa carrière et rappelé qu’au match aller le PSG l’avait emporté 4-0 et qu’il se souvenait de ce match aussi - piège évité, premier bon point...                   
                    </p>
                    <button className='mt-3 ms-4 flex justify-center bg-white text-black p-2 px-3 rounded-xl'>Voir plus</button>
                </div>
                <div className='w-[50%] h-[100%] flex justify-center items-center flex-col gap-3'>
                    <div className=' '>
                        <img className='w-[25rem] h-[15rem] borde-4 border-white ' src={Enrique}></img>
                    </div>
                    <p className='text-2xl font-bold'>Luis Enrique</p>
                </div>
            </section>
            <br/><br/>
            <br/><br/>
            <h2 className='text-[2rem] font-bold text-center '>Nos équipes complètes</h2>
            <section className='  w-full h-auto p-2 py-5 flex justify-center items-center'>
                {data.filled_teams.map(team => (
                    <div key={team.id} className='flex justify-center items-center flex-col p-2 '>
                        <div className='  w-[310px] h-[180px] p-2 rounded-2xl overflow-hidden '>
                                <img className='w-[100%] h-[100%]' src={`http://localhost:8000/${team.image}`} alt={team.nom}></img>
                        </div>
                    </div>
                ))}
            </section>
            <br/><br/><br/><br/><br/>
            <section className='sectionimgs p-3'>
                <h3 className='text-4xl font-bold mt-3 mb-5 text-center'>Actualité du moment</h3>
                <div className='flex justify-center items-center gap-16'>
                    <div className='bg-white w-[14rem] h-[18rem] flex flex-col text-black gap-3'>
                        <div><img src={img1}></img></div>
                        <div className='flex flex-col justify-center items-center gap-2 p-2'>
                            <h5 className='text-lg underline'>super gardien</h5>
                            <p className='text-center'>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
                        </div>
                    </div>
                    <div className='bg-white w-[14rem] h-[18rem] flex flex-col text-black gap-3'>
                        <div><img src={img2}></img></div>
                        <div className='flex flex-col justify-center items-center gap-2 p-2'>
                            <h5 className='text-lg underline'>Incroyable but</h5>
                            <p className='text-center'>lorem ipsum lorem ipsum orem ipsum lorem ipsum lorem ipsum lorem ipsum lorem </p>
                        </div>
                    </div>
                    <div className='bg-white w-[14rem] h-[18rem] flex flex-col text-black gap-3'>
                        <div><img src={img3}></img></div>
                        <div className='flex flex-col justify-center items-center gap-2 p-2'>
                            <h5 className='text-lg underline'>Victoire d'Arsenal</h5>
                            <p className='text-center'>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
                        </div>
                    </div>
                </div>
            </section>
            <br/><br/><br/><br/><br/>
            <h2 className=' text-[2rem] $font-bold text-center'>Equipes pouvant encore être intégrées</h2>
            <section className='mb-6 w-full h-auto p-2 py-5 flex justify-center items-center '>
                {data.not_filled_teams.map(team => (
                    <div key={team.id} className='flex justify-center items-center flex-col p-2 '>
                        <div className=' border-2 border-[#484747] w-[170px] h-[120px] p-2 rounded-2xl overflow-hidden '>
                                <img className='w-[100%] h-[100%]' src={`http://localhost:8000/${team.image}`} alt={team.nom}></img>
                        </div>
                        {/* <p>{team.nom_club} - {team.ville} </p>  */}
                    </div>
                ))}
            </section>
            <br/> <br/><br/>
            <h2 className='text-[2rem] font-bold text-center'>Joueurs/Joueuses sans équipe</h2>
            <section className='freep w-full flex justify-center items-center flex-wrap gap-7 p-2 py-8'>
                {data.free_players.map(team => (
                    <div key={team.id} className='flex justify-center items-center flex-col p-2 '>
                        <div className='bg-[#120617] border-2 border-[#484747] rounded-2xl overflow-hidden '>
                            <img className='w-[170px] h-[170px]' src={`http://localhost:8000/${team.image}`} alt={team.nom}></img>
                        </div>
                        <p className='text-lg font-bold'>{team.prenom} {team.nom}</p> 
                    </div>
                ))}
            </section>
            <br/><br/><br/>
            <h2 className='text-[2rem]  font-bold text-center'>Joueurs/Joueuses avec équipe</h2>
            <section className=' w-full  flex justify-center items-center flex-wrap gap-7 p-2 py-8'>
                {data.players_with_teams.map(team => (
                    <div key={team.id} className='flex justify-center items-center flex-col p-2 '>
                        <div className='bg-[#120617] border-2 border-[#484747] rounded-2xl overflow-hidden '>
                            <img className='w-[170px] h-[170px]' src={`http://localhost:8000/${team.image}`} alt={team.nom}></img>
                        </div>
                        <p className='text-lg font-bold'>{team.prenom} {team.nom}</p> 
                    </div>
                ))}
            </section>
            <br/><br/><br/><br/><br/><br/>
            <h2 className='text-[2rem] font-bold text-center'>Equipes Européennes</h2>
            <section className=' w-full bg-[#191919] flex justify-center items-center flex-wrap gap-7 p-2 py-6'>
                {data.european_teams.map(team => (
                    <div key={team.id} className='flex justify-center items-center flex-col p-2 '>
                        <div className=' border-2 border-[#2e2e2e] w-[170px] h-[120px] p-2 rounded-2xl overflow-hidden '>
                                <img className='w-[100%] h-[100%]' src={`http://localhost:8000/${team.image}`} alt={team.nom}></img>
                        </div>
                        <p>{team.nom_club} - {team.ville} </p> 
                    </div>
                ))}
            </section>
            <br/><br/><br/><br/>
            <h2 className='text-[2rem] font-bold text-center'>Equipes non Européennes</h2>
            <section className=' w-full  flex justify-center items-center flex-wrap gap-7 p-2 py-6'>
                {data.non_european_teams.map(team => (
                    <div key={team.id} className='flex justify-center items-center flex-col p-2 '>
                        <div className=' border-2 border-[#2e2e2e] w-[150px] h-[120px] p-2 rounded-2xl overflow-hidden '>
                                <img className='w-[100%] h-[100%]' src={`http://localhost:8000/${team.image}`} alt={team.nom}></img>
                        </div>
                        <p>{team.nom_club} - {team.ville} </p> 
                    </div>
                ))}
            </section>
            <br/><br/>
            <h2 className='text-[2rem] font-bold text-center'>Joueuse(s)</h2>
            <section className=' w-full h-auto p-2 py-6'>
                {data.random_female_players.map(team => (
                    <div key={team.id} className='flex justify-center items-center flex-col p-2 '>
                        <div className=' border-2 border-[#484747] rounded-2xl overflow-hidden '>
                            <img className='w-[170px] h-[180px]' src={`http://localhost:8000/${team.image}`} alt={team.nom}></img>
                        </div>
                        <p className='text-lg font-bold'>{team.prenom} {team.nom}</p> 
                    </div>
                ))}
            </section>
            <br/><br/>
            <h2 className='text-[2rem] font-bold text-center'>Joueur(s)</h2>
            <section className=' w-full  h-auto py-5 p-2 '>
                <div className='flex justify-center items-center flex-wrap gap-7 p-2'>
                    {data.random_players.map(team => (
                        <div key={team.id} className='flex justify-center items-center flex-col p-2 '>
                            <div className='bg-[#120617] border-2 border-[#484747] rounded-2xl overflow-hidden '>
                                <img className='w-[170px] h-[180px]' src={`http://localhost:8000/${team.image}`} alt={team.nom}></img>
                            </div>
                            <p className='text-lg font-bold'>{team.prenom} {team.nom}</p> 
                        </div>
                    ))}
                </div>
                <div className='w-full flex justify-center items-center p-1 mt-4  mb-5'>
                    <Link to={"/players"} className='p-2 px-4 rounded-lg bg-[#121242]'>
                        Voir tous nos joueurs
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Home;
