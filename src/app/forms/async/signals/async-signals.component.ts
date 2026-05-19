import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  form,
  validateHttp,
  FormField
} from '@angular/forms/signals';

@Component({
  selector: 'app-async-signals',
  standalone: true,
  templateUrl: './async-signals.component.html',
  styleUrl: './async-signals.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormField]
})
export class AsyncSignalsComponent {

  form = form(
    signal({
      username: ''
    }),
    (s) => {
      validateHttp(s.username, {
        request: ({ value }) =>
          `https://dummyjson.com/users/search?q=${value()}`,

        onSuccess: (res: any) => {
          return res.users.length > 0
            ? {
                kind: 'taken',
                message: 'Username vergeben'
              }
            : null;
        },

        onError: () => ({
          kind: 'network',
          message: 'Fehler'
        })
      });
    }
  );
}
