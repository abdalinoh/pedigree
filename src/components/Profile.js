import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosSetup';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/user/profile'); // Assurez-vous que cette route est correcte
        setUserData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        setError('Erreur lors de la récupération des données utilisateur.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Chargement des données du profil...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="profile-container">
      <h2>Profil de l'Utilisateur</h2>
      {userData ? (
        <div>
          <p><strong>Nom :</strong> {userData.nom}</p>
          <p><strong>Prénom :</strong> {userData.prenom}</p>
          <p><strong>Email :</strong> {userData.email}</p>
          {/* Ajoutez d'autres champs selon ce que vous souhaitez afficher */}
        </div>
      ) : (
        <p>Aucune donnée utilisateur disponible.</p>
      )}
    </div>
  );
};

export default Profile;
