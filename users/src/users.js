import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '', surname: '', email: '', password: '', birthdate: ''
  });
  const [deleteUserId, setDeleteUserId] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const fetchUsers = () => {
    axios.get('http://localhost:3050/api/users')
      .then(response => {
        setUsers(response.data.users);
      })
      .catch(error => {
        console.error('Prišlo je do napake pri pridobivanju uporabnikov!', error);
      });
  };

  const fetchUserById = (id) => {
    axios.get(`http://localhost:3050/api/users/${id}`)
      .then(response => {
        setUser(response.data);
        setShowOptions(false);
      })
      .catch(error => {
        console.error('Prišlo je do napake pri pridobivanju uporabnika!', error);
      });
  };

  const postUser = () => {
    axios.post('http://localhost:3050/api/users', newUser)
      .then(response => {
        fetchUsers();
        setShowOptions(false);
        alert('Uporabnik uspešno dodan!');
      })
      .catch(error => {
        console.error('Prišlo je do napake pri dodajanju uporabnika!', error);
      });
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3050/api/users/${id}`)
      .then(response => {
        fetchUsers();
        setShowOptions(false);
        alert('Uporabnik uspešno izbrisan!');
      })
      .catch(error => {
        console.error('Prišlo je do napake pri brisanju uporabnika!', error);
      });
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="microfrontend users-container">
      <h1>Seznam uporabnikov</h1>
      <button onClick={toggleOptions}>{showOptions ? 'Skrij možnosti' : 'Prikaži možnosti'}</button>
      {showOptions && (
        <div className="options">
          <button onClick={fetchUsers}>Pridobi vse uporabnike</button>
          <h2>Najdi uporabnika po ID</h2>
          <input
            type="text"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            placeholder="Vnesite ID uporabnika"
          />
          <button onClick={() => fetchUserById(userId)}>Najdi uporabnika</button>
          {user && (
            <div>
              <h3>{user.name} {user.surname}</h3>
              <p>{user.email}</p>
              <p>{user.birthdate}</p>
            </div>
          )}
          <h2>Dodaj uporabnika</h2>
          <input
            type="text"
            value={newUser.name}
            onChange={e => setNewUser({ ...newUser, name: e.target.value })}
            placeholder="Ime"
          />
          <input
            type="text"
            value={newUser.surname}
            onChange={e => setNewUser({ ...newUser, surname: e.target.value })}
            placeholder="Priimek"
          />
          <input
            type="email"
            value={newUser.email}
            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
            placeholder="Email"
          />
          <input
            type="password"
            value={newUser.password}
            onChange={e => setNewUser({ ...newUser, password: e.target.value })}
            placeholder="Geslo"
          />
          <input
            type="date"
            value={newUser.birthdate}
            onChange={e => setNewUser({ ...newUser, birthdate: e.target.value })}
            placeholder="Datum rojstva"
          />
          <button onClick={postUser}>Dodaj uporabnika</button>

          <h2>Izbriši uporabnika po ID</h2>
          <input
            type="text"
            value={deleteUserId}
            onChange={e => setDeleteUserId(e.target.value)}
            placeholder="Vnesite ID uporabnika"
          />
          <button onClick={() => deleteUser(deleteUserId)}>Izbriši uporabnika</button>
        </div>
      )}
    </div>
  );
}

export default Users;
