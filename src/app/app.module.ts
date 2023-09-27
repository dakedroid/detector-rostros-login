import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {UploadComponent} from './pages/upload/upload.component';
import {IdentificarComponent} from './pages/identificar/identificar.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {HomeComponent} from './pages/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {DeteccionComponent} from './pages/deteccion/deteccion.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getStorage, provideStorage} from "@angular/fire/storage";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";


const config = {
  apiKey: "AIzaSyDJD3JLlmgHGH7Dyn7nWRLbAq4pAgCOvUU",
  authDomain: "bienestarcontrol-37f4d.firebaseapp.com",
  databaseURL: "https://bienestarcontrol-37f4d-default-rtdb.firebaseio.com",
  projectId: "bienestarcontrol-37f4d",
  storageBucket: "bienestarcontrol-37f4d.appspot.com",
  messagingSenderId: "901906739294"
}


@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    IdentificarComponent,
    NavbarComponent,
    HomeComponent,
    DeteccionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
