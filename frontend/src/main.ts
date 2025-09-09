
/* import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms'; */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';


bootstrapApplication(App, appConfig, )
  .catch((err) => console.error(err));



