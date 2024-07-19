import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosSetup';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook pour la navigation

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axiosInstance.get('/membres/tous');
        if (response.data.length === 0) {
          setError('Aucun membre n\'est encore ajouté.');
        } else {
          setMembers(response.data);
        }
      } catch (error) {
        setError('Erreur lors de la récupération des membres.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleGoHome = () => {
    navigate('/home'); // Redirige vers la page d'accueil
  };

  if (loading) {
    return <p>Chargement des membres...</p>;
  }

  return (
    <div className="member-list-container">
      <h2>Liste des membres</h2>
      <button onClick={handleGoHome}>Retour à l'accueil</button> {/* Bouton de retour */}
      {error && <p>{error}</p>}
      {members.length > 0 && (
        <ul>
          {members.map((member) => (
            <li key={member.id}>
              {member.nom} {member.prenom} - {member.profession}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MemberList;
