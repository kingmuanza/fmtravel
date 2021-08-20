import { v4 as uuidv4 } from 'uuid';

export class Agence {

    id: string;
    nom: string;
    siege: string;
    description: string;
    tel1: string;
    tel2: string;
    bus: boolean;

    constructor() {
        this.id = this.generateID();
    }

    generateID(): string {
        return uuidv4();
    }
}
