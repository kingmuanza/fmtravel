import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfilService } from 'src/app/services/profil.service';

@Component({
  selector: 'app-telephone',
  templateUrl: './telephone.component.html',
  styleUrls: ['./telephone.component.scss']
})
export class TelephoneComponent implements OnInit {

  tel: string;
  constructor(
    private profilService: ProfilService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  saveTelephone() {
    this.profilService.verifierTelephone('696543495').then(() => {
      this.router.navigate(['accueil']);
    });
  }

}
