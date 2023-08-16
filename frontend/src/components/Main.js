import Card from './Card';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({
  cardsList,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const user = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-wraper" onClick={onEditAvatar}>
          <div className="profile__avatar-overlay"></div>
          <div className="profile__avatar" style={{ backgroundImage: `url(${user.avatar})` }}></div>
        </div>
        <div className="profile__info">
          <div className="profile__user-name-wraper">
            <h1 className="profile__user-name">{user.name}</h1>
            <button
              type="button"
              className="button button_type_edit"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__occupation">{user.about}</p>
        </div>
        <button
          type="button"
          className="button button_type_add"
          aria-label="Добавить изображение в галлерею"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="gallery">
        <ul className="gallery__card-list">
          {cardsList.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
