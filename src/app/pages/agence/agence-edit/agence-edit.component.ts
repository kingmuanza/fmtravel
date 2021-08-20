import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import firebase from 'firebase';
import { Agence } from 'src/app/models/agence.model';

@Component({
  selector: 'app-agence-edit',
  templateUrl: './agence-edit.component.html',
  styleUrls: ['./agence-edit.component.scss']
})
export class AgenceEditComponent implements OnInit {

  agence: Agence;
  form: FormGroup;

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
        db.collection('agences-trap').doc(id).get().then((resultat) => {
          const agence = resultat.data() as Agence;
          this.agence = agence;
          this.initForm();
        }).catch((e) => {
        });
      }
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      nom: [this.agence ? this.agence.nom : '', Validators.required],
      description: [this.agence ? this.agence.description : '', Validators.required],
      tel1: [this.agence ? this.agence.tel1 : '', Validators.required],
      tel2: [this.agence ? this.agence.tel2 : '', Validators.required],
      bus: [this.agence ? this.agence.bus : false]
    });

  }

  onSubmitForm() {
    const value = this.form.value;
    let agence = new Agence();

    if (this.agence) {
      agence = this.agence;
    }

    agence.nom = value.nom;
    agence.description = value.description;
    agence.tel2 = value.tel2;
    agence.tel1 = value.tel1;
    if (value.bus) {
      agence.bus = true;
    } else {
      agence.bus = false;
    }

    const db = firebase.firestore();
    db.collection('agences').doc(agence.id).set(JSON.parse(JSON.stringify(agence))).then(() => {
      this.router.navigate(['agence']);
    }).catch((e) => {
    });

  }

}
