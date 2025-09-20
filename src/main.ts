import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './app/firebase.config';
import { registerLocaleData } from '@angular/common';
import localeIn from '@angular/common/locales/en-IN';

initializeApp(firebaseConfig);
registerLocaleData(localeIn, 'en-IN');


bootstrapApplication(AppComponent,
  {

    providers: [...appConfig.providers,
      { provide: 'LOCALE_ID', useValue: 'en-IN' }]
  })
  .catch((err) => console.error(err));
