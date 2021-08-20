import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import firebase from 'firebase';
import { Trajet } from 'src/app/models/trajet.model';

@Component({
  selector: 'app-trajet-edit',
  templateUrl: './trajet-edit.component.html',
  styleUrls: ['./trajet-edit.component.scss']
})
export class TrajetEditComponent implements OnInit {

  trajet!: Trajet;
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id') as string;
      if (id) {
        const db = firebase.firestore();
        db.collection('trajets').doc(id).get().then((resultat) => {
          const trajet = resultat.data() as Trajet;
          this.trajet = trajet;
          this.initForm();
        }).catch((e) => {
        });
      }
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      villeDepart: [this.trajet ? this.trajet.villeDepart : '', Validators.required],
      villeArrivee: [this.trajet ? this.trajet.villeArrivee : '', Validators.required],
      duree: [this.trajet ? this.trajet.duree : ''],
      retour: [false]
    });

  }

  onSubmitForm() {
    const value = this.form.value;
    let trajet = new Trajet();
    if (this.trajet) {
      trajet = this.trajet;
    }
    const trajetRetour = new Trajet();

    let retour = value.retour;
    if (this.trajet) {
      retour = false;
    }
    console.log('retour');
    console.log(retour);
    trajet.villeArrivee = value.villeArrivee;
    trajet.villeDepart = value.villeDepart;
    trajet.duree = value.duree;

    trajetRetour.villeArrivee = value.villeDepart;
    trajetRetour.villeDepart = value.villeArrivee;
    trajetRetour.duree = value.duree;

    if (value.villeArrivee === value.villeDepart) {
      retour = false;
    }

    const db = firebase.firestore();
    db.collection('trajets').doc(trajet.id).set(JSON.parse(JSON.stringify(trajet))).then(() => {
      if (retour) {
        db.collection('trajets').doc(trajetRetour.id).set(JSON.parse(JSON.stringify(trajetRetour))).then(() => {
          console.log('TERMINEEE !!!');
          this.router.navigate(['reservation', 'choix']);
        }).catch((e) => {
        });
      } else {
        // this.router.navigate(['offres', 'transport']);
      }
    }).catch((e) => {
    });

  }

}
