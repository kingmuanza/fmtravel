import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Voiture } from 'src/app/models/voiture.model';
import { VoitureService } from 'src/app/services/voiture.service';

@Component({
  selector: 'app-voiture-list',
  templateUrl: './voiture-list.component.html',
  styleUrls: ['./voiture-list.component.scss']
})
export class VoitureListComponent implements OnInit {

  voitures = [];
  constructor(
    private router: Router,
    private voitureService: VoitureService
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
