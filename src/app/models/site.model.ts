import { v4 as uuidv4 } from 'uuid';

export class Site {
    id: string;
    ville: string;
    adresse: string;

    constructor() {
        this.id = this.generateID();
    }

    generateID(): string {
        return uuidv4();
    }
}
