const sendRequest = (path, settings) => {
  const baseURL = 'http://127.0.0.1:3001';
  return fetch(`${baseURL}${path}`, settings).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Oшибка: ${res.status}`);
    }
    return;
  });
};

export const authorize = (userData) => {
  if (!userData || Object.keys(userData).length === 0) {
    return Promise.reject('Переданы неправильные параметры');
  }
  return sendRequest('/signin', {
    method: 'POST',
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

export const getUserData = (jwt) => {
  return sendRequest('/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${jwt}`,
    },
  });
};
