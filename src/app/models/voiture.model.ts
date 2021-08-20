import { v4 as uuidv4 } from 'uuid';

export class Voiture {
    id: string;
    image = '';
    modele = '';
    categorie = 'Familiale';
    sieges = 5;
    portes = 4;
    transmission = '';
    prixJournalier = 0;

    constructor(
        modele: string,
        image: string,
        prixJournalier: number,
        categorie?: string,
        sieges?: number,
        portes?: number,
        transmission?: string
    ) {
        this.id = this.generateID();
        modele ? this.modele = modele : this.rien();
        image ? this.image = image : this.rien();
        modele ? this.modele = modele : this.rien();
        prixJournalier ? this.prixJournalier = prixJournalier : this.prixJournalier = 10000;
        categorie ? this.categorie = categorie : this.rien();
        sieges ? this.sieges = sieges : this.rien();
        portes ? this.portes = portes : this.rien();
        transmission ? this.transmission = transmission : this.transmission = 'Manuelle';
    }

    rien() {

    }

    generateID(): string {
        return uuidv4();
    }
}
