import { v4 as uuidv4 } from 'uuid';
import { Depart } from './depart.model';
import { Voiture } from './voiture.model';

export class Reservation {
    id: string;
    depart: Depart;
    voiture: Voiture;
    responsable: any;
    date: Date;
    dateDebut: Date;
    dateFin: Date;
    user: any;
    cout: number;
    payee: boolean;

    constructor() {
        this.date = new Date();
        this.id = this.generateID();
    }

    generateID(): string {
        return uuidv4();
    }
}
