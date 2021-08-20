import { Agence } from './agence.model';

export class Besoin {
    depart: string;
    arrivee: string;
    moyen: string;
    date: Date;
    agence: Agence;

    constructor(depart: string, arrivee: string, moyen: string, date) {
        this.depart = depart;
        this.arrivee = arrivee;
        this.moyen = moyen;
        this.date = date;
    }
}
