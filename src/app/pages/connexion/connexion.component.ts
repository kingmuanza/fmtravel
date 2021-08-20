import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfilService } from 'src/app/services/profil.service';
import firebase from 'firebase';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  login = '';
  passe = '';
  constructor(
    private router: Router,
    private profilService: ProfilService,
  ) { }

  ngOnInit(): void {
  }

  verificationTel(user: firebase.User) {
    const db = firebase.firestore();
    db.collection('utilisateurs').doc(user.uid).get().then((resultat) => {
      const data = resultat.data();
      if (data && data.tel) {
        this.router.navigate(['accueil']);
      } else {
        this.router.navigate(['telephone']);
      }
    });
  }

  connexion() {
    if (this.login && this.passe) {
      this.profilService.connexionViaEmail(this.login, this.passe).then((user) => {
        this.verificationTel(user);
      });
    }
  }

  connexionGoogle() {
    this.profilService.connexionGoogle().then((user) => {
      this.verificationTel(user);
    });
  }

  connexionFacebook() {
    this.profilService.connexionFacebook().then((user) => {
      this.verificationTel(user);
    });
  }

  inscrire() {
    this.router.navigate(['inscription']);
  }

}
