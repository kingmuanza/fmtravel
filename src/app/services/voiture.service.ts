import { Injectable } from '@angular/core';
import { Voiture } from '../models/voiture.model';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  voitures = [
    new Voiture('Lamborghini', '../../../../assets/img/lambo.jpg', 170000, 'Luxe', 2, 2),
    new Voiture('Aston Martin', '../../../../assets/img/audi.jpg', 150000, 'Luxe', 2, 2),
    new Voiture('Mercedes ML', '../../../../assets/img/ml360.jpg', 50000),
  ];

  constructor() { }

  getVoitures(): Promise<Array<Voiture>> {
    const voitures = new Array<Voiture>();
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();
      db.collection('voitures').get().then((resultats) => {
        resultats.forEach((resultat) => {
          const voiture = resultat.data() as Voiture;
          voitures.push(voiture);
        });
        resolve(voitures);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  getVoiture(id: string): Promise<Voiture> {
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();
      db.collection('voitures').doc(id).get().then((resultat) => {
        const voiture = resultat.data() as Voiture;
        resolve(voiture);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  saveVoiture(voiture: Voiture): Promise<Voiture> {
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();
      const v = JSON.parse(JSON.stringify(voiture));
      db.collection('voitures').doc(voiture.id).set(v).then((resultats) => {
        resolve(v);
      }).catch((e) => {
        reject(e);
      });
    });
  }

}
