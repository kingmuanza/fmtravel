import { Component, Input, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation.model';

@Component({
  selector: 'app-display-reservation-recap',
  templateUrl: './display-reservation-recap.component.html',
  styleUrls: ['./display-reservation-recap.component.scss']
})
export class DisplayReservationRecapComponent implements OnInit {

  @Input() reservation: Reservation;

  constructor() { }

  ngOnInit(): void {
  }

}
