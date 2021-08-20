import { Component, Input, OnInit } from '@angular/core';
import { Voiture } from 'src/app/models/voiture.model';

@Component({
  selector: 'app-display-voiture',
  templateUrl: './display-voiture.component.html',
  styleUrls: ['./display-voiture.component.scss']
})
export class DisplayVoitureComponent implements OnInit {

  @Input() voiture: Voiture;
  constructor() { }

  ngOnInit(): void {
  }

}
