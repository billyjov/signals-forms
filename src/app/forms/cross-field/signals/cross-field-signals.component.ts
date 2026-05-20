import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  form,
  validate,
  FormField
} from '@angular/forms/signals';

@Component({
  selector: 'app-cross-field-signals',
  standalone: true,
  templateUrl: './cross-field-signals.component.html',
  styleUrl: './cross-field-signals.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormField]
})
export class CrossFieldSignalsComponent {

  form = form(
    signal({
      checkIn: '',
      checkOut: ''
    }),
    (s) => {
      validate(s.checkOut, ({ value, valueOf }) => {
        const checkIn = valueOf(s.checkIn);
        const checkOut = value();

        if (checkIn && checkOut && checkOut <= checkIn) {
          return {
            kind: 'dateRange',
            message: 'Check-out muss nach Check-in liegen'
          };
        }

        return null;
      });
    }
  );
}
