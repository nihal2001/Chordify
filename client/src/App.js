import React, { useState } from 'react';
import axios from 'axios';
import Play from './Play';

function App() {
  const [progression, setProgression] = useState('');
  const [key, setKey] = useState('');
  const [bpm, setBpm] = useState(120);
  const [notes, setNotes] = useState([]);

  const fetchData = () => {
    const postData = {
      progression: progression.split(' '),  // Split progression by spaces
      key: key,
    };

    axios.post('/progressionNotes', postData)
      .then(response => {
        setNotes(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter progression"
        value={progression}
        onChange={e => setProgression(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter key"
        value={key}
        onChange={e => setKey(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter BPM"
        value={bpm}
        onChange={e => setBpm(e.target.value)}
      />
      <button onClick={fetchData}>Fetch Notes</button>
      <Play notes={notes} bpm={bpm} />

      {notes.length === 0 ? (
        <p>No notes yet...</p>
      ) : (
        notes.map((note, index) => (
          <p key={index}>{note}</p>
        ))
      )}
    </div>
  );
}

export default App;
