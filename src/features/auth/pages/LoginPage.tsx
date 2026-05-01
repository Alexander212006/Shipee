import { type FormEvent, useEffect, useReducer, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoCartOutline,
  IoLogoApple,
  IoLogoGoogle,
} from 'react-icons/io5';
import { userCredentials } from '../data/userCredentials';
import { initialLoginFormState } from '../constants/loginFormState';
import { loginFormReducer } from '../utils/loginFormState';

export const LoginForm = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer(loginFormReducer, initialLoginFormState);
  const navigate = useNavigate();

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: 'start_submit' });

    let hasError = false;
    let emailError = '';
    let passwordError = '';

    if (!state.email.trim()) {
      emailError = 'Email is required.';
      hasError = true;
    }

    if (!state.password) {
      passwordError = 'Password is required.';
      hasError = true;
    }

    if (hasError) {
      dispatch({ type: 'set_errors', payload: { emailError, passwordError, formError: '' } });
      return;
    }

    const matchedUser = userCredentials.find(
      (credential) =>
        credential.email.toLowerCase() === state.email.trim().toLowerCase() &&
        credential.password === state.password
    );

    if (!matchedUser) {
      dispatch({ type: 'set_form_error', payload: 'Invalid email or password.' });
      return;
    }

    navigate('/products');
  };

  return (
    <div className="mx-auto w-full min-w-[320px] max-w-[540px] rounded-2xl border border-zinc-200 bg-white px-4 py-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:rounded-3xl sm:px-7 sm:py-8">
      <div className="mb-4 flex justify-center sm:mb-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 sm:h-14 sm:w-14">
          <IoCartOutline className="h-6 w-6 text-blue-500" aria-hidden="true" />
        </div>
      </div>

      <h1 className="text-center text-3xl font-semibold leading-tight text-zinc-900 sm:text-4xl">
        Login
      </h1>
      <p className="mt-2 text-center text-base text-zinc-600 sm:text-lg">
        Enter your details to login.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-zinc-700 sm:text-base"
          >
            Email
          </label>
          <input
            ref={emailInputRef}
            id="email"
            type="email"
            value={state.email}
            onChange={(event) =>
              dispatch({ type: 'set_email', payload: event.target.value })
            }
            placeholder="Enter your Email"
            className="h-11 w-full rounded-xl border border-zinc-300 px-3.5 text-sm text-zinc-900 outline-none transition-all duration-300 placeholder:text-zinc-400 hover:border-blue-300 hover:shadow-[0_0_0_2px_rgba(59,130,246,0.10)] focus:border-blue-500 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.18)] sm:h-12 sm:px-4 sm:text-base"
          />
          {state.emailError ? <p className="mt-1 text-xs text-red-600">{state.emailError}</p> : null}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-zinc-700 sm:text-base"
            >
              Password
            </label>
            <button
              type="button"
              className="rounded-md text-xs font-semibold text-zinc-700 transition-colors duration-200 hover:text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 sm:text-sm"
            >
              Forgot password?
            </button>
          </div>

          <div className="relative">
            <input
              id="password"
              type={state.showPassword ? 'text' : 'password'}
              value={state.password}
              onChange={(event) =>
                dispatch({ type: 'set_password', payload: event.target.value })
              }
              placeholder="Enter your password"
              className="h-11 w-full rounded-xl border border-zinc-300 px-3.5 pr-11 text-sm text-zinc-900 outline-none transition-all duration-300 placeholder:text-zinc-400 hover:border-blue-300 hover:shadow-[0_0_0_2px_rgba(59,130,246,0.10)] focus:border-blue-500 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.18)] sm:h-12 sm:px-4 sm:pr-12 sm:text-base"
            />
            <button
              type="button"
              onClick={() => dispatch({ type: 'toggle_password_visibility' })}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md text-zinc-500 transition-colors duration-200 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1"
              aria-label={state.showPassword ? 'Hide password' : 'Show password'}
            >
              {state.showPassword ? (
                <IoEyeOffOutline className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <IoEyeOutline className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
          {state.passwordError ? (
            <p className="mt-1 text-xs text-red-600">{state.passwordError}</p>
          ) : null}
        </div>

        {state.formError ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {state.formError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={state.isSubmitting}
          className="h-11 w-full rounded-xl bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 text-base font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-colors duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 sm:h-12 sm:text-lg"
        >
          {state.isSubmitting ? 'Checking...' : 'Log In'}
        </button>

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-300" />
          <span className="text-xs uppercase tracking-wide text-zinc-500 sm:text-sm">
            or
          </span>
          <div className="h-px flex-1 bg-zinc-300" />
        </div>

        <button
          type="button"
          className="flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-900 transition-colors duration-200 hover:border-blue-400 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200/80 sm:h-12 sm:gap-3 sm:text-base"
        >
          <IoLogoGoogle className="h-4 w-4 sm:h-5 sm:w-5" />
          Continue with Google
        </button>

        <button
          type="button"
          className="flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-900 transition-colors duration-200 hover:border-blue-400 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200/80 sm:h-12 sm:gap-3 sm:text-base"
        >
          <IoLogoApple className="h-4 w-4 sm:h-5 sm:w-5" />
          Continue with Apple
        </button>

        <p className="pt-2 text-center text-sm text-zinc-600 sm:text-base">
          Don&apos;t have an account yet?{' '}
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="rounded-sm font-semibold text-blue-700 underline transition-all duration-200 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};
