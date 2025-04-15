import React, { useState, useEffect, useContext } from "react";
import avatar from "../../images/Avatar.png";
import editIcon from "../../images/Editbutton.png";
import addIcon from "../../images/Addbutton.png";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import Card from "./components/Card/Card";
import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "../../index.css";

export default function Main({
  popup,
  onOpenPopup,
  onClosePopup,
  cards,
  onAddPlace,
  onCardLike,
  onCardDelete
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentAvatar, setCurrentAvatar] = useState(avatar);

  useEffect(() => {
    setCurrentAvatar(currentUser.avatar || avatar);
  }, [currentUser]);

  useEffect(() => {
    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        handleCloseAllPopups();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      handleCloseAllPopups();
    }
  };

  const handleCloseAllPopups = () => {
    setSelectedImage(null);
    setIsImagePopupOpen(false);
    onClosePopup();
  };

  const handleCardClick = (card) => {
    setSelectedImage({ src: card.link, alt: card.name });
    setIsImagePopupOpen(true);
  };

  const handleUpdateAvatar = (newAvatarUrl) => {
    setCurrentAvatar(newAvatarUrl);
    handleCloseAllPopups();
  };

  return (
    <main className="content" onClick={handleOverlayClick}>
      <section className="profile">
        <div className="profile-avatar-container">
          <img className="profile__avatar" src={currentAvatar} alt="Imagem de perfil" />
          <div
            className="profile-avatar-overlay"
            onClick={() => onOpenPopup("editAvatar")}
          >
            <img className="profile-avatar-edit" src={editIcon} alt="Editar foto" />
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <h3 className="profile__text">
            {currentUser.about || currentUser.job}
          </h3>
          <div className="profile__edit">
            <img
              alt="Botão de edição"
              className="profile__edtimg"
              src={editIcon}
              onClick={() => onOpenPopup("editProfile")}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="profile__add">
          <img
            className="profile__addimg"
            src={addIcon}
            alt="Botão de adicionar"
            onClick={() => onOpenPopup("newCard")}
            style={{ cursor: "pointer" }}
          />
        </div>
      </section>

      <section className="elements">
        {cards.length === 0 ? (
          <p className="no-cards">Nenhum card disponível.</p>
        ) : (
          cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
            />
          ))
        )}
      </section>

      {popup === "editAvatar" && (
        <EditAvatar
          currentAvatar={currentAvatar}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={handleCloseAllPopups}
        />
      )}

      {popup === "editProfile" && (
        <EditProfile onClose={handleCloseAllPopups} />
      )}

      {popup === "newCard" && (
        <NewCard
          onAddPlace={onAddPlace}
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

