import { disabled, required, schema } from '@angular/forms/signals';

export interface Login {
  username: string;
  password: string;
}

export const initialData: Login = {
  username: '',
  password: '',
};

export const loginSchema = schema<Login>((rootPath) => {
  required(rootPath.username, { message: 'Username ist erforderlich' });
  required(rootPath.password, { message: 'Password ist erforderlich' });
  disabled(rootPath.password, ({ valueOf }) => !valueOf(rootPath.username));
});
