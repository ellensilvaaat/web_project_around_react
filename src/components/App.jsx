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

  // Atualização local do perfil
  const handleUpdateUser = (data) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      name: data.name,
      about: data.about
    }));
    handleClosePopup();
  };

  // Atualização local do avatar
  const handleUpdateAvatar = (avatarUrl) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      avatar: avatarUrl
    }));
    handleClosePopup();
  };

  // Novo card local
  const handleAddPlace = (newCard) => {
    const fakeCard = {
      ...newCard,
      _id: String(Date.now()),
      isLiked: false,
      likes: [],
      owner: currentUser._id || "local-user"
    };
    setCards((prev) => [fakeCard, ...prev]);
    handleClosePopup();
  };

  // Curtir/descurtir local
  const handleCardLike = (card) => {
    const updatedCards = cards.map((c) =>
      c._id === card._id ? { ...c, isLiked: !c.isLiked } : c
    );
    setCards(updatedCards);
  };

  // Remover card local
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




