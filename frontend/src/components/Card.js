import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwner = currentUser._id === card.owner;
  const isLiked = card.likes.some((user) => user._id === currentUser._id);

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card._id);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        alt={card.name}
        src={card.link}
        onClick={() => {
          onCardClick(card);
        }}
      />
      <div className="card__body">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-section-wrapper">
          <button
            type="button"
            className={`button card__like-button ${isLiked && 'card__like-button_active'}`}
            aria-label="отметка нравиться"
            onClick={handleLikeClick}
          ></button>
          <span className="card__like-count">{card.likes.length}</span>
        </div>
      </div>
      {isOwner && (
        <button
          type="button"
          className="button button_type_delite"
          onClick={handleDeleteClick}
        ></button>
      )}
    </li>
  );
}
