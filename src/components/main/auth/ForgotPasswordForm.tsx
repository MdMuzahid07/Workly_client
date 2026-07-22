'use client';

import { Button } from '@/components/ui/button';
import { KeyRound, MoveLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { useForgotPasswordMutation } from '../../../redux/feature/auth/authApi';
import WkForm from '../../form/WkForm';
import WKInput from '../../form/WkInput';

interface ForgetPasswordFormData {
  email: string;
}

const ForgotPasswordForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const defaultValues: ForgetPasswordFormData = { email: '' };

  const handleSubmit = async (data: ForgetPasswordFormData) => {
    const result = await forgotPassword({ email: data.email });

    interface ApiErrorData {
      success?: boolean;
      message?: string;
      errorSources?: {
        path?: string | string[];
        message?: string;
      };
    }

    const successResult = result as {
      data?: { success?: boolean; message?: string };
    };
    const errorResult = result as {
      error?: { status?: number; data?: ApiErrorData; error?: string };
    };

    if (successResult.data) {
      toast.success(successResult.data.message || 'Reset link sent!');
      setIsSubmitted(true);
    } else if (errorResult.error) {
      const err = errorResult.error;
      const errMsg =
        err.data?.message ||
        err.data?.errorSources?.message ||
        err.error ||
        'An error occurred. Please try again.';
      toast.error(errMsg);
    }
  };

  return (
    <>
      <div className="mb-8 flex flex-col items-center space-y-2 text-center">
        <div className="bg-primary/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <KeyRound className="text-primary h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Reset Password</h1>
        <p className="text-muted-foreground text-sm">
          {isSubmitted
            ? 'Check your email for instructions'
            : "Enter your email address and we'll send you a link to reset your password."}
        </p>
      </div>

      {!isSubmitted ? (
        <WkForm defaultValues={defaultValues} onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <WKInput
                name="email"
                label="Email Address"
                type="email"
                placeholder="Enter your email address"
                required
                className="form-input rounded-full transition-all duration-200"
              />
            </div>

            <Button
              disabled={isLoading}
              type="submit"
              className="bg-primary w-full cursor-pointer rounded-full py-3 font-semibold text-white shadow-sm transition-colors duration-200"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>

            <Button variant="link" asChild className="w-full">
              <Link
                href="/login"
                className="text-muted-foreground hover:text-primary flex items-center gap-2"
              >
                <MoveLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </Button>
          </div>
        </WkForm>
      ) : (
        <div className="space-y-6">
          <div className="bg-success/10 text-success rounded-lg p-4 text-center text-sm font-medium">
            Password reset instructions have been sent to your email.
          </div>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="w-full rounded-full"
          >
            Try another email
          </Button>

          <Button variant="link" asChild className="w-full">
            <Link
              href="/login"
              className="text-muted-foreground hover:text-primary flex items-center gap-2"
            >
              <MoveLeft className="h-4 w-4" />
              Back to Login
            </Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default ForgotPasswordForm;
