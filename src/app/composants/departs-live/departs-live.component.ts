import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-departs-live',
  templateUrl: './departs-live.component.html',
  styleUrls: ['./departs-live.component.scss']
})
export class DepartsLiveComponent implements OnInit {

  lives = [0, 1, 2, 3, 4, 5, 6, 7];
  nombre = -1;
  constructor() { }

  ngOnInit(): void {
    // this.liver();
  }

  liver() {
    setInterval(() => {
      if (this.lives.length > this.nombre) {
        // this.lives.shift();
        this.nombre += 1;
      } else {
        this.nombre = 0;
      }
    }, 4000);
  }

}
