import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Teams() {
    const [teams, setTeams] = useState([]);
    const [editTeamId, setEditTeamId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        nom_club: '',
        ville: '',
        max_joueurs: '',
        pays: '',
        image: null
    });


    useEffect(() => {
        axios.get('http://localhost:8000/equipes/')
            .then(response => {
                console.log(response.data); 
                setTeams(response.data);
            })
            .catch(error => console.error('Error fetching teams:', error));
    }, []);

    const deleteTeam = (id) => {
        axios.delete(`http://localhost:8000/equipes/${id}/`)
            .then(() => {
                setTeams(teams.filter(team => team.id !== id));
            })
            .catch(error => console.error('Error deleting team:', error));
    }

    const handleEdit = (team) => {
        setEditTeamId(team.id);
        setEditFormData(team);
    };

    const handleCancel = () => {
        setEditTeamId(null);
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleSave = (event) => {
        event.preventDefault();
    
        //! Création d'un objet FormData pour l'envoi des fichiers et des données
        const formData = new FormData();
        formData.append('nom_club', editFormData.nom_club);
        formData.append('ville', editFormData.ville);
        formData.append('max_joueurs', editFormData.max_joueurs);
        formData.append('pays', editFormData.pays);  
        if (editFormData.image instanceof File) {
            formData.append('image', editFormData.image);
        }
    
        axios.put(`http://localhost:8000/equipes/${editTeamId}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            const updatedTeams = teams.map(team => {
                if (team.id === editTeamId) {
                    return { ...team, ...editFormData };
                }
                return team;
            });
            setTeams(updatedTeams);
            setEditTeamId(null);
        })
        .catch(error => {
            console.error('Error updating team:', error);
            console.log(error.response.data);  
        });
    };
    

    return (
        <div className='text-white w-[100vw] h-[100vh] p-4 flex flex-col justify-center items-center'>
            <h1 className='mb-10 text-5xl font-bold underline'> TEAMS </h1>
            <Link to="/teams/create" className='mb-14 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Add New Team
            </Link>
            <div className='w-full flex flex-wrap justify-center items-center gap-16 p-2'>
                {teams.map(team => (
                    <div key={team.id} className='flex flex-col justify-center items-center gap-4'>
                        {editTeamId === team.id ? (
                            <form onSubmit={handleSave} className='flex flex-col gap-3 text-black'>
                                <input type="text" name="nom_club" value={editFormData.nom_club} onChange={handleFormChange} />
                                <input type="text" name="ville" value={editFormData.ville} onChange={handleFormChange} />
                                <input type="number" name="max_joueurs" value={editFormData.max_joueurs} onChange={handleFormChange} />
                                <input type="text" name="pays" value={editFormData.pays} onChange={handleFormChange} />
                                <button type="submit" className='bg-blue-500 text-white p-2 rounded'>Save</button>
                                <button type="button" onClick={handleCancel} className='bg-gray-500 text-white p-2 rounded'>Cancel</button>
                            </form>
                        ) : (
                            <div>
                                <div class="card-container">
                                    <div class="card">
                                        <div class="img-content">
                                            <img className='w-[230px] h-[180px]' src={`http://localhost:8000/${team.image}`} alt={team.nom}></img>
                                        </div>
                                        <div class="content">
                                            <p className='text-3xl font-bold'>{team.nom_club}</p>
                                            <p> {team.ville} </p>
                                            <p> Joueurs : {team.joueur_count}/{team.max_joueurs} max </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-3 justify-center p-4 mt-3'>
                                    <Link to={`/teams/${team.id}`} className='bg-[#0b0e27] text-white p-1 px-4 rounded-xl'>View</Link>
                                    <button onClick={() => handleEdit(team)} className='bg-[#07180e] text-white p-1 px-4 rounded-xl'>Edit</button>
                                    <button onClick={() => deleteTeam(team.id)} className='bg-[#471414] text-white p-1 px-4 rounded-xl'>Delete</button>
                                </div>

                            </div>
                            
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Teams;
