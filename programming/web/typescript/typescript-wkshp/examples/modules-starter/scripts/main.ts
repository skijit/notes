import { Conference } from './conference'
import { Speaker } from './speaker';

//since this is in a module, it doesn't matter if you use let or var
const conference = new Conference('AngleBrackets');
conference.addSessions("TypeScript with John");
var s1 = new Speaker('Dan the man', 'Wahlin');
var s2 = new Speaker('John', 'Poppa');
conference.addSpeaker(s1);
conference.addSpeaker(s2);

document.getElementById('whatever').innerHTML = s1.firstName;


