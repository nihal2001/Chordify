from flask import Flask, request, jsonify
from services.services import get_chords
from midiCalculations import *

app = Flask(__name__)

@app.route('/progressionNotes', methods=['POST'])
def progression_notes():
    data = request.get_json()
    notes = get_notes_of_progression(data['progression'], data['key'])
    response = jsonify(notes)

    return response

@app.route('/chords', methods=['GET'])
def chords():
    # Get the chord type from the query parameters
    chord_type = request.args.get('type', default='major', type=str)

    # Call get_chords() with the specified chord type
    chords = get_chords(chord_type)

    return jsonify(chords)

if __name__ == '__main__':
  app.run(debug=True)
