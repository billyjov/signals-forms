import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideSignalFormsConfig } from '@angular/forms/signals';
import { NG_STATUS_CLASSES } from '@angular/forms/signals/compat';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),

    // Optional: adds CSS classes to form controls based on their validation status (e.g., ng-valid, ng-invalid, ng-touched, etc.)
    // provideSignalFormsConfig({
    //   classes: NG_STATUS_CLASSES,
    // }),

    //or better custom classes with custom logic
    provideSignalFormsConfig({
     classes: {
        'my-invalid-class': ({ state }) => state().invalid(),
     }
    }),
  ]
};
