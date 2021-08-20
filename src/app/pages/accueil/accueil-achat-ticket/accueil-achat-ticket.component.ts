import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfilService } from 'src/app/services/profil.service';
import firebase from 'firebase';
import { Besoin } from 'src/app/models/besoin.model';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-accueil-achat-ticket',
  templateUrl: './accueil-achat-ticket.component.html',
  styleUrls: ['./accueil-achat-ticket.component.scss']
})
export class AccueilAchatTicketComponent implements OnInit {

  user!: firebase.User;
  userSubscription!: Subscription;

  depart = 'Douala';
  arrivee = 'Yaoundé';
  moyen = 'bus';
  jour = new Date();
  heure = '10:00';
  heures = [];
  dater: any;

  constructor(
    private profilService: ProfilService,
    private router: Router,
    private reservationService: ReservationService,
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.profilService.userSubject.subscribe((user) => {
      this.user = user;
      console.log('mon user');
      console.log(user);
    });
    this.profilService.emit();
    this.dater = $('[data-toggle="datepicker"]') as any;
    this.dater.datepicker();
    this.dater.datepicker('setDate', new Date());
    this.chargerLesHeures();
  }

  chargerLesHeures() {
    for (let i = 0; i < 10; i++) {
      this.heures.push('0' + i + ':00');
    }
    for (let i = 10; i < 24; i++) {
      this.heures.push( i + ':00');
    }
  }

  suivant() {
    this.jour = this.dater.datepicker('getDate');
    console.log(this.jour);
    this.jour = new Date(this.jour);
    console.log(this.jour.getDate());
    this.jour.setDate(this.jour.getDate() + 1);
    const jour = this.jour.toISOString().split('T')[0];
    this.jour = new Date(jour + ' ' + this.heure);
    console.log('jour');
    console.log(jour);
    const besoin = new Besoin(this.depart, this.arrivee, this.moyen, this.jour);
    console.log('besoin');
    console.log(besoin);
    this.reservationService.annoncerBesoin(besoin);
    this.router.navigate(['reservation', 'choix']);
  }

}
