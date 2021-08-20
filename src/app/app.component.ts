import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { ProfilService } from './services/profil.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fmtravel';

  constructor(
    private profilService: ProfilService
  ) {

    const firebaseConfig = {
      apiKey: 'AIzaSyBGb-zbCXWlCvv2aCjLa6RKHJaPcSL6XIE',
      authDomain: 'fmtravelling-muanza.firebaseapp.com',
      projectId: 'fmtravelling-muanza',
      storageBucket: 'fmtravelling-muanza.appspot.com',
      messagingSenderId: '1005280935916',
      appId: '1:1005280935916:web:1bae35e6ee49ce13cd8ac9',
      measurementId: 'G-9HCFEMYTPH'
    };
    firebase.initializeApp(firebaseConfig);

  }
  ngOnInit(): void {
    this.profilService.autoConnexion();
  }
}
