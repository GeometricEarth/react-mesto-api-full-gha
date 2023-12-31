const sendRequest = (path, settings) => {
  const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
  const apiUrl = development ? 'http://127.0.0.1:3001' : 'https://api.geo.mesto.nomoreparties.co';

  return fetch(`${apiUrl}${path}`, settings).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Oшибка: ${res.status}`);
    }
    return res;
  });
};

export const authorize = (userData) => {
  if (!userData || Object.keys(userData).length === 0) {
    return Promise.reject('Переданы неправильные параметры');
  }
  return sendRequest('/signin', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const register = (userData) => {
  if (!userData || Object.keys(userData).length === 0) {
    return Promise.reject('Переданы неправильные параметры');
  }
  return sendRequest('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const getUserData = () => {
  return sendRequest('/users/me', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const logout = () => {
  return sendRequest('/signout', {
    method: 'DELETE',
    credentials: 'include',
  });
};
