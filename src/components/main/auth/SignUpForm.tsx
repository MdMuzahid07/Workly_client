'use client';

import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import z from 'zod';
import { useRegisterUserMutation } from '../../../redux/feature/auth/authApi';
import { setCredentials } from '../../../redux/feature/auth/authSlice';
import { useAppDispatch } from '../../../redux/hooks';
import WkForm from '../../form/WkForm';
import WKInput from '../../form/WkInput';
import { GoogleLoginButton } from './GoogleLoginButton';
import ParticlesBg from './ParticlesBg';

interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'EMPLOYER' | 'JOB_SEEKER';
}

const signUpSchema = z
  .object({
    fullName: z.string().min(1, 'Full Name is required'),
    email: z.string().email('Invalid email address'),
    role: z.enum(['EMPLOYER', 'JOB_SEEKER']),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(72, 'Password cannot exceed 72 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryRole = searchParams.get('role');

  const [selectedRole, setSelectedRole] = useState<'EMPLOYER' | 'JOB_SEEKER'>(
    queryRole === 'employer' ? 'EMPLOYER' : 'JOB_SEEKER',
  );

  useEffect(() => {
    if (queryRole === 'employer') {
      setSelectedRole('EMPLOYER');
    } else {
      setSelectedRole('JOB_SEEKER');
    }
  }, [queryRole]);

  const handleRoleChange = (role: 'EMPLOYER' | 'JOB_SEEKER') => {
    setSelectedRole(role);
    if (role === 'EMPLOYER') {
      router.push('/register?role=employer');
    } else {
      router.push('/register');
    }
  };

  const defaultValues: SignUpFormData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'JOB_SEEKER',
  };

  const handleSubmit = async (data: SignUpFormData) => {
    try {
      const response = await registerUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: selectedRole,
      }).unwrap();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const resData = (response as any).data;

      if (resData?.accessToken && resData?.email) {
        // Store in localStorage for client-side access
        localStorage.setItem('accessToken', resData.accessToken);

        // CRITICAL: Also set cookie so middleware sees token before navigation
        document.cookie = `accessToken=${resData.accessToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;

        dispatch(
          setCredentials({
            user: {
              email: resData.email,
              fullName: resData.fullName,
              phone: resData.phone,
              companyId: resData.companyId,
            },
            accessToken: resData.accessToken,
            refreshToken: null,
          }),
        );

        toast.success('Please verify your email!');
        router.replace('/verify-email');
      }
    } catch (error) {
      interface ApiErrorData {
        success?: boolean;
        message?: string;
        errorSources?: {
          path?: string | string[];
          message?: string;
        };
      }
      const err = error as {
        data?: ApiErrorData;
      };
      toast.error(err.data?.message || err.data?.errorSources?.message || 'Registration failed');
      console.error('Registration error:', error);
    }
  };

  const isEmployer = selectedRole === 'EMPLOYER';

  return (
    <>
      {/* High-Tech Animated Particles Background for Employer Role */}
      <div className="bg-background pointer-events-none absolute inset-0 -z-10 overflow-hidden transition-colors duration-1000">
        {/* Soft backdrop color transition */}
        <div
          className="from-muted/30 absolute inset-0 bg-gradient-to-tr via-emerald-500/5 to-teal-500/5 transition-opacity duration-1000"
          style={{ opacity: isEmployer ? 1 : 0 }}
        />

        {/* Connection node particle mesh */}
        <ParticlesBg active={isEmployer} />
      </div>

      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Join Workly_job</h1>
        <p className="text-muted-foreground text-sm">
          Create your account and start your career journey today.
        </p>
      </div>

      <WkForm
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        resolver={zodResolver(signUpSchema)}
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <WKInput
              name="fullName"
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              required
              className="form-input rounded-full transition-all duration-200"
            />

            <WKInput
              name="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              required
              className="form-input rounded-full transition-all duration-200"
            />

            <div className="relative">
              <WKInput
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                required
                className="form-input rounded-full pr-10 transition-all duration-200"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-6.5 right-0 cursor-pointer hover:bg-transparent"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? (
                  <EyeOff className="text-muted-foreground h-4 w-4" />
                ) : (
                  <Eye className="text-muted-foreground h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="relative">
              <WKInput
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                required
                className="form-input rounded-full pr-10 transition-all duration-200"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-6.5 right-0 cursor-pointer hover:bg-transparent"
                onClick={() => setShowConfirmPassword((v) => !v)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="text-muted-foreground h-4 w-4" />
                ) : (
                  <Eye className="text-muted-foreground h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant={selectedRole === 'EMPLOYER' ? 'default' : 'outline'}
                className={`hover:bg-primary flex-1 rounded-full border-2 py-3 font-semibold transition-colors duration-200 ${
                  selectedRole === 'EMPLOYER'
                    ? 'bg-primary border-primary text-white'
                    : 'border-border text-muted-foreground hover:text-white'
                }`}
                onClick={() => handleRoleChange('EMPLOYER')}
              >
                Employer
              </Button>

              <Button
                type="button"
                variant={selectedRole === 'JOB_SEEKER' ? 'default' : 'outline'}
                className={`hover:bg-primary flex-1 rounded-full border-2 py-3 font-semibold transition-colors duration-200 ${
                  selectedRole === 'JOB_SEEKER'
                    ? 'bg-primary border-primary text-white'
                    : 'border-border text-muted-foreground hover:text-white'
                }`}
                onClick={() => handleRoleChange('JOB_SEEKER')}
              >
                Job Seeker
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              disabled={isLoading}
              type="submit"
              className="bg-primary w-full cursor-pointer rounded-full py-3 font-semibold text-white shadow-sm transition-colors duration-200"
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </div>
        </div>
      </WkForm>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">Or continue with</span>
        </div>
      </div>

      <div className="space-y-4">
        <GoogleLoginButton role={selectedRole} />
        <p className="text-muted-foreground text-center text-sm">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-primary hover:text-primary/80 cursor-pointer font-medium transition-colors duration-200"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignUpForm;
