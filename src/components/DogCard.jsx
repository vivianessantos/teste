import React from 'react';
import './DogCard.css';

const DogCard = ({ breed, imageUrl, color, size, nickname, age }) => {
  return (
    <div className="dog-card">
      <h2 className="breed">{breed}</h2>
      <img src={imageUrl} alt={breed} className="dog-image" />
      <p><strong>Cor:</strong> {color}</p>
      <p><strong>Tamanho:</strong> {size}</p>
      <p><strong>Apelido:</strong> {nickname}</p>
      <p><strong>Idade:</strong> {age}</p>
    </div>
  );
};

export default DogCard;
