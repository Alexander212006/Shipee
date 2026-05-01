export type LoginFormState = {
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
  formError: string;
  isSubmitting: boolean;
  showPassword: boolean;
};

export type LoginFormAction =
  | { type: 'set_email'; payload: string }
  | { type: 'set_password'; payload: string }
  | { type: 'toggle_password_visibility' }
  | { type: 'start_submit' }
  | {
      type: 'set_errors';
      payload: Pick<LoginFormState, 'emailError' | 'passwordError' | 'formError'>;
    }
  | { type: 'set_form_error'; payload: string }
  | { type: 'stop_submit' };
