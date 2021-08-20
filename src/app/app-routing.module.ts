import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { AgenceEditComponent } from './pages/agence/agence-edit/agence-edit.component';
import { AgenceListComponent } from './pages/agence/agence-list/agence-list.component';
import { AgenceViewComponent } from './pages/agence/agence-view/agence-view.component';
import { ConfirmationEditComponent } from './pages/confirmation/confirmation-edit/confirmation-edit.component';
import { ConfirmationListComponent } from './pages/confirmation/confirmation-list/confirmation-list.component';
import { ConfirmationViewComponent } from './pages/confirmation/confirmation-view/confirmation-view.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { DepartEditComponent } from './pages/depart/depart-edit/depart-edit.component';
import { DepartListComponent } from './pages/depart/depart-list/depart-list.component';
import { DepartViewComponent } from './pages/depart/depart-view/depart-view.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { MonprofilComponent } from './pages/monprofil/monprofil.component';
import { PaiementEditComponent } from './pages/paiement/paiement-edit/paiement-edit.component';
import { PaiementListComponent } from './pages/paiement/paiement-list/paiement-list.component';
import { PaiementViewComponent } from './pages/paiement/paiement-view/paiement-view.component';
import { ReclamationEditComponent } from './pages/reclamation/reclamation-edit/reclamation-edit.component';
import { ReclamationListComponent } from './pages/reclamation/reclamation-list/reclamation-list.component';
import { ReclamationViewComponent } from './pages/reclamation/reclamation-view/reclamation-view.component';
import { ReservationChoixComponent } from './pages/reservation/reservation-choix/reservation-choix.component';
import { ReservationEditComponent } from './pages/reservation/reservation-edit/reservation-edit.component';
import { ReservationListComponent } from './pages/reservation/reservation-list/reservation-list.component';
import { ReservationPaiementComponent } from './pages/reservation/reservation-paiement/reservation-paiement.component';
import { ReservationRecapComponent } from './pages/reservation/reservation-recap/reservation-recap.component';
import { ReservationViewComponent } from './pages/reservation/reservation-view/reservation-view.component';
import { TelephoneComponent } from './pages/telephone/telephone.component';
import { TrajetEditComponent } from './pages/trajet/trajet-edit/trajet-edit.component';
import { TrajetListComponent } from './pages/trajet/trajet-list/trajet-list.component';
import { TrajetViewComponent } from './pages/trajet/trajet-view/trajet-view.component';
import { VoitureEditComponent } from './pages/voiture/voiture-edit/voiture-edit.component';
import { VoitureListComponent } from './pages/voiture/voiture-list/voiture-list.component';
import { VoitureViewComponent } from './pages/voiture/voiture-view/voiture-view.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'monprofil', component: MonprofilComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'telephone', component: TelephoneComponent },

  { path: 'agence', component: AgenceListComponent },
  { path: 'agence/edit', component: AgenceEditComponent },
  { path: 'agence/edit/:id', component: AgenceEditComponent },
  { path: 'agence/view/:id', component: AgenceViewComponent },

  { path: 'confirmation', component: ConfirmationListComponent },
  { path: 'confirmation/edit', component: ConfirmationEditComponent },
  { path: 'confirmation/edit/:id', component: ConfirmationEditComponent },
  { path: 'confirmation/view/:id', component: ConfirmationViewComponent },

  { path: 'depart', component: DepartListComponent },
  { path: 'depart/edit', component: DepartEditComponent },
  { path: 'depart/edit/:id', component: DepartEditComponent },
  { path: 'depart/view/:id', component: DepartViewComponent },

  { path: 'paiement', component: PaiementListComponent },
  { path: 'paiement/edit', component: PaiementEditComponent },
  { path: 'paiement/edit/:id', component: PaiementEditComponent },
  { path: 'paiement/view/:id', component: PaiementViewComponent },

  { path: 'reclamation', component: ReclamationListComponent },
  { path: 'reclamation/edit', component: ReclamationEditComponent },
  { path: 'reclamation/edit/:id', component: ReclamationEditComponent },
  { path: 'reclamation/view/:id', component: ReclamationViewComponent },

  { path: 'reservation', component: ReservationListComponent },
  { path: 'reservation/choix', component: ReservationChoixComponent },
  { path: 'reservation/paiement/:id', component: ReservationPaiementComponent },
  { path: 'reservation/recap/:id', component: ReservationRecapComponent },
  { path: 'reservation/edit', component: ReservationEditComponent },
  { path: 'reservation/edit/:id', component: ReservationEditComponent },
  { path: 'reservation/view/:id', component: ReservationViewComponent },

  { path: 'trajet', component: TrajetListComponent },
  { path: 'trajet/edit', component: TrajetEditComponent },
  { path: 'trajet/edit/:id', component: TrajetEditComponent },
  { path: 'trajet/view/:id', component: TrajetViewComponent },

  { path: 'voiture', component: VoitureListComponent },
  { path: 'voiture/edit', component: VoitureEditComponent },
  { path: 'voiture/edit/:id', component: VoitureEditComponent },
  { path: 'voiture/view/:id', component: VoitureViewComponent },

  { path: '**', redirectTo: 'accueil' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollOffset: [0, 0], scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
