import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  hauteur = 800;
  opacite = 1;
  @HostListener('window:scroll', ['$event'])
  doSomething(event: any) {
    // console.log('y', window.pageYOffset);
    // console.log('Y', 1000);
    let coeff = (1000 - window.pageYOffset) / 1000;
    if (coeff <= 0) {
      coeff = 0;
    }
    // console.log('coeff', coeff);
    /// this.hauteur = 1000 * coeff;
    this.opacite = coeff;
    // console.log(event);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
