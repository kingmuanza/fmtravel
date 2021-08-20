import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agence } from 'src/app/models/agence.model';
import { Besoin } from 'src/app/models/besoin.model';
import { Depart } from 'src/app/models/depart.model';
import { Reservation } from 'src/app/models/reservation.model';
import { AgenceService } from 'src/app/services/agence.service';
import { DepartService } from 'src/app/services/depart.service';
import { ProfilService } from 'src/app/services/profil.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-agence-view',
  templateUrl: './agence-view.component.html',
  styleUrls: ['./agence-view.component.scss']
})
export class AgenceViewComponent implements OnInit {

  agence: Agence;
  departs = new Array<Depart>();
  dater: any;
  jour = new Date();
  heure: Date;
  besoin: Besoin;
  departEnCours: Depart;
  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private router: Router,
    private agenceService: AgenceService,
    private departService: DepartService,
    private profilService: ProfilService,
  ) { }

  ngOnInit(): void {
    let modal: any;
    modal = $('#exampleModal');
    modal.modal();
    this.dater = $('[data-toggle="datepicker"]') as any;
    this.dater.datepicker().on('change', () => {
      // $('.datepicker-container').hide();
    });
    // this.dater.datepicker('setDate', new Date());
    const that = this;
    $('#exampleModal').on('shown.bs.modal', (e) => {
      console.log('le modal sest ouvert');
      $('.daterangepicker').css('z-index', '1600');
      $('.datepicker ').css('z-index', '1600');
      that.dater = $('[data-toggle="datepicker"]') as any;
      this.dater.datepicker().on('change', () => {
        // $('.datepicker-container').hide();
      });
      // that.dater.datepicker('setDate', new Date());
    });

    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.agenceService.getAgence(id).then((agence) => {
          this.agence = agence;
          this.agenceService.getDepartsOfAgence(this.agence).then((departs) => {
            this.departs = departs;
          });
        });
      }
    });
  }

  toggleModal() {
    let modal: any;
    modal = $('#exampleModal');
    modal.modal('toggle');
  }

  toDate(date) {
    return new Date(date);
  }

  suivant(depart: Depart, heure: Date) {
    this.toggleModal();
    const jour = new Date();
    this.heure = heure;
    const besoin = new Besoin(depart.trajet.villeDepart, depart.trajet.villeArrivee, 'bus', jour);
    this.departEnCours = depart;
    console.log('besoin');
    console.log(besoin);
  }

  continuer() {
    const besoin = this.reservationService.besoin;

    this.jour = this.dater.datepicker('getDate');
    console.log(this.jour);
    this.jour = new Date(this.jour);
    console.log(this.jour.getDate());
    this.jour.setDate(this.jour.getDate() + 1);
    const jour = this.jour.toISOString().split('T')[0];
    this.jour = new Date(jour);

    const heure = new Date(this.heure);
    this.jour.setHours(heure.getHours());
    this.jour.setMinutes(heure.getMinutes());

    besoin.date = this.jour;
    console.log('besoin');
    console.log(besoin);
    this.toggleModal();

    this.besoin = besoin;
    this.reservationService.annoncerBesoin(besoin);
    this.reserver(this.departEnCours, besoin.date);
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


}
