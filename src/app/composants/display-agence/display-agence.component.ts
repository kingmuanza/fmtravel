import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Agence } from 'src/app/models/agence.model';
import { Depart } from 'src/app/models/depart.model';
import { Trajet } from 'src/app/models/trajet.model';
import { AgenceService } from 'src/app/services/agence.service';

@Component({
  selector: 'app-display-agence',
  templateUrl: './display-agence.component.html',
  styleUrls: ['./display-agence.component.scss']
})
export class DisplayAgenceComponent implements OnInit, OnChanges {

  @Input() agence: Agence;
  @Input() recommandation = false;
  @Input() heure?: number;
  @Input() date?: Date;
  @Output() rate = new EventEmitter<Date>();
  @Output() calculEcart = new EventEmitter<number>();

  bestHeure: string;
  bestDate: Date;
  ecart = 24;

  departs = new Array<Depart>();
  trajets = new Array<Trajet>();

  constructor(
    private agenceService: AgenceService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.agence) {
      this.agenceService.getDepartsOfAgence(this.agence).then((departs) => {
        this.departs = departs;
        departs.sort((a, b) => {
          return a.trajet.villeDepart > b.trajet.villeDepart ? 1 : -1;
        });
        departs.forEach((depart) => {
          if (!this.estTrajetRetour(depart.trajet)) {
            this.trajets.push(depart.trajet);
          }
        });
      });
    }
  }

  estTrajetRetour(trajet: Trajet) {
    let est = false;
    if (this.trajets.length > 0) {
      this.trajets.forEach((t) => {
        if (t.villeDepart === trajet.villeArrivee && t.villeArrivee === trajet.villeDepart) {
          est = true;
        }
      });
    }
    return est;
  }

  emit() {
    console.log('Bonjour le monde');
    this.rate.emit(this.bestDate);
  }

  ngOnInit(): void {
  }

}
