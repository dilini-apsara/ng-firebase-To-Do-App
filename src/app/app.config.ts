import {ApplicationConfig, provideZoneChangeDetection, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(
      {
        apiKey: "AIzaSyDHkKT4l4sTUNhQK4JT0wRQBGkkNJeJrDY",
        authDomain: "to-do-list-a274d.firebaseapp.com",
        projectId: "to-do-list-a274d",
        storageBucket: "to-do-list-a274d.appspot.com",
        messagingSenderId: "260588256984",
        appId: "1:260588256984:web:4f457ec3862ea4ae8fe1ad"
      })), provideAuth(() => getAuth()),provideFirestore(()=>getFirestore()), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })]
};
