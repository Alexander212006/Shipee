import type { LoginFormAction, LoginFormState } from '../types';

export const loginFormReducer = (
  state: LoginFormState,
  action: LoginFormAction
): LoginFormState => {
  switch (action.type) {
    case 'set_email':
      return { ...state, email: action.payload };
    case 'set_password':
      return { ...state, password: action.payload };
    case 'toggle_password_visibility':
      return { ...state, showPassword: !state.showPassword };
    case 'start_submit':
      return { ...state, isSubmitting: true, emailError: '', passwordError: '', formError: '' };
    case 'set_errors':
      return { ...state, ...action.payload, isSubmitting: false };
    case 'set_form_error':
      return { ...state, formError: action.payload, isSubmitting: false };
    case 'stop_submit':
      return { ...state, isSubmitting: false };
    default:
      return state;
  }
};
