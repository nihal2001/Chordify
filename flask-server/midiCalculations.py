from music21 import *

"""
Gets the notes of a chord given the progression and key

For example, if the roman numeral 'V' with a key 'C' is given,
then the response would be ['G4', 'B4', 'D5'].

The note 'C4' corresponds to middle C, so by default, the chords are centered around there.
"""
def get_notes_of_chord(roman_numeral_chord: str, k: str):
    roman_chord = roman.RomanNumeral(roman_numeral_chord, key.Key(k))
    return [str(p) for p in roman_chord.pitches]


def get_notes_of_progression(progression: list[str], k: str):
    return [get_notes_of_chord(chord, k) for chord in progression]
