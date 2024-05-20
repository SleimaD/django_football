import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditTeam() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [teamData, setTeamData] = useState({ nom_club: '', ville: '', max_joueurs: '' });

    useEffect(() => {
        axios.get(`http://localhost:8000/equipes/${id}/`)
            .then(response => {
                setTeamData(response.data);
            })
            .catch(error => console.error('Error fetching team:', error));
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8000/equipes/${id}/`, teamData)
            .then(() => {
                navigate('/teams');
            })
            .catch(error => console.error('Error updating team:', error));
    };

    const handleChange = (event) => {
        setTeamData({ ...teamData, [event.target.name]: event.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nom Club:
                <input type="text" name="nom_club" value={teamData.nom_club} onChange={handleChange} />
            </label>
            <label>
                Ville:
                <input type="text" name="ville" value={teamData.ville} onChange={handleChange} />
            </label>
            <label>
                Max Joueurs:
                <input type="number" name="max_joueurs" value={teamData.max_joueurs} onChange={handleChange} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

export default EditTeam;
