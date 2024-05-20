import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Players() {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editFormData, setEditFormData] = useState({
        id: null,
        nom: '',
        prenom: '',
        telephone: '',
        email: '',
        genre: '',
        pays_origine: '',
        role: '',
        equipe_id: '',
        imageFile: null
    });

    useEffect(() => {
        axios.get('http://localhost:8000/joueurs/')
            .then(response => {
                setPlayers(response.data);
            })
            .catch(error => {
                console.error('Error fetching Players:', error);
            });
        
        axios.get('http://localhost:8000/equipes/')
            .then(response => {
                setTeams(response.data);
            })
            .catch(error => {
                console.error('Error fetching Teams:', error);
            });
    }, []);

    const handleEditFormChange = (event) => {
        const { name, value } = event.target;
        setEditFormData({
            ...editFormData,
            [name]: value,
        });
    };

    const handleImageChange = (event) => {
        setEditFormData({
            ...editFormData,
            imageFile: event.target.files[0]
        });
    };

    const handleEditClick = (player) => {
        setEditing(true);
        setEditFormData({
            id: player.id,
            nom: player.nom,
            prenom: player.prenom,
            age: player.age || '', 
            telephone: player.telephone || '',
            email: player.email || '',
            genre: player.genre || '',
            pays_origine: player.pays_origine || '',
            role: player.role || '',
            equipe_id: player.equipe ? player.equipe.id : '',
            imageFile: null
        });
    };
    
    const handleCancelClick = () => {
        setEditing(false);
    };

    const handleSaveClick = () => {
        const formData = new FormData();
        formData.append('nom', editFormData.nom);
        formData.append('prenom', editFormData.prenom);
        formData.append('age', editFormData.age);
        formData.append('telephone', editFormData.telephone);
        formData.append('email', editFormData.email);
        formData.append('genre', editFormData.genre);
    
        if (editFormData.pays_origine) {
            formData.append('pays_origine', editFormData.pays_origine);
        }
    
        if (editFormData.role) {
            formData.append('role', editFormData.role);
        }
    
        if (editFormData.equipe_id) {
            formData.append('equipe', editFormData.equipe_id);
        }
    
        if (editFormData.imageFile) {
            formData.append('image', editFormData.imageFile);
        }
    
        axios.put(`http://localhost:8000/joueurs/${editFormData.id}/`, formData)
        .then(response => {
            console.log("Updated successfully:", response.data);
            const updatedPlayers = players.map(player => {
                if (player.id === editFormData.id) {
                    return { ...player, ...response.data };
                }
                return player;
            });
            setPlayers(updatedPlayers);
            setEditing(false);
        })
        .catch(error => {
            console.error('Error updating player:', error.response.data);
        });
    };

    const deletePlayer = (id) => {
        console.log(`Attempting to delete player with id: ${id}`);
        axios.delete(`http://localhost:8000/joueurs/${id}/`)
            .then(() => {
                console.log(`Deleted player with id: ${id}`);
                const updatedPlayers = players.filter(player => player.id !== id);
                setPlayers(updatedPlayers);
            })
            .catch(error => {
                console.error('Error deleting player:', error);
            });
    };
    
                
    return (
        <div className='text-white w-[97vw] h-[100vh]  p-4 '>
            <h1 className='text-center flex justify-center mb-5 mt-7 text-5xl font-bold underline'>Tous nos joueurs</h1>
            <Link to="/players/create" className='text-center flex justify-center mb-5 text-green-400'>Add New Player</Link>
            <div className='p-2 flex justify-center items-center flex-wrap gap-[5rem] mt-10'>
            {players.map(player => (
                <div key={player.id} >
                <div class="containerr flex justify-center flex-col gap-3">
                    <div class="cardd flex justify-center items-end overflow-hidden">
                        <img className='w-[180px]' src={`http://localhost:8000/${player.image}`} alt={player.nom} />
                    </div>
                </div>
                    {editing && editFormData.id === player.id ? (
                        <div className='text-black'>
                            <input
                                type="text"
                                name="nom"
                                value={editFormData.nom}
                                onChange={handleEditFormChange}
                            />
                            <input
                                type="text"
                                name="prenom"
                                value={editFormData.prenom}
                                onChange={handleEditFormChange}
                            />
                            <select
                                name="equipe_id"
                                value={editFormData.equipe_id}
                                onChange={handleEditFormChange}
                            >
                                <option value="">Select Team</option>
                                {teams.map(team => (
                                    <option key={team.id} value={team.id}>
                                        {team.nom_club}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className='bg-white'
                            />
                            <button onClick={handleSaveClick} className='bg-[#2db48e] text-white p-1 px-3 rounded-xl'>Save</button>
                            <button onClick={handleCancelClick} className='bg-[#7e1d1d] text-white p-1 px-3 rounded-xl'>Cancel</button>
                        </div>
                    ) : (
                        <div className='flex flex-col justify-center items-center gap-1 mt-3'>
                            <p className='text-2xl font-bold'>{player.nom}</p>
                            <p className='text-2xl font-bold'>{player.prenom}</p>
                            {player.equipe ? (
                                <p><Link to={`/teams/${player.equipe.id}`}>{player.equipe.nom_club}</Link></p>
                            ) : (
                                <p>Dans aucune equipe</p>
                            )}
                            <div className='flex justify-center items-center gap-2 mb-5'>
                                <Link to={`/players/${player.id}`} className='bg-[#0b0e27] text-white p-1 px-4 rounded-xl'>View</Link>
                                <button className='bg-[#2db48e] text-white p-1 px-3 rounded-xl' onClick={() => handleEditClick(player)}>Edit</button>
                                <button className='bg-[#7e1d1d] text-white p-1 px-3 rounded-xl' onClick={() => deletePlayer(player.id)}>Delete</button>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            </div>
        </div>
    );
}

export default Players;
