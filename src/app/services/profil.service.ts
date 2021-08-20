import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  user: firebase.User;
  userSubject = new Subject<firebase.User>();

  constructor() { }

  emit() {
    this.userSubject.next(this.user);
  }

  verifierTelephone(phoneNumber: string) {
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();
      db.collection('utilisateurs').doc(this.user.uid).set({
        tel: phoneNumber
      }).then(() => {
        resolve(true);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  getTelephone(user: firebase.User): Promise<any> {
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();
      db.collection('utilisateurs').doc(user.uid).get().then((resultat) => {
        const user = resultat.data();
        resolve(user);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  saveUser() {
    localStorage.setItem('FMTUser', JSON.stringify(this.user));
  }

  deconnexion() {
    this.userSubject.next(undefined);
    localStorage.removeItem('FMTUser');
  }

  connexionViaEmail(email: string, password: string): Promise<firebase.User | null> {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const utilisateur = userCredential.user as firebase.User;
          console.log(utilisateur);
          this.user = utilisateur;
          this.emit();
          this.saveUser();
          resolve(utilisateur);
        })
        .catch((error) => {
          console.log('error');
          console.log(error);
          reject(error);
        });
    });
  }

  inscriptionViaEmail(email: string, password: string, noms: string, prenoms: string): Promise<firebase.User | null> {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const utilisateur = userCredential.user as firebase.User;
          console.log(utilisateur);
          utilisateur.updateProfile({
            displayName: noms + ' ' + prenoms
          }).then(() => {
            this.user = utilisateur;
            this.emit();
            this.saveUser();
            resolve(utilisateur);
          });
        })
        .catch((error) => {
          console.log('error');
          console.log(error);
          reject(error);
        });
    });
  }


  connexionGoogle(): Promise<firebase.User | null> {
    return new Promise((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          const credential = result.credential;
          const user = result.user as firebase.User;
          console.log('user');
          console.log(user);
          this.user = user;
          this.emit();
          this.saveUser();
          resolve(user);
          // ...
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = error.credential;
          reject(error);
          // ...
        });
    });
  }

  connexionFacebook(): Promise<firebase.User | null> {
    return new Promise((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          const credential = result.credential;
          const user = result.user as firebase.User;
          console.log('user');
          console.log(user);
          this.user = user;
          this.emit();
          this.saveUser();
          resolve(user);
          // ...
        }).catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  autoConnexion() {
    console.log('autoconnexion');
    const userString = localStorage.getItem('FMTUser');
    console.log('userString');
    console.log(userString);
    if (userString) {
      try {
        const user = JSON.parse(userString);
        this.user = user;
        this.emit();
      } catch (e) {

      }
    }
  }

}
