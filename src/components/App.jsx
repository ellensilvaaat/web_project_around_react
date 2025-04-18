import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: ""
  });

  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [user, initialCards] = await Promise.all([
          api.getUserInfo(),
          api.getInitialCards()
        ]);

        setCurrentUser(user);

        const enrichedCards = initialCards.map((card) => ({
          ...card,
          isLiked: false
        }));

        setCards(enrichedCards.reverse());
      } catch (error) {
        console.error("Erro ao carregar dados iniciais:", error);
      }
    }

    loadData();
  }, []);

  const handleOpenPopup = (name) => setPopup(name);
  const handleClosePopup = () => setPopup("");

const handleUpdateUser = async (data) => {
  try {
    const updatedUser = await api.setUserInfo(data);
    setCurrentUser(updatedUser);
    handleClosePopup();
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
  }
};

  const handleUpdateAvatar = (avatarUrl) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      avatar: avatarUrl
    }));
    handleClosePopup();
  };

  const handleAddPlace = async (newCard) => {
    try {
      const savedCard = await api.addCard(newCard);
      setCards((prev) => [savedCard, ...prev]);
      handleClosePopup();
    } catch (error) {
      console.error("Erro ao adicionar novo cartão:", error);
    }
  };
  

  const handleCardLike = (card) => {
    const updatedCards = cards.map((c) =>
      c._id === card._id ? { ...c, isLiked: !c.isLiked } : c
    );
    setCards(updatedCards);
  };

  const handleCardDelete = (cardId) => {
    const filteredCards = cards.filter((card) => card._id !== cardId);
    setCards(filteredCards);
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar
      }}
    >
      <div className="page__content">
        <Header />
        <Main
          popup={popup}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          cards={cards}
          onAddPlace={handleAddPlace}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}




