import React, { useState, useEffect } from "react";
import avatar from "../../images/Avatar.png";
import editIcon from "../../images/Editbutton.png";
import addIcon from "../../images/Addbutton.png";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import Card from "./components/Card/Card";
import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup";
import "../../index.css";

export default function Main() {
  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isNewCardOpen, setIsNewCardOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentAvatar, setCurrentAvatar] = useState(avatar);
  const [currentUser, setCurrentUser] = useState({
    name: "Jacques Cousteau",
    job: "Explorador"
  });

  const [cards, setCards] = useState([
    { _id: '1', name: 'Yosemite Valley', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg' },
    { _id: '2', name: 'Lake Louise', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg' },
    { _id: '3', name: 'Bald Mountains', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg' },
    { _id: '4', name: 'Latemar', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg' },
    { _id: '5', name: 'Vanoise National Park', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg' },
    { _id: '6', name: 'Lago di Braies', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg' }
  ]);

  const handleCloseAllPopups = () => {
    setIsEditAvatarOpen(false);
    setIsEditProfileOpen(false);
    setIsNewCardOpen(false);
    setIsImagePopupOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        handleCloseAllPopups();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, []);

  const handleCardClick = (card) => {
    setSelectedImage({ src: card.link, alt: card.name });
    setIsImagePopupOpen(true);
  };

  const handleUpdateAvatar = (newAvatarUrl) => {
    setCurrentAvatar(newAvatarUrl);
    handleCloseAllPopups();
  };

  const handleUpdateUser = (userData) => {
    setCurrentUser(userData);
    handleCloseAllPopups();
  };

  const handleAddPlace = (newCard) => {
    const updatedCards = [{ ...newCard, _id: String(Date.now()) }, ...cards];
    setCards(updatedCards);
    handleCloseAllPopups();
  };

  const handleDeleteCard = (cardId) => {
    const updatedCards = cards.filter((card) => card._id !== cardId);
    setCards(updatedCards);
  };

  const handleLikeCard = (cardId, isLiked) => {
    const updatedCards = cards.map((card) => 
      card._id === cardId ? { ...card, isLiked } : card
    );
    setCards(updatedCards);
  };

  return (
    <main className="content">
      <section className="profile">
        <div className="profile-avatar-container">
          <img className="profile__avatar" src={currentAvatar} alt="Imagem de perfil" />
          <div className="profile-avatar-overlay" onClick={() => setIsEditAvatarOpen(true)}>
            <img className="profile-avatar-edit" src={editIcon} alt="Editar foto" />
          </div>
        </div>

        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <h3 className="profile__text">{currentUser.job}</h3>
          <div className="profile__edit">
            <img alt="Botão de edição" className="profile__edtimg" src={editIcon} onClick={() => setIsEditProfileOpen(true)} />
          </div>
        </div>

        <div className="profile__add">
          <img className="profile__addimg" src={addIcon} alt="Botão de adicionar" onClick={() => setIsNewCardOpen(true)} />
        </div>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card 
            key={card._id} 
            card={card} 
            onCardClick={() => handleCardClick(card)} 
            onCardDelete={handleDeleteCard} 
            onCardLike={handleLikeCard} 
          />
        ))}
      </section>

      {isEditAvatarOpen && (
        <EditAvatar 
          onUpdateAvatar={handleUpdateAvatar} 
          onClose={handleCloseAllPopups} 
        />
      )}
      
      {isEditProfileOpen && (
        <EditProfile 
          currentUser={currentUser} 
          onUpdateUser={handleUpdateUser} 
          onClose={handleCloseAllPopups} 
        />
      )}
      
      {isNewCardOpen && (
        <NewCard 
          onAddPlace={handleAddPlace} 
          onClose={handleCloseAllPopups} 
        />
      )}
      
      {isImagePopupOpen && selectedImage && (
        <ImagePopup 
          isOpen={isImagePopupOpen} 
          imageSrc={selectedImage.src} 
          imageAlt={selectedImage.alt} 
          onClose={handleCloseAllPopups} 
        />
      )}
    </main>
  );
}













