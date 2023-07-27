import React, { useState } from 'react';
import * as Tone from 'tone';

const Play = ({ notes, bpm }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playNotes = async () => {
    setIsPlaying(true);

    Tone.Transport.bpm.value = bpm;

    const synth = new Tone.PolySynth().toDestination();

    let time = 0;

    for (const chord of notes) {
      setTimeout(() => {
        synth.triggerAttackRelease(chord, "1m");
      }, time);
      time += Tone.Time("1m").toSeconds() * 1000;
    }

    // Reset isPlaying when done
    setTimeout(() => {
      setIsPlaying(false);
    }, time);
  };

  return <button onClick={playNotes} disabled={isPlaying}>Play</button>
};

export default Play;
