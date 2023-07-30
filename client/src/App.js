import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Play from './Play';
import Modal from './Modal';

function App() {
  const [progression, setProgression] = useState(['']);
  const [key, setKey] = useState('');
  const [bpm, setBpm] = useState(120);
  const [scale, setScale] = useState('major');
  const [notes, setNotes] = useState([]);
  const [chords, setChords] = useState([]);
  const [editingChordIndex, setEditingChordIndex] = useState(null);

  useEffect(() => {
    axios.get(`/chords?type=${scale}`)
      .then(response => {
        setChords(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [scale]);

  const fetchData = () => {
    const postData = {
      progression: progression,
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

  const addChord = () => {
    setProgression(prevProgression => [...prevProgression, '']);
  }

  const removeChord = (index) => {
    setProgression(prevProgression => prevProgression.filter((_, i) => i !== index));
  }

  const handleChordChange = (index, value) => {
    if (value !== undefined) {
      setProgression(prevProgression => prevProgression.map((chord, i) => i === index ? value : chord));
    } else {
      setEditingChordIndex(index);
    }
  }

  return (
    <div>
      {progression.map((chord, index) => (
        <div key={index}>
          <button onClick={() => handleChordChange(index)}>{chord || 'Select Chord'}</button>
          <button onClick={() => addChord()}>+</button>
          {progression.length > 1 && <button onClick={() => removeChord(index)}>-</button>}
        </div>
      ))}

      <Modal
        isOpen={editingChordIndex !== null}
        onClose={() => setEditingChordIndex(null)}
        onSelect={(chord) => {
          handleChordChange(editingChordIndex, chord);
          setEditingChordIndex(null);
        }}
        chords={chords}
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
      <select value={scale} onChange={e => setScale(e.target.value)}>
        <option value="major">Major</option>
        <option value="minor">Minor</option>
      </select>
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
