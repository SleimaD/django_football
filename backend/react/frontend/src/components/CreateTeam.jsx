import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateTeam() {
    const [teamData, setTeamData] = useState({
        nom_club: '',
        ville: '',
        pays: '',
        max_joueurs: 13, 
        image: null
    });
    const [pays, setPays] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/pays/')
            .then(response => {
                setPays(response.data);
            })
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(teamData).forEach(key => formData.append(key, teamData[key]));
        
        axios.post('http://localhost:8000/equipes/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
            navigate('/teams'); 
        }).catch(error => console.error('Error creating team:', error));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTeamData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (event) => {
        setTeamData({ ...teamData, image: event.target.files[0] });
    };

    return (
        <div className='bg-white w-full h-[100vh] flex justify-center flex-col items-center'>
            <h2 className='text-2xl'>Create New Team</h2>
            <form onSubmit={handleSubmit} className='p-4 rounded-lg shadow-md w-[40rem] h-[25rem] flex justify-center items-center flex-col gap-3 '>
                <label>
                    Team Name:
                    <input className='p-2 border-2 border-[#7c7b7b] rounded-xl ms-3' type="text" name="nom_club" value={teamData.nom_club} onChange={handleChange} required />
                </label>
                <label>
                    City: 
                    <input className='p-2 border-2 border-[#7c7b7b] rounded-xl ms-3' type="text" name="ville" value={teamData.ville} onChange={handleChange} required />
                </label>
                <label>
                    Country:
                    <select className='p-2  border-2 border-[#7c7b7b6c] rounded-xl ms-3' name="pays" value={teamData.pays} onChange={handleChange} required>
                        <option value="">Select a country</option>
                        {pays.map(country => (
                            <option key={country.id} value={country.id}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Max Players:
                    <input className='p-2 border-2 border-[#7c7b7b] rounded-xl ms-3' type="number" name="max_joueurs" value={teamData.max_joueurs} onChange={handleChange} required />
                </label>
                <label>
                    Team Image:
                    <input className='p-2 border-2 border-[#7c7b7b] rounded-xl ms-3' type="file" name="image" onChange={handleFileChange} />
                </label>
                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Submit</button>
            </form>

        </div>
    );
}

export default CreateTeam;
