import { singable } from 'can-singer-sing-song';
import { logError, logOutput } from 'shared/logger';

const song1: Note[] = ['F4', 'B4', 'C5'];
const song2: Note[] = ['C3', 'E3', 'G3', 'C4', 'E4', 'G4', 'C5'];
const song3: Note[] = ['B4', 'F5', 'B5'];
const song4: Note[] = [
  'B4',
  'E4',
  'G4',
  'G4',
  'A4',
  'B4',
  'E4',
  'B4',
  'E4',
  'G4',
  'G4',
  'A4',
  'C5',
  'B4',
  'E5',
  'G4',
  'G4',
  'A4',
  'B4',
  'C5',
  'D5',
  'C5',
  'B4',
  'C5',
  'E5',
  'D5',
  'C5',
  'C5',
  'B4',
  'B4',
  'E5',
  'E4',
  'G4',
  'G4',
  'A4',
  'B4',
  'B4',
  'B4',
  'C5',
  'E5',
  'A5',
  'E5',
  'C5',
  'A4',
  'E5',
  'D5',
  'C5',
  'B4'
];
const song5: Note[] = ['F4'];

function logResult (
  value: ReturnType<typeof singable>,
  expected: boolean
) {
  if (value === expected) logOutput('success');
  else logError('failed');
}

logResult(singable(song1, 'A4', 'C5'), false);
logResult(singable(song2, 'B2', 'C5'), true);
logResult(singable(song2, 'C3', 'B4'), false);
logResult(singable(song3, 'B4', 'B5'), true);
logResult(singable(song3, 'B4', 'C5'), false);
logResult(singable(song4, 'D4', 'A5'), true);
logResult(singable(song4, 'D4', 'G5'), false);
logResult(singable(song4, 'D4', 'C6'), true);
logResult(singable(song4, 'F4', 'C6'), false);
logResult(singable(song5, 'D4', 'E4'), false);
