import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'conditional-validation',
    loadComponent: () =>
      import('./conditional-validation/conditional-validation').then(
        (c) => c.ConditionalValidation,
      ),
  },
  {
    path: 'cross-field/reactive',
    loadComponent: () =>
      import('./forms/cross-field/reactive/cross-field-reactive.component').then(
        (m) => m.CrossFieldReactiveComponent,
      ),
  },
  {
    path: 'cross-field/signals',
    loadComponent: () =>
      import('./forms/cross-field/signals/cross-field-signals.component').then(
        (m) => m.CrossFieldSignalsComponent,
      ),
  },
  {
    path: 'async/reactive',
    loadComponent: () =>
      import('./forms/async/reactive/async-reactive.component').then(
        (m) => m.AsyncReactiveComponent,
      ),
  },
  {
    path: 'async/signals',
    loadComponent: () =>
      import('./forms/async/signals/async-signals.component').then((m) => m.AsyncSignalsComponent),
  },
  {
    path: 'array/reactive',
    loadComponent: () =>
      import('./forms/array/reactive/array-reactive.component').then(
        (m) => m.ArrayReactiveComponent,
      ),
  },
  {
    path: 'array/signals',
    loadComponent: () =>
      import('./forms/array/signals/array-signals.component').then((m) => m.ArraySignalsComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./forms/register/register').then((m) => m.Register),
  },
];
