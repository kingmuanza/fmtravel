import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { NewsLetterComponent } from './pages/accueil/news-letter/news-letter.component';
import { HeaderComponent } from './composants/header/header.component';
import { FooterComponent } from './composants/footer/footer.component';
import { DepartsLiveComponent } from './composants/departs-live/departs-live.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { TrajetListComponent } from './pages/trajet/trajet-list/trajet-list.component';
import { TrajetEditComponent } from './pages/trajet/trajet-edit/trajet-edit.component';
import { TrajetViewComponent } from './pages/trajet/trajet-view/trajet-view.component';
import { DepartViewComponent } from './pages/depart/depart-view/depart-view.component';
import { DepartListComponent } from './pages/depart/depart-list/depart-list.component';
import { DepartEditComponent } from './pages/depart/depart-edit/depart-edit.component';
import { AgenceListComponent } from './pages/agence/agence-list/agence-list.component';
import { AgenceViewComponent } from './pages/agence/agence-view/agence-view.component';
import { AgenceEditComponent } from './pages/agence/agence-edit/agence-edit.component';
import { ReservationListComponent } from './pages/reservation/reservation-list/reservation-list.component';
import { ReservationEditComponent } from './pages/reservation/reservation-edit/reservation-edit.component';
import { ReservationViewComponent } from './pages/reservation/reservation-view/reservation-view.component';
import { PaiementListComponent } from './pages/paiement/paiement-list/paiement-list.component';
import { PaiementEditComponent } from './pages/paiement/paiement-edit/paiement-edit.component';
import { PaiementViewComponent } from './pages/paiement/paiement-view/paiement-view.component';
import { MonprofilComponent } from './pages/monprofil/monprofil.component';
import { ReclamationListComponent } from './pages/reclamation/reclamation-list/reclamation-list.component';
import { ReclamationEditComponent } from './pages/reclamation/reclamation-edit/reclamation-edit.component';
import { ReclamationViewComponent } from './pages/reclamation/reclamation-view/reclamation-view.component';
import { ConfirmationListComponent } from './pages/confirmation/confirmation-list/confirmation-list.component';
import { ConfirmationEditComponent } from './pages/confirmation/confirmation-edit/confirmation-edit.component';
import { ConfirmationViewComponent } from './pages/confirmation/confirmation-view/confirmation-view.component';
import { MenuHautComponent } from './composants/menu-haut/menu-haut.component';
import { VoitureListComponent } from './pages/voiture/voiture-list/voiture-list.component';
import { VoitureEditComponent } from './pages/voiture/voiture-edit/voiture-edit.component';
import { VoitureViewComponent } from './pages/voiture/voiture-view/voiture-view.component';
import { AccueilSousMenuComponent } from './pages/accueil/accueil-sous-menu/accueil-sous-menu.component';
import { AccueilLocationVoitureComponent } from './pages/accueil/accueil-location-voiture/accueil-location-voiture.component';
import { AccueilAchatTicketComponent } from './pages/accueil/accueil-achat-ticket/accueil-achat-ticket.component';
import { AccueilMoyensPaiementComponent } from './pages/accueil/accueil-moyens-paiement/accueil-moyens-paiement.component';
import { TelephoneComponent } from './pages/telephone/telephone.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservationChoixComponent } from './pages/reservation/reservation-choix/reservation-choix.component';
import { ReservationRecapComponent } from './pages/reservation/reservation-recap/reservation-recap.component';
import { ReservationPaiementComponent } from './pages/reservation/reservation-paiement/reservation-paiement.component';
import { DisplayDepartComponent } from './composants/display-depart/display-depart.component';
import { DisplayVoitureComponent } from './composants/display-voiture/display-voiture.component';
import { DisplayReservationDepartComponent } from './composants/display-reservation-depart/display-reservation-depart.component';
import { DisplayReservationVoitureComponent } from './composants/display-reservation-voiture/display-reservation-voiture.component';
import { DisplayReservationRecapComponent } from './composants/display-reservation-recap/display-reservation-recap.component';
import { DisplayAgenceComponent } from './composants/display-agence/display-agence.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    NewsLetterComponent,
    HeaderComponent,
    FooterComponent,
    DepartsLiveComponent,
    ConnexionComponent,
    InscriptionComponent,
    TrajetListComponent,
    TrajetEditComponent,
    TrajetViewComponent,
    DepartViewComponent,
    DepartListComponent,
    DepartEditComponent,
    AgenceListComponent,
    AgenceViewComponent,
    AgenceEditComponent,
    ReservationListComponent,
    ReservationEditComponent,
    ReservationViewComponent,
    PaiementListComponent,
    PaiementEditComponent,
    PaiementViewComponent,
    MonprofilComponent,
    ReclamationListComponent,
    ReclamationEditComponent,
    ReclamationViewComponent,
    ConfirmationListComponent,
    ConfirmationEditComponent,
    ConfirmationViewComponent,
    MenuHautComponent,
    VoitureListComponent,
    VoitureEditComponent,
    VoitureViewComponent,
    AccueilSousMenuComponent,
    AccueilLocationVoitureComponent,
    AccueilAchatTicketComponent,
    AccueilMoyensPaiementComponent,
    TelephoneComponent,
    ReservationChoixComponent,
    ReservationRecapComponent,
    ReservationPaiementComponent,
    DisplayDepartComponent,
    DisplayVoitureComponent,
    DisplayReservationDepartComponent,
    DisplayReservationVoitureComponent,
    DisplayReservationRecapComponent,
    DisplayAgenceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    AppRoutingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
