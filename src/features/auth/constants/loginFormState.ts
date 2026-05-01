import type { LoginFormState } from '../types';

export const initialLoginFormState: LoginFormState = {
  email: '',
  password: '',
  emailError: '',
  passwordError: '',
  formError: '',
  isSubmitting: false,
  showPassword: false,
};
