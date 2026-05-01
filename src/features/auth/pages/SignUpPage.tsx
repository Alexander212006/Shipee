import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IoCartOutline,
  IoEyeOffOutline,
  IoEyeOutline,
  IoLogoApple,
  IoLogoGoogle,
} from 'react-icons/io5';

export const SignUpForm = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  return (
    <div className="mx-auto w-full min-w-[320px] max-w-[540px] rounded-2xl border border-zinc-200 bg-white px-4 py-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:rounded-3xl sm:px-7 sm:py-8">
      <div className="mb-4 flex justify-center sm:mb-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 sm:h-14 sm:w-14">
          <IoCartOutline className="h-6 w-6 text-blue-500" aria-hidden="true" />
        </div>
      </div>

      <h1 className="text-center text-3xl font-semibold leading-tight text-zinc-900 sm:text-4xl">
        Sign Up
      </h1>
      <p className="mt-2 text-center text-base text-zinc-600 sm:text-lg">
        Create your account to get started.
      </p>

      <form className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-700 sm:text-base">
            Full Name
          </label>
          <input
            ref={nameInputRef}
            id="name"
            type="text"
            placeholder="Enter your full name"
            className="h-11 w-full rounded-xl border border-zinc-300 px-3.5 text-sm text-zinc-900 outline-none transition-all duration-300 placeholder:text-zinc-400 hover:border-blue-300 hover:shadow-[0_0_0_2px_rgba(59,130,246,0.10)] focus:border-blue-500 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.18)] sm:h-12 sm:px-4 sm:text-base"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-700 sm:text-base">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your Email"
            className="h-11 w-full rounded-xl border border-zinc-300 px-3.5 text-sm text-zinc-900 outline-none transition-all duration-300 placeholder:text-zinc-400 hover:border-blue-300 hover:shadow-[0_0_0_2px_rgba(59,130,246,0.10)] focus:border-blue-500 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.18)] sm:h-12 sm:px-4 sm:text-base"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-700 sm:text-base">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              className="h-11 w-full rounded-xl border border-zinc-300 px-3.5 pr-11 text-sm text-zinc-900 outline-none transition-all duration-300 placeholder:text-zinc-400 hover:border-blue-300 hover:shadow-[0_0_0_2px_rgba(59,130,246,0.10)] focus:border-blue-500 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.18)] sm:h-12 sm:px-4 sm:pr-12 sm:text-base"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md text-zinc-500 transition-colors duration-200 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <IoEyeOffOutline className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <IoEyeOutline className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-zinc-700 sm:text-base"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              className="h-11 w-full rounded-xl border border-zinc-300 px-3.5 pr-11 text-sm text-zinc-900 outline-none transition-all duration-300 placeholder:text-zinc-400 hover:border-blue-300 hover:shadow-[0_0_0_2px_rgba(59,130,246,0.10)] focus:border-blue-500 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.18)] sm:h-12 sm:px-4 sm:pr-12 sm:text-base"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md text-zinc-500 transition-colors duration-200 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1"
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirmPassword ? (
                <IoEyeOffOutline className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <IoEyeOutline className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="h-11 w-full rounded-xl bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 text-base font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-colors duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 sm:h-12 sm:text-lg"
        >
          Create Account
        </button>

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-300" />
          <span className="text-xs uppercase tracking-wide text-zinc-500 sm:text-sm">or</span>
          <div className="h-px flex-1 bg-zinc-300" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-2 text-xs font-medium whitespace-nowrap text-zinc-900 transition-colors duration-200 hover:border-blue-400 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200/80 sm:h-12 sm:gap-2.5 sm:px-3 sm:text-sm"
          >
            <IoLogoGoogle className="h-4 w-4 sm:h-5 sm:w-5" />
            Continue with Google
          </button>

          <button
            type="button"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-2 text-xs font-medium whitespace-nowrap text-zinc-900 transition-colors duration-200 hover:border-blue-400 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200/80 sm:h-12 sm:gap-2.5 sm:px-3 sm:text-sm"
          >
            <IoLogoApple className="h-4 w-4 sm:h-5 sm:w-5" />
            Continue with Apple
          </button>
        </div>

        <p className="pt-2 text-center text-sm text-zinc-600 sm:text-base">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="rounded-sm font-semibold text-blue-700 underline transition-all duration-200 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1"
          >
            Log in
          </button>
        </p>
      </form>
    </div>
  );
};
