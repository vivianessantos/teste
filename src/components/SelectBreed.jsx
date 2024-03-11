import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './SelectBreed.css';

const SelectBreed = ({ onSelect }) => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await api.get('breeds/list/all');
        const data = response.data.message;
        const breedList = Object.keys(data);
        setBreeds(breedList);
      } catch (error) {
        console.error('Erro ao buscar raça:', error); æ
      }
    };

    fetchBreeds();
  }, []);

  const handleBreedChange = (event) => {
    const selected = event.target.value;
    setSelectedBreed(selected);
    onSelect(selected);
  };

  return (
    <div className="select-container">
      <label htmlFor="breedSelect" className="select-label">Selecione a Raça: </label>
      <select id="breedSelect" value={selectedBreed} onChange={handleBreedChange} className="select-dropdown">
        <option value="">Selecione a Raça...</option>
        {breeds.map((breed, index) => (
          <option key={index} value={breed} className="select-option">{breed}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectBreed;