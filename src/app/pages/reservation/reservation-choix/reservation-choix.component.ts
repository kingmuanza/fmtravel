import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agence } from 'src/app/models/agence.model';
import { Besoin } from 'src/app/models/besoin.model';
import { Depart } from 'src/app/models/depart.model';
import { Reservation } from 'src/app/models/reservation.model';
import { Trajet } from 'src/app/models/trajet.model';
import { AgenceService } from 'src/app/services/agence.service';
import { DepartService } from 'src/app/services/depart.service';
import { ProfilService } from 'src/app/services/profil.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { TrajetService } from 'src/app/services/trajet.service';

@Component({
  selector: 'app-reservation-choix',
  templateUrl: './reservation-choix.component.html',
  styleUrls: ['./reservation-choix.component.scss']
})
export class ReservationChoixComponent implements OnInit {

  agences = new Array<Agence>();
  besoin: Besoin;
  trajets = new Array<Trajet>();
  departs = new Array<Depart>();
  heure = 0;
  date: Date;

  classement = new Object();
  constructor(
    private router: Router,
    private agenceService: AgenceService,
    private trajetService: TrajetService,
    private departService: DepartService,
    private profilService: ProfilService,
    private reservationService: ReservationService,
  ) { }

  ngOnInit(): void {
    this.besoin = this.reservationService.besoin;
    if (this.besoin) {
      this.heure = new Date(this.besoin.date).getHours();
      this.date = new Date(this.besoin.date);
      this.getDeparts(this.besoin);
    }
  }

  creer() {
    this.router.navigate(['agence', 'edit']);
  }

  creerTrajet() {
    this.router.navigate(['trajet', 'edit']);
  }

  creerDepart() {
    this.router.navigate(['depart', 'edit']);
  }

  getAgences() {
    this.agenceService.getAgences().then((agences) => {
      this.agences = agences;
    });
  }

  getTrajets() {
    this.trajetService.getTrajets().then((trajets) => {
      this.trajets = trajets;
    });
  }

  getDeparts(besoin: Besoin) {
    this.departService.getDeparts().then((departs) => {
      this.departs = departs.filter((depart) => {
        const villeCheck = depart.trajet.villeDepart === besoin.depart && depart.trajet.villeArrivee === besoin.arrivee;
        return villeCheck;
      });
    });
  }

  reserver(depart: Depart, date?: Date) {
    const reservation = new Reservation();
    reservation.depart = depart;
    reservation.user = this.profilService.user;
    reservation.date = new Date(this.besoin.date);
    reservation.dateDebut = date;
    reservation.cout = depart.prix;
    this.reservationService.saveReservation(reservation).then(() => {
      this.router.navigate(['reservation', 'edit', reservation.id]);
    });
  }

  onCalculEcart(depart: Depart, ev) {
    console.log('Hello world');
    console.log(ev);
    this.classement[depart.id] = ev;
    if (Object.keys(this.classement).length === this.departs.length) {
      console.log('this.classement');
      console.log(this.classement);
      this.departs.sort((a, b) => {
        return this.classement[a.id] < this.classement[b.id] ? -1 : 1;
      });
    }
  }

  onSelect(depart: Depart, ev) {
    console.log('SElection world');
    console.log(ev);
    this.reserver(depart, new Date(ev));
  }

}
