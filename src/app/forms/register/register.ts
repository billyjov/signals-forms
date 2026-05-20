import { JsonPipe } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import {
  form,
  required,
  email,
  minLength,
  FormField,
  validateStandardSchema,
  applyWhenValue,
  FormRoot,
} from '@angular/forms/signals';
import { string, object } from 'zod';

interface RegisterForm {
  name: string | null;
  email: string;
  password: string;
  test?: string;
}

const INITIAL_VALUE: RegisterForm = {
  name: '',
  email: '',
  password: '',
};

@Component({
  selector: 'app-register',
  imports: [FormField, JsonPipe, FormRoot],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  // signals state
  model = signal<RegisterForm>(INITIAL_VALUE);

  submitted = signal(false);

  debugEffect = effect(() => {
    // Model Values
    console.log('name', this.model().name);
    console.log('email', this.model().email);
    console.log('password', this.model().password);
    console.log('password', this.model().test);

    // field tree
    console.log('name', !!this.formRef.name);
    console.log('email', !!this.formRef.email);
    console.log('password', !!this.formRef.password);
    console.log('password', !!this.formRef.test);
  });

  registerSchema = object({
    name: string().nonempty({ message: 'Name ist erforderlich' }),
    email: string().nonempty({ message: 'E-Mail fehlt' }),
    password: string()
      .nonempty({ message: 'Passwort fehlt' })
      .min(6, { message: 'Mindestens 6 Zeichen' }),
  });

  // signals form
  formRef = form(this.model, (p) => {
    required(p.name, {
      message: 'Name ist erforderlich',
    });

    // applyWhenValue(
    //   p.name,
    //   (value) => value !== null,
    //   (namePath) => {
    //     required(namePath, {
    //       message: 'Name ist erforderlich apply when value',
    //     });
    //   },
    // );

    required(p.email, {
      message: 'E-Mail fehlt',
    });

    email(p.email, {
      message: 'Ungültige E-Mail',
    });

    required(p.password, {
      message: 'Passwort fehlt',
    });

    minLength(p.password, 6, {
      message: 'Mindestens 6 Zeichen',
    });
  }, {
    submission: {
      action: async (form) => {
        console.log('form submitted: ', form);
      },
      ignoreValidators: 'none',
      onInvalid: (field) => {
        const firstError = field().errorSummary()[0];
        console.log('invalid: ', field().errorSummary())
        firstError?.fieldTree().focusBoundControl();
      },
    }
  });

  // formRef with external validators
  // formRef = form(this.model, (schemaPath) => {
  //   validateStandardSchema(schemaPath, this.registerSchema);
  // });

  submit(): void {
    this.submitted.set(true);

    if (this.formRef().invalid()) {
      return;
    }

    console.log(this.model());

    // Reset form does not affect the form state (e.g., validity, touched, etc.) and does not trigger validation. It only resets the form values.
    this.model.set(INITIAL_VALUE);

    this.submitted.set(false);
  }
}
