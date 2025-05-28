// src/components/LentilleForm.jsx
import React, { useState, useEffect } from 'react';
import { createLentille, updateLentille } from '../api/lentilleApi';
// import './LentilleForm.css';

const initialFormState = {
  typeProduit: 'LENTILLE',
  marque: '',
  reference: '',
  couleur: '',
  diameter: '',
  baseCurve: '',
  sphere: '',
  cylindre: '',
  axe: '',
  addition: '',
  genre: '',
  quantiteInitiale: 0,
  numero: '',
  prixAchat: 0,
  prixVente: 0,
  remiseClient: 0,
  nature: 'Optique',
  image: ''
};

function LentilleForm({ lentille, onClose, onSubmitSuccess }) {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (lentille) {
      setFormData({
        ...initialFormState,
        ...lentille
      });
    }
  }, [lentille]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.marque) newErrors.marque = "La marque est requise";
    if (!formData.reference) newErrors.reference = "La référence est requise";
    if (!formData.genre) newErrors.genre = "Le genre est requis";
    if (!formData.prixVente || formData.prixVente <= 0) 
      newErrors.prixVente = "Le prix de vente doit être supérieur à 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' 
        ? (value === '' ? '' : parseFloat(value)) 
        : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      if (lentille?.id) {
        await updateLentille(formData);
      } else {
        await createLentille(formData);
      }
      onSubmitSuccess();
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: "Une erreur est survenue lors de l'enregistrement" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>{lentille ? 'Modifier la lentille' : 'Ajouter une nouvelle lentille'}</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">

          <div className="form-group">
            <label htmlFor="marque">Marque*</label>
            <input
              type="text"
              id="marque"
              name="marque"
              value={formData.marque}
              onChange={handleChange}
              className={errors.marque ? 'error' : ''}
            />
            {errors.marque && <span className="error-message">{errors.marque}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="reference">Référence*</label>
            <input
              type="text"
              id="reference"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              className={errors.reference ? 'error' : ''}
            />
            {errors.reference && <span className="error-message">{errors.reference}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="couleur">Couleur</label>
            <input
              type="text"
              id="couleur"
              name="couleur"
              value={formData.couleur}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="diameter">Diamètre (mm)</label>
            <input
              type="number"
              step="0.01"
              id="diameter"
              name="diameter"
              value={formData.diameter}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="baseCurve">Courbure de base</label>
            <input
              type="number"
              step="0.01"
              id="baseCurve"
              name="baseCurve"
              value={formData.baseCurve}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="sphere">Sphère</label>
            <input
              type="number"
              step="0.01"
              id="sphere"
              name="sphere"
              value={formData.sphere}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cylindre">Cylindre</label>
            <input
              type="number"
              step="0.01"
              id="cylindre"
              name="cylindre"
              value={formData.cylindre}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="axe">Axe</label>
            <input
              type="number"
              id="axe"
              name="axe"
              value={formData.axe}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="addition">Addition</label>
            <input
              type="number"
              step="0.01"
              id="addition"
              name="addition"
              value={formData.addition}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="genre">Genre*</label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className={errors.genre ? 'error' : ''}
            >
              <option value="">Sélectionner un genre</option>
              <option value="HOMME">Homme</option>
              <option value="FEMME">Femme</option>
              <option value="ENFANT">Enfant</option>
              <option value="JUNIOR">Junior</option>
              <option value="MIXTE">Mixte</option>
            </select>
            {errors.genre && <span className="error-message">{errors.genre}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="prixAchat">Prix d'achat (€)</label>
            <input
              type="number"
              step="0.01"
              id="prixAchat"
              name="prixAchat"
              value={formData.prixAchat}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="prixVente">Prix de vente (€)*</label>
            <input
              type="number"
              step="0.01"
              id="prixVente"
              name="prixVente"
              value={formData.prixVente}
              onChange={handleChange}
              className={errors.prixVente ? 'error' : ''}
            />
            {errors.prixVente && <span className="error-message">{errors.prixVente}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="quantiteInitiale">Quantité</label>
            <input
              type="number"
              id="quantiteInitiale"
              name="quantiteInitiale"
              value={formData.quantiteInitiale}
              onChange={handleChange}
            />
          </div>

        </div>

        {errors.submit && <div className="error-global">{errors.submit}</div>}

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Annuler
          </button>
          <button type="submit" className="btn-save" disabled={isSubmitting}>
            {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LentilleForm;
