import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Agence } from '../models/agence.model';
import { Depart } from '../models/depart.model';
import { Trajet } from '../models/trajet.model';

@Injectable({
  providedIn: 'root'
})
export class AgenceService {

  constructor() { }

  getAgences(): Promise<Array<Agence>> {
    const agences = new Array<Agence>();
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();
      db.collection('agences').get().then((resultats) => {
        resultats.forEach((resultat) => {
          const agence = resultat.data() as Agence;
          agences.push(agence);
        });
        resolve(agences);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  getAgence(id: string): Promise<Agence> {
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();
      db.collection('agences').doc(id).get().then((resultat) => {
        const agence = resultat.data() as Agence;
        resolve(agence);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  getDepartsOfAgence(agence: Agence): Promise<Array<Depart>> {
    console.log('getDepartsOfAgence');
    const departs = new Array<Depart>();
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();
      db.collection('departs').where('agence.id', '==', agence.id).get().then((resultats) => {
        resultats.forEach((resultat) => {
          const depart = resultat.data() as Depart;
          departs.push(depart);
        });
        resolve(departs);
      }).catch((e) => {
        reject(e);
      });
    });
  }

}
