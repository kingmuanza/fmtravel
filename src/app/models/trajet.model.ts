import { v4 as uuidv4 } from 'uuid';

export class Trajet {
    id: string;
    villeDepart!: string;
    villeArrivee!: string;
    interUrbain!: boolean;
    duree!: string;

    constructor() {
        this.id = this.generateID();
    }

    generateID(): string {
        return uuidv4();
    }
}
