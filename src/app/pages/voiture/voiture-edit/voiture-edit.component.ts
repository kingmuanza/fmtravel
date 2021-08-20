import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import firebase from 'firebase';
import { Trajet } from 'src/app/models/trajet.model';
import { Voiture } from 'src/app/models/voiture.model';
import { VoitureService } from 'src/app/services/voiture.service';

@Component({
  selector: 'app-voiture-edit',
  templateUrl: './voiture-edit.component.html',
  styleUrls: ['./voiture-edit.component.scss']
})
export class VoitureEditComponent implements OnInit {

  voiture = new Voiture('', '', 0);
  photoURL = '';
  file: any;
  encours: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private voitureService: VoitureService,
  ) { }

  ngOnInit(): void {
  }

  uploadFile(event: any) {
    console.log(event.target.files);
    this.file = event.target.files.item(0);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (ev: any) => {
        this.photoURL = ev.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  saveImage(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.encours = true;
      const r = Math.floor(Math.random() * 1000000);
      const storageRef = firebase.storage().ref('voitures/voiture' + r + '/' + this.file.name);

      const task = storageRef.put(this.file);
      task.then(data => {
        // console.log("ok", data);
        const imageUrl = storageRef.getDownloadURL().then(url => {
          this.photoURL = url;
          this.voiture.image = url;
          this.encours = false;
          resolve();
        });
      }).catch((e) => {
        reject(e);
      });
    });
  }

  save() {
    if (this.photoURL) {
      console.log('avant');
      console.log(this.voiture);
      this.saveImage().then(() => {
        console.log('après');
        console.log(this.voiture);
        this.voitureService.saveVoiture(this.voiture).then(() => {
          this.router.navigate(['voiture']);
        })
      });
    }
  }

}
