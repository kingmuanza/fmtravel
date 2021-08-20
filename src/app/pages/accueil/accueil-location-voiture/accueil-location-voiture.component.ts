import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Voiture } from 'src/app/models/voiture.model';
import { VoitureService } from 'src/app/services/voiture.service';

@Component({
  selector: 'app-accueil-location-voiture',
  templateUrl: './accueil-location-voiture.component.html',
  styleUrls: ['./accueil-location-voiture.component.scss']
})
export class AccueilLocationVoitureComponent implements OnInit {

  voitures = [
    new Voiture('Lamborghini', '../../../../assets/img/lambo.jpg', 170000, 'Luxe', 2, 2),
    new Voiture('Aston Martin', '../../../../assets/img/audi.jpg', 150000, 'Luxe', 2, 2),
    new Voiture('Mercedes ML', '../../../../assets/img/ml360.jpg', 50000),
  ];

  constructor(
    private router: Router,
    private voitureService: VoitureService,
  ) { }

  ngOnInit(): void {
    this.voitureService.getVoitures().then((voitures) => {
      this.voitures = voitures;
    });
  }

  voirVoiture(voiture: Voiture) {
    this.router.navigate(['voiture', 'view', voiture.id]);
  }

}
