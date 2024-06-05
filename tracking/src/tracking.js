import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

function Tracking() {
  const [trackings, setTrackings] = useState([]);
  const [trackingId, setTrackingId] = useState('');
  const [tracking, setTracking] = useState(null);
  const [newTracking, setNewTracking] = useState({
    user_id: '', job_id: '', application_date: '', status: '', interview: false, interview_date: '', final_status: ''
  });
  const [deleteTrackingId, setDeleteTrackingId] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const fetchTrackings = () => {
    axios.get('http://localhost:3050/api/tracking')
      .then(response => {
        setTrackings(response.data);
      })
      .catch(error => {
        console.error('Prišlo je do napake pri pridobivanju podatkov o sledenju!', error);
      });
  };

  const fetchTrackingById = (id) => {
    axios.get(`http://localhost:3050/api/tracking/${id}`)
      .then(response => {
        setTracking(response.data);
        setShowOptions(false);
      })
      .catch(error => {
        console.error('Prišlo je do napake pri pridobivanju podatkov o sledenju!', error);
      });
  };

  const postTracking = () => {
    axios.post('http://localhost:3050/api/tracking', newTracking)
      .then(response => {
        fetchTrackings();
        setShowOptions(false);
        alert('Podatki o sledenju uspešno dodani!');
      })
      .catch(error => {
        console.error('Prišlo je do napake pri dodajanju podatkov o sledenju!', error);
      });
  };

  const deleteTracking = (id) => {
    axios.delete(`http://localhost:3050/api/tracking/${id}`)
      .then(response => {
        fetchTrackings();
        setShowOptions(false);
        alert('Podatki o sledenju uspešno izbrisani!');
      })
      .catch(error => {
        console.error('Prišlo je do napake pri brisanju podatkov o sledenju!', error);
      });
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="microfrontend tracking-container">
      <h1>Seznam podatkov o sledenju</h1>
      <button onClick={toggleOptions}>{showOptions ? 'Skrij možnosti' : 'Prikaži možnosti'}</button>
      {showOptions && (
        <div className="options">
          <button onClick={fetchTrackings}>Pridobi vse podatke o sledenju</button>
          <h2>Najdi podatke o sledenju po ID</h2>
          <input
            type="text"
            value={trackingId}
            onChange={e => setTrackingId(e.target.value)}
            placeholder="Vnesite ID podatkov o sledenju"
          />
          <button onClick={() => fetchTrackingById(trackingId)}>Najdi podatke o sledenju</button>
          {tracking && (
            <div>
              <h3>ID Sledenja: {tracking.tracking_id}</h3>
              <p>ID Uporabnika: {tracking.user_id}</p>
              <p>ID Delovnega mesta: {tracking.job_id}</p>
              <p>Datum Prijave: {tracking.application_date}</p>
              <p>Status: {tracking.status}</p>
              <p>Intervju: {tracking.interview ? 'Da' : 'Ne'}</p>
              <p>Datum Intervjuja: {tracking.interview_date}</p>
              <p>Končni Status: {tracking.final_status}</p>
            </div>
          )}
          <h2>Dodaj podatke o sledenju</h2>
          <input
            type="text"
            value={newTracking.user_id}
            onChange={e => setNewTracking({ ...newTracking, user_id: e.target.value })}
            placeholder="ID Uporabnika"
          />
          <input
            type="text"
            value={newTracking.job_id}
            onChange={e => setNewTracking({ ...newTracking, job_id: e.target.value })}
            placeholder="ID Delovnega mesta"
          />
          <input
            type="date"
            value={newTracking.application_date}
            onChange={e => setNewTracking({ ...newTracking, application_date: e.target.value })}
            placeholder="Datum Prijave"
          />
          <input
            type="text"
            value={newTracking.status}
            onChange={e => setNewTracking({ ...newTracking, status: e.target.value })}
            placeholder="Status"
          />
          <label>
            <input
              type="checkbox"
              checked={newTracking.interview}
              onChange={e => setNewTracking({ ...newTracking, interview: e.target.checked })}
            />
            Intervju
          </label>
          <input
            type="datetime-local"
            value={newTracking.interview_date}
            onChange={e => setNewTracking({ ...newTracking, interview_date: e.target.value })}
            placeholder="Datum Intervjuja"
          />
          <input
            type="text"
            value={newTracking.final_status}
            onChange={e => setNewTracking({ ...newTracking, final_status: e.target.value })}
            placeholder="Končni Status"
          />
          <button onClick={postTracking}>Dodaj podatke o sledenju</button>

          <h2>Izbriši podatke o sledenju po ID</h2>
          <input
            type="text"
            value={deleteTrackingId}
            onChange={e => setDeleteTrackingId(e.target.value)}
            placeholder="Vnesite ID podatkov o sledenju"
          />
          <button onClick={() => deleteTracking(deleteTrackingId)}>Izbriši podatke o sledenju</button>
        </div>
      )}
    </div>
  );
}

export default Tracking;
