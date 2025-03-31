import React, { useState } from "react";
import trashIcon from "/src/images/Trash.png";
import likeIcon from "/src/images/Group.png";
import likedIcon from "/src/images/Union.png";
import rectangle from "/src/images/Rectangle.png";

export default function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const [isLiked, setIsLiked] = useState(false); // ✅ Controle do estado de curtida

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    onCardLike(card._id, !isLiked); // ✅ Passa o novo estado do like para o Main.jsx
  };

  return (
    <div className="element">
      <img
        src={trashIcon}
        className="element__delete"
        alt="Excluir"
        onClick={() => onCardDelete(card._id)} // ✅ Função de excluir cartão
      />
      <img
        className="element__rectangle"
        src={rectangle}
        alt="Fundo do cartão"
      />
      <img
        className="element__local"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />
      <div className="element__conteiner">
        <h3 className="element__title">{card.name}</h3>
        <img
          className="element__like"
          src={isLiked ? likedIcon : likeIcon} // ✅ Alterna entre os ícones de curtida
          alt="Curtir"
          onClick={handleLikeClick}
        />
      </div>
    </div>
  );
}



