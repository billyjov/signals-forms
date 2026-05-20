import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { form, validateHttp, FormField, debounce } from '@angular/forms/signals';
import { User } from './user';

@Component({
  selector: 'app-async-signals',
  standalone: true,
  templateUrl: './async-signals.component.html',
  styleUrl: './async-signals.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormField],
})
export class AsyncSignalsComponent {
  private readonly userService = inject(User);

  form = form(
    signal({
      username: '',
    }),
    (s) => {
      // debounce(s.username, 500);

      validateHttp(s.username, {
        // request: ({ value }) => this.userService.usernameSearchRequest(value()),
        request: ({ value }) => {
          const v = value();

          if (!v || v.trim().length === 0) {
            // wichtig: keine Anfrage
            return undefined;
          }

          return `https://dummyjson.com/users/search?q=${v}`;
        },

        onSuccess: (res: any) => {
          return res.users.length > 0
            ? {
                kind: 'taken',
                message: 'Username vergeben',
              }
            : null;
        },

        onError: () => ({
          kind: 'network',
          message:
            'Fehler: Es konnte leider keine Verbindung zum Server hergestellt werden. Bitte versuche es später erneut.',
        }),
      });
    },
  );
}
