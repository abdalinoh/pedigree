import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosSetup';

const AddMember = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    dateDeNaissance: '',
    statutMatrimonial: '',
    conjoint: '',
    idPere: '',
    idMere: '',
    idLien: '',
    profession: '',
    religion: '',
    groupeSanguin: '',
    signeFa: '',
    electrophorese: '',
    activite: ''
  });

  const [message, setMessage] = useState('');
  const [liens, setLiens] = useState([]);
  const [membres, setMembres] = useState([]);
  const navigate = useNavigate(); // Hook pour la navigation

  useEffect(() => {
    // Fetch available links and members for selection
    const fetchLiens = async () => {
      try {
        const response = await axiosInstance.get('/api/liens');
        setLiens(response.data);
      } catch (error) {
        console.error('Error fetching liens:', error);
      }
    };

    const fetchMembres = async () => {
      try {
        const response = await axiosInstance.get('/api/membres');
        setMembres(response.data);
      } catch (error) {
        console.error('Error fetching membres:', error);
      }
    };

    fetchLiens();
    fetchMembres();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const utilisateurId = localStorage.getItem('userId'); // Récupérer l'ID de l'utilisateur connecté
    try {
      await axiosInstance.post('/membres/ajouter', {
        ...formData,
        utilisateurId
      });
      setMessage('Membre ajouté avec succès!');
    } catch (error) {
      setMessage('Erreur lors de l\'ajout du membre');
      console.error(error);
    }
  };

  const handleCancel = () => {
    // Réinitialiser le formulaire
    setFormData({
      nom: '',
      prenom: '',
      dateDeNaissance: '',
      statutMatrimonial: '',
      conjoint: '',
      idPere: '',
      idMere: '',
      idLien: '',
      profession: '',
      religion: '',
      groupeSanguin: '',
      signeFa: '',
      electrophorese: '',
      activite: ''
    });

    // Rediriger vers une autre page, par exemple la page d'accueil
    navigate('/home');
  };

  return (
    <div className="add-member-container">
      <h2>Ajouter un membre</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Nom :</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Prénom :</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Date de naissance :</label>
          <input
            type="date"
            name="dateDeNaissance"
            value={formData.dateDeNaissance}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Statut matrimonial :</label>
          <input
            type="text"
            name="statutMatrimonial"
            value={formData.statutMatrimonial}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Conjoint :</label>
          <input
            type="text"
            name="conjoint"
            value={formData.conjoint}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label>Père :</label>
          <select
            name="idPere"
            value={formData.idPere}
            onChange={handleChange}
          >
            <option value="">Sélectionnez</option>
            {membres.map((membre) => (
              <option key={membre.id} value={membre.id}>
                {membre.nom} {membre.prenom}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>Mère :</label>
          <select
            name="idMere"
            value={formData.idMere}
            onChange={handleChange}
          >
            <option value="">Sélectionnez</option>
            {membres.map((membre) => (
              <option key={membre.id} value={membre.id}>
                {membre.nom} {membre.prenom}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>Lien de parenté :</label>
          <select
            name="idLien"
            value={formData.idLien}
            onChange={handleChange}
          >
            <option value="">Sélectionnez</option>
            {liens.map((lien) => (
              <option key={lien.id} value={lien.id}>
                {lien.type_de_lien}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>Profession :</label>
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label>Religion :</label>
          <input
            type="text"
            name="religion"
            value={formData.religion}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label>Groupe sanguin :</label>
          <input
            type="text"
            name="groupeSanguin"
            value={formData.groupeSanguin}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label>Signe FA :</label>
          <input
            type="text"
            name="signeFa"
            value={formData.signeFa}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label>Electrophorèse :</label>
          <input
            type="text"
            name="electrophorese"
            value={formData.electrophorese}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label>Activité :</label>
          <input
            type="text"
            name="activite"
            value={formData.activite}
            onChange={handleChange}
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-button">Ajouter</button>
          <button type="button" onClick={handleCancel} className="cancel-button">Annuler</button>
        </div>
      </form>
    </div>
  );
};

export default AddMember;
