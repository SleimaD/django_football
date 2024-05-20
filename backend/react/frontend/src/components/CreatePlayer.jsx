import React, { useState } from 'react';
import axios from 'axios';

function CreatePlayer() {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        age: '',
        telephone: '',
        email: '',
        genre: '',
        pays_origine: '',
        equipe: '',
        role: '',
        image: null
    });

    const handleChange = (e) => {
        const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await axios.post('http://localhost:8000/joueurs/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Player Created:', response.data);
            setFormData({
                nom: '',
                prenom: '',
                age: '',
                telephone: '',
                email: '',
                genre: '',
                pays_origine: '',
                equipe: '',
                role: '',
                image: null
            });
        } catch (error) {
            console.error('Error creating player:', error.response.data);
        }
    };

    return (
        <div className='w-full h-[100vh] bg-white flex justify-center flex-wrap items-center'>
        <form onSubmit={handleSubmit} className='p-4 rounded-lg shadow-md w-[30rem] h-[45rem] flex justify-center items-center flex-col gap-3 '> 
            <input className='p-2 border-2 border-[#7c7b7b] rounded-xl ms-3' type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" />
            <input className='p-2 border-2 border-[#7c7b7b] rounded-xl ms-3' type="text" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" />
            <input className='p-2 border-2 border-[#7c7b7b] rounded-xl ms-3' type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
            <input className='p-2 border-2 border-[#7c7b7b] rounded-xl ms-3' type="text" name="telephone" value={formData.telephone} onChange={handleChange} placeholder="Telephone" />
            <input  className='p-2 border-2 border-[#7c7b7b] rounded-xl ms-3'type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <select className='p-2 border-2 border-[#7c7b7b] rounded-xl ms-3' name="genre" value={formData.genre} onChange={handleChange}>
                <option value="">Select Genre</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <input className='p-2 border-2 border-[#7c7b7b] rounded-xl ms-3' type="text" name="pays_origine" value={formData.pays_origine} onChange={handleChange} placeholder="Pays d'origine" />
            <input className='p-2 border-2 border-[#7c7b7b] rounded-xl ms-3' type="text" name="equipe" value={formData.equipe} onChange={handleChange} placeholder="Equipe ID" />
            <input className='p-2 border-2 border-[#7c7b7b] rounded-xl ms-3' type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Role ID" />
            <input className='p-2 border-2 border-[#7c7b7b] rounded-xl ms-3' type="file" name="image" onChange={handleChange} />
            <button className='bg-[#0b0e27] text-white p-1 px-4 rounded-xl' type="submit" >Create Player</button>
        </form>
        </div>
    );
}

export default CreatePlayer;
