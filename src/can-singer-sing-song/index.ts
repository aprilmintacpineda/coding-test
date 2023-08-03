// splits a note to its numerical values, e.g., B7 would be pitch = 6, octave = 7
function splitNote (note: Note) {
  const pitchPlaceValues: Record<Pitch, number> = {
    C: 0,
    D: 1,
    E: 2,
    F: 3,
    G: 4,
    A: 5,
    B: 6
  };

  const [pitch, _octave] = note.split('') as [Pitch, Octave];
  const octave = Number(_octave);

  return {
    pitch: pitchPlaceValues[pitch],
    octave
  };
}

type NoteDetermination = {
  value: null | number;
  note: {
    pitch: number;
    octave: number;
  };
};

export function singable (
  song: Note[],
  _singerLowestNote: Note,
  _singerHighestNote: Note
) {
  // 1. find the highest note and lowest note in song
  const highestNoteInSong: NoteDetermination = {
    value: null,
    note: {
      pitch: 0,
      octave: 0
    }
  };

  const lowestNoteInSong: NoteDetermination = {
    value: null,
    note: {
      pitch: 0,
      octave: 0
    }
  };

  const len = song.length;

  for (let a = 0; a < len; a++) {
    const currentNote = splitNote(song[a]);
    let value = len;

    for (let b = 0; b < len; b++) {
      if (a === b) continue;

      const noteValues = splitNote(song[b]);

      if (noteValues.octave === currentNote.octave) {
        if (noteValues.pitch > currentNote.pitch) value -= 1;
      } else if (noteValues.octave > currentNote.octave) {
        value -= 1;
      }
    }

    if (
      highestNoteInSong.value === null ||
      highestNoteInSong.value < value
    ) {
      highestNoteInSong.value = value;
      highestNoteInSong.note = currentNote;
    }

    if (
      lowestNoteInSong.value === null ||
      lowestNoteInSong.value > value
    ) {
      lowestNoteInSong.value = value;
      lowestNoteInSong.note = currentNote;
    }
  }

  const singerLowestNote = splitNote(_singerLowestNote);
  const singerHighestNote = splitNote(_singerHighestNote);

  // 2. lowest note in song must not be lower than the singer's lowest note
  if (lowestNoteInSong.note.octave === singerLowestNote.octave) {
    if (lowestNoteInSong.note.pitch < singerLowestNote.pitch)
      return false;
  } else {
    if (lowestNoteInSong.note.octave < singerLowestNote.octave)
      return false;
  }

  // 3. highest note in song must not be higher than the singer's highest note
  if (highestNoteInSong.note.octave === singerHighestNote.octave) {
    if (highestNoteInSong.note.pitch > singerHighestNote.pitch)
      return false;
  } else {
    if (highestNoteInSong.note.octave > singerHighestNote.octave)
      return false;
  }

  return true;
}
