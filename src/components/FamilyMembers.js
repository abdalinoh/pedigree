import React, { useState } from 'react';
import axiosInstance from '../services/axiosSetup';

const FamilyMembers = () => {
    const [familyName, setFamilyName] = useState('');
    const [countryName, setCountryName] = useState('');
    const [ethnicityName, setEthnicityName] = useState('');
    const [villageName, setVillageName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('', {
                family_name: familyName,
                country: countryName,
                ethnicity: ethnicityName,
                village: villageName
            });

            console.log('Réponse du serveur:', response);
            alert('Ajout réussie!');
            setMessage('Ajout réussie! Vous avez maintenant votre famille.');

            setFamilyName('');
            setCountryName('');
            setEthnicityName('');
            setVillageName('');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Une erreur est survenue';
            setMessage(errorMessage);
            console.log(error);
        }
    };

    const handleCancel = () => {
        setFamilyName('');
        setCountryName('');
        setEthnicityName('');
        setVillageName('');
        setMessage('');
    };

    return (
        <div className="family-member-container">
            <h2>Ma famille</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom de la famille :</label>
                    <input
                        type="text"
                        value={familyName}
                        onChange={(e) => setFamilyName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Votre pays :</label>
                    <input
                        type="text"
                        value={countryName}
                        onChange={(e) => setCountryName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Votre ethnie :</label>
                    <input
                        type="text"
                        value={ethnicityName}
                        onChange={(e) => setEthnicityName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Votre village d'origine :</label>
                    <input
                        type="text"
                        value={villageName}
                        onChange={(e) => setVillageName(e.target.value)}
                        required
                    />
                </div>
                <div className="button-group">
                    <button type="submit" className="submit-button">Soumettre</button>
                </div>
            </form>
        </div>
    );
};

export default FamilyMembers;
