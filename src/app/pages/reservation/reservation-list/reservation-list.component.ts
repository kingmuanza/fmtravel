import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {

  reservations = [];

  constructor(
    private reservationService: ReservationService
  ) { }

  ngOnInit(): void {
    this.reservationService.getReservations().then((reservations) => {
      this.reservations = reservations;
    });
  }

}
