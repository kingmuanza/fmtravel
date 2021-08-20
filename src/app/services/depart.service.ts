import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Depart } from '../models/depart.model';

@Injectable({
  providedIn: 'root'
})
export class DepartService {

  constructor() { }

  getDeparts(): Promise<Array<Depart>> {
    const departs = new Array<Depart>();
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();
      db.collection('departs').get().then((resultats) => {
        resultats.forEach((resultat) => {
          const depart = resultat.data() as Depart;
          departs.push(depart);
        });
        departs.sort((a, b) => {
          return a.agence.nom > b.agence.nom ? -1 : 1;
        });
        resolve(departs);
      }).catch((e) => {
      });
    });
  }
}
