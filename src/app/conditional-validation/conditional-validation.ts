import { JsonPipe } from '@angular/common';
import { Component, effect, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { applyWhen, form, FormField, hidden, required, validateHttp } from '@angular/forms/signals';
import { initialData, Login, loginSchema } from './form';

// form = form(
//     signal({
//       checkIn: '',
//       checkOut: ''
//     }),
//     (s) => {
//       validate(s.checkOut, ({ value, valueOf }) => {
//         const checkIn = valueOf(s.checkIn);
//         const checkOut = value();

//         if (checkIn && checkOut && checkOut <= checkIn) {
//           return {
//             kind: 'dateRange',
//             message: 'Check-out muss nach Check-in liegen'
//           };
//         }

//         return null;
//       });
//     }
// );
function streetRequiredForShipping(group: AbstractControl): ValidationErrors | null {
  const isShipping = group.get('deliveryType')?.value === 'shipping';
  const street = group.get('street')?.value;
  return isShipping && !street ? { streetRequired: true } : null;
}

@Component({
  selector: 'app-conditional-validation',
  imports: [ReactiveFormsModule, JsonPipe, FormField],
  templateUrl: './conditional-validation.html',
  styleUrl: './conditional-validation.css',
})
export class ConditionalValidation implements OnInit {
  loginModel = signal<Login>(initialData);
  loginForm = form<Login>(this.loginModel, loginSchema);

  eff = effect(() => {
    console.log('Username value:', this.loginModel().username);
    console.log('Password value:', this.loginModel().password);
  });

  form = new FormGroup<{
    deliveryType: FormControl<'pickup' | 'shipping' | null>;
    street: FormControl<string | null>;
  }>(
    {
      deliveryType: new FormControl<'pickup' | 'shipping' | null>('pickup'),
      street: new FormControl<string | null>(''),
    },
    { validators: streetRequiredForShipping },
  );

  signalForm = form(
    signal<{ deliveryType: 'pickup' | 'shipping'; street: string }>({
      deliveryType: 'pickup' as 'pickup' | 'shipping',
      street: '',
    }),
    (s) => {
      // Only require street when shipping
      applyWhen(
        s.street,
        ({ valueOf }) => valueOf(s.deliveryType) === 'shipping',
        (street) => {
          required(street, { message: 'Street is required for shipping' });
        },
      );

      // Optional UX: hide field when not needed
      // hidden(s.street, ({ valueOf }) => valueOf(s.deliveryType) !== 'pickup');
    },
  );

  asyncForm = form(
    signal({
      username: '',
    }),
    (s) => {
      validateHttp(s.username, {
        request: ({ value }) => `https://dummyjson.com/users/search?q=${value()}`,

        onSuccess: (res: { users: any[] }) => {
          const exists = res.users.length > 0;

          return exists
            ? {
                kind: 'taken',
                message: 'Username existiert bereits (Dummy API)',
              }
            : null;
        },

        onError: () => ({
          kind: 'network',
          message: 'Server nicht erreichbar',
        }),
      });
    },
  );

  ngOnInit(): void {
    console.log('Form initialized:', this.form);
  }

  get street(): AbstractControl {
    return this.form.get('street')!;
  }

  get deliveryType(): AbstractControl {
    return this.form.get('deliveryType')!;
  }

  submit(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    } else {
      console.log('Form is invalid');
      this.form.markAllAsTouched();
    }
  }

  resetLoginForm(): void {
    this.loginModel.set(initialData);
  }
}
