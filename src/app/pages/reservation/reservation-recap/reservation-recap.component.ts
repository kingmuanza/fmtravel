import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Besoin } from 'src/app/models/besoin.model';
import { Reservation } from 'src/app/models/reservation.model';
import { ProfilService } from 'src/app/services/profil.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation-recap',
  templateUrl: './reservation-recap.component.html',
  styleUrls: ['./reservation-recap.component.scss']
})
export class ReservationRecapComponent implements OnInit {

  user: any;
  tel: '';
  besoin: Besoin;
  reservation: Reservation;
  responsable = {
    nom: '',
    tel: '',
    piece: '',
    numero: ''
  };

  moyen: string;
  numero: string;

  waitingPaiement = false;
  waitingEffectuee = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private profilService: ProfilService,
  ) { }

  ngOnInit(): void {
    this.besoin = this.reservationService.besoin;
    this.user = this.profilService.user;
    if (this.user) {
      this.profilService.getTelephone(this.user).then((info) => {
        if (info) {
          this.tel = info.tel;
          this.responsable.tel = info.tel;
          this.responsable.nom = this.user.displayName;
        }
      });
    }

    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.getReservation(id);
      }
    });
  }

  getReservation(id: string) {
    this.reservationService.getReservation(id).then((reservation) => {
      this.reservation = reservation;
    });
  }

  precedent() {
    this.router.navigate(['reservation', 'edit', this.reservation.id]);
  }

  suivant() {
    console.log('this.responsable');
    console.log(this.responsable);
    if (this.moyen && this.numero) {
      this.reservationService.saveReservation(this.reservation).then(() => {
        this.waitingPaiement = true;
        setTimeout(() => {
          this.waitingPaiement = false;
          this.waitingEffectuee = true;
          setTimeout(() => {
            this.router.navigate(['reservation', 'recap', this.reservation.id]);
          }, 1000);
        }, 2000);
      });
    } else {
      alert('Veuillez remplir les informations de paiement');
    }
  }

  terminer() {
    this.router.navigate(['accueil']);
  }

}
