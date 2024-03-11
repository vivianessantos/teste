import React, { useState, useEffect } from 'react';
import api from '../services/api';

const DogImage = ({ breed }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDogImage = async () => {
      try {
        setLoading(true);
        if (!imageUrl) {
          const response = await api.get(`breed/${breed}/images/random`);
          const imageUrl = response.data.message;
          setImageUrl(imageUrl);
        }
      } catch (error) {
        console.error('Erro ao buscar a imagem do cachorro:', error);
      } finally {
        setLoading(false);
      }
    };

    if (breed) {
      fetchDogImage();
    }
  }, [breed, imageUrl]);

  return (
    <div>
      {loading ? (
        <p style={{ color: '#e9ab65', fontSize: 20, fontWeight: 'bold' }}>Carregando imagem...</p>
      ) : (
        <img src={imageUrl} alt={breed} style={{ maxWidth: '100%', maxHeight: '400px' }} />
      )}
    </div>
  );
};

export default DogImage;
