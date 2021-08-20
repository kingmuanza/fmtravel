import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Trajet } from '../models/trajet.model';

@Injectable({
  providedIn: 'root'
})
export class TrajetService {

  constructor() { }

  getTrajets(): Promise<Array<Trajet>> {
    const trajets = new Array<Trajet>();
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();
      db.collection('trajets').get().then((resultats) => {
        resultats.forEach((resultat) => {
          const trajet = resultat.data() as Trajet;
          trajets.push(trajet);
        });
        resolve(trajets);
      }).catch((e) => {
      });
    });
  }
}
