import { Component, OnInit } from '@angular/core';
import { ProfilService } from 'src/app/services/profil.service';
import firebase from 'firebase';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-haut',
  templateUrl: './menu-haut.component.html',
  styleUrls: ['./menu-haut.component.scss']
})
export class MenuHautComponent implements OnInit {

  user!: firebase.User;
  userSubscription!: Subscription;

  constructor(
    private profilService: ProfilService
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.profilService.userSubject.subscribe((user) => {
      this.user = user;
      console.log('mon user');
      console.log(user);
    });
    this.profilService.emit();
  }

  deconnexion() {
    this.profilService.deconnexion();
  }

}
