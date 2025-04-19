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
    avatar: "",
  });

  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [user, initialCards] = await Promise.all([
          api.getUserInfo(),
          api.getInitialCards(),
        ]);
        setCurrentUser(user);
        setCards(initialCards.reverse());
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
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
      console.error("Erro ao atualizar perfil:", error);
    }
  };

  const handleUpdateAvatar = async (url) => {
    try {
      const updatedUser = await api.setAvatar(url);
      setCurrentUser(updatedUser);
      handleClosePopup();
    } catch (error) {
      console.error("Erro ao atualizar avatar:", error);
    }
  };

  const handleAddPlace = async (newCard) => {
    try {
      const createdCard = await api.addCard(newCard);
      setCards((prev) => [createdCard, ...prev]);
      handleClosePopup();
    } catch (error) {
      console.error("Erro ao adicionar card:", error);
    }
  };

  const handleCardLike = async (card) => {
    const isLiked = card.likes && card.likes.some((like) => like._id === currentUser._id);
    try {
      const updatedCard = await api.changeLikeCardStatus(card._id, !isLiked);
      setCards((state) =>
        state.map((c) => (c._id === card._id ? updatedCard : c))
      );
    } catch (error) {
      console.error("Erro ao curtir/descurtir:", error);
    }
  };

  const handleCardDelete = async (cardId) => {
    try {
      await api.deleteCard(cardId);
      setCards((prev) => prev.filter((c) => c._id !== cardId));
    } catch (error) {
      console.error("Erro ao deletar card:", error);
    }
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
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






