import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Depart } from 'src/app/models/depart.model';
import { Reservation } from 'src/app/models/reservation.model';
import { Voiture } from 'src/app/models/voiture.model';
import { ProfilService } from 'src/app/services/profil.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { VoitureService } from 'src/app/services/voiture.service';

@Component({
  selector: 'app-voiture-view',
  templateUrl: './voiture-view.component.html',
  styleUrls: ['./voiture-view.component.scss']
})
export class VoitureViewComponent implements OnInit {

  voiture: Voiture;
  heures = [];
  heureDebut = '10:00';
  heureFin = '10:00';
  debut: any;
  fin: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private voitureService: VoitureService,
    private profilService: ProfilService,
    private reservationService: ReservationService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.voitureService.getVoiture(id).then((voiture) => {
          this.voiture = voiture;
          this.debut = $('.debut') as any;
          this.fin = $('.fin') as any;
          this.debut.datepicker();
          this.fin.datepicker();
          // this.dater.datepicker('setDate', new Date());
          this.chargerLesHeures();
        });
      }
    });
  }

  chargerLesHeures() {
    for (let i = 0; i < 10; i++) {
      this.heures.push('0' + i + ':00');
    }
    for (let i = 10; i < 24; i++) {
      this.heures.push(i + ':00');
    }
  }

  reserver(voiture: Voiture) {
    const debut = this.debut.datepicker('getDate');
    console.log('debut');
    console.log(debut);
    const fin = this.fin.datepicker('getDate');
    console.log('fin');
    console.log(fin);

    if (debut && fin) {
      const reservation = new Reservation();

      const hd = Number(this.heureDebut.split(':')[0]);
      const hf = Number(this.heureFin.split(':')[0]);

      console.log('this.heureDebut');
      console.log(this.heureDebut);
      console.log('this.heureFin');
      console.log(this.heureFin);

      reservation.dateDebut = new Date(debut);
      reservation.dateDebut.setHours(hd);

      reservation.dateFin = new Date(fin);
      reservation.dateFin.setHours(hf);

      reservation.voiture = voiture;
      reservation.user = this.profilService.user;
      console.log('reservation');
      console.log(reservation);

      if (
        reservation.dateDebut.getTime() > new Date().getTime()
        && reservation.dateFin.getTime() > reservation.dateDebut.getTime()
      ) {
        console.log('calculerNombreJoursEntreDates');
        console.log(this.calculerNombreJoursEntreDates(reservation.dateDebut, reservation.dateFin));
        const jours = this.calculerNombreJoursEntreDates(reservation.dateDebut, reservation.dateFin);

        reservation.cout = voiture.prixJournalier * jours;

        this.reservationService.saveReservation(reservation).then(() => {
          this.router.navigate(['reservation', 'edit', reservation.id]);
        });

      } else {
        alert('Veuillez remplir les dates');
      }
    } else {
      alert('Veuillez remplir les dates');
    }
  }

  calculerNombreJoursEntreDates(debut: Date, fin: Date): number {
    const diff = fin.getTime() - debut.getTime();
    const seconds = diff / 1000;
    const minutes = seconds / 60;
    const heures = minutes / 60;
    const jours = heures / 24;
    return Math.ceil(jours);
  }

}
