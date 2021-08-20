import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfilService } from 'src/app/services/profil.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  noms = '';
  prenoms = '';
  email = '';
  passe = '';
  constructor(
    private router: Router,
    private profilService: ProfilService,
  ) { }

  ngOnInit(): void {
  }

  inscription() {
    this.profilService.inscriptionViaEmail(this.email, this.passe, this.noms, this.prenoms).then(() => {
      this.router.navigate(['telephone']);
    });

  }

}
