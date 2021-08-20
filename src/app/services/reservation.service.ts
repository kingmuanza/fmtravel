import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Besoin } from '../models/besoin.model';
import { Reservation } from '../models/reservation.model';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  besoin: Besoin;
  besoinSubject = new Subject<Besoin>();
  besoinObservable = this.besoinSubject.asObservable();

  reservation: Reservation;
  reservationSubject = new Subject<Reservation>();
  reservationObservable = this.besoinSubject.asObservable();

  constructor() {

    const besoinstring = localStorage.getItem('FMBesoin');
    if (besoinstring) {
      this.besoin = JSON.parse(besoinstring);
    }

    const reservationstring = localStorage.getItem('FMReservation');
    if (reservationstring) {
      this.reservation = JSON.parse(reservationstring);
    }
  }

  annoncerBesoin(b: Besoin) {
    localStorage.setItem('FMBesoin', JSON.stringify(b));
    this.besoin = b;
    this.besoinSubject.next(b);
  }

  annoncerReservation(reservation: Reservation) {
    localStorage.setItem('FMReservation', JSON.stringify(reservation));
    this.reservation = reservation;
    this.reservationSubject.next(reservation);
  }

  getReservations(): Promise<Array<Reservation>> {
    const reservations = new Array<Reservation>();
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();
      db.collection('reservations').get().then((resultats) => {
        resultats.forEach((resultat) => {
          const reservation = resultat.data() as Reservation;
          reservations.push(reservation);
        });
        reservations.sort((a, b) => {
          return new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1;
        });
        resolve(reservations);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  getReservation(id): Promise<Reservation> {
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();
      db.collection('reservations').doc(id).get().then((resultat) => {
        const reservation = resultat.data() as Reservation;
        resolve(reservation);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  saveReservation(reservation: Reservation): Promise<Reservation> {
    return new Promise((resolve, reject) => {
      const r = JSON.parse(JSON.stringify(reservation));
      const db = firebase.firestore();
      db.collection('reservations').doc(reservation.id).set(r).then(() => {
        resolve(r);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  deleteReservation(reservation: Reservation): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();
      db.collection('reservations').doc(reservation.id).delete().then(() => {
        resolve(true);
      }).catch((e) => {
        reject(false);
      });
    });
  }

}
