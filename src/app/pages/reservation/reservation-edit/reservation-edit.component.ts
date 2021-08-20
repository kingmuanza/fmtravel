import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfilService } from 'src/app/services/profil.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { Besoin } from 'src/app/models/besoin.model';
import { Reservation } from 'src/app/models/reservation.model';

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.scss']
})
export class ReservationEditComponent implements OnInit {

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
      if (reservation.responsable) {
        this.responsable = reservation.responsable;
      }
    });
  }

  suivant() {
    console.log('this.responsable');
    console.log(this.responsable);
    if (this.responsable.nom && this.responsable.tel
      && this.responsable.numero && this.responsable.piece) {
      this.reservation.responsable = this.responsable;
      this.reservationService.saveReservation(this.reservation).then(() => {
        this.router.navigate(['reservation', 'paiement', this.reservation.id]);
      });
    } else {
      alert('Veuillez remplir les informations du voyageur');
    }
  }

}
