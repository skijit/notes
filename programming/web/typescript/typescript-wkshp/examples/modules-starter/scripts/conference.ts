import { Speaker } from './speaker';

export class Conference {
    
    constructor(public name: string, public speakers: Speaker[] = [], public sessions: string[] = []) {  }
    
    addSpeaker(name: Speaker) {
        this.speakers.push(name);
    }
    
    addSessions(sessionName: string) {
        this.sessions.push(sessionName);
    }
}