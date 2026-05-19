import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cross-field-reactive',
  templateUrl: './cross-field-reactive.component.html',
  styleUrl: './cross-field-reactive.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, CommonModule]
})
export class CrossFieldReactiveComponent {
  form = new FormGroup(
    {
      checkIn: new FormControl('', Validators.required),
      checkOut: new FormControl('', Validators.required),
    },
    {
      validators: (group) => {
        const checkIn = group.get('checkIn')?.value;
        const checkOut = group.get('checkOut')?.value;

        if (checkIn && checkOut && checkOut <= checkIn) {
          return { dateRange: true };
        }

        return null;
      }
    }
  );
}
