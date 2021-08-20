import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Depart } from 'src/app/models/depart.model';

@Component({
  selector: 'app-display-depart',
  templateUrl: './display-depart.component.html',
  styleUrls: ['./display-depart.component.scss']
})
export class DisplayDepartComponent implements OnInit, OnChanges {

  @Input() depart: Depart;
  @Input() recommandation = false;
  @Input() heure?: number;
  @Input() date?: Date;
  @Output() rate = new EventEmitter<Date>();
  @Output() calculEcart = new EventEmitter<number>();

  bestHeure: string;
  bestDate: Date;
  ecart = 24;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.heure) {
      this.bestDate = this.getBestHour(this.depart, this.heure);
      this.calculEcart.emit(this.ecart);
    }
  }

  emit() {
    console.log('Bonjour le monde');
    this.rate.emit(this.bestDate);
  }

  ngOnInit(): void {
  }

  getHeures(depart: Depart) {
    const heures = [];
    depart.heures.forEach((date) => {
      const d = new Date(date);
      const h = d.getHours();
      const m = d.getMinutes();

      let heure = '' + h;
      let minute = '' + m;

      if (h < 10) {
        heure = '0' + h;
      }
      if (m < 10) {
        minute = '0' + m;
      }
      heures.push(heure + ':' + minute);
    });
    return heures;
  }

  getBestHour(depart: Depart, heure: number): Date {
    let ecart = 24;
    let bestDate = new Date();

    depart.heures.forEach((date) => {
      const d = new Date(date);
      const h = d.getHours();
      const valeurAbsolue = Math.max(h - heure, heure - h);
      if (valeurAbsolue <= ecart) {
        bestDate = d;
        ecart = valeurAbsolue;
      }
    });
    this.ecart = ecart;
    return bestDate;
  }

}
