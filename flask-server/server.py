from flask import Flask, request, jsonify
from midiCalculations import *

app = Flask(__name__)

@app.route('/progressionNotes', methods=['POST'])
def progression_notes():
    data = request.get_json()
    notes = get_notes_of_progression(data['progression'], data['key'])
    response = jsonify(notes)

    return response

if __name__ == '__main__':
  app.run(debug=True)
