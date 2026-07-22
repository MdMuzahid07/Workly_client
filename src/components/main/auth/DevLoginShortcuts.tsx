'use client';
import { Button } from '@/components/ui/button';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useLoginUserMutation } from '../../../redux/feature/auth/authApi';
import { setCredentials, UserRole } from '../../../redux/feature/auth/authSlice';
import { useAppDispatch } from '../../../redux/hooks';

const DevLoginShortcuts = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleQuickLogin = async (email: string, pass: string, role: string) => {
    try {
      const loadingToast = toast.loading(`Logging in as ${role}...`);
      const response = await loginUser({
        email,
        password: pass,
      }).unwrap();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const resData = (response as any).data;

      if (resData?.accessToken && resData?.email) {
        // Store in localStorage for client-side access
        localStorage.setItem('accessToken', resData.accessToken);

        // CRITICAL: Also set a cookie so Next.js middleware can read the token
        // during server-side route protection checks before navigation completes.
        // Without this cookie, middleware redirects back to /login on every first click.
        document.cookie = `accessToken=${resData.accessToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;

        const decodedToken = jwtDecode(resData.accessToken) as {
          isVerified: boolean;
          userId: string;
          role: string;
          companyId?: string;
        };

        if (decodedToken) {
          dispatch(
            setCredentials({
              user: {
                id: decodedToken.userId,
                email: resData.email,
                fullName: resData.fullName,
                isVerified: decodedToken.isVerified,
                phone: resData.phone,
                companyId: decodedToken.companyId || resData.companyId,
                role: decodedToken.role as UserRole,
                isActive: true,
              },
              accessToken: resData.accessToken,
              refreshToken: null,
            }),
          );
        }

        toast.dismiss(loadingToast);
        toast.success(`Logged in as ${role} successfully!`);

        // Use replace so the login page is not stacked in browser history
        if (decodedToken.role === 'ADMIN' || decodedToken.role === 'SUPER_ADMIN') {
          router.replace('/admin');
        } else if (decodedToken.role === 'EMPLOYER') {
          router.replace('/employer');
        } else {
          router.replace('/dashboard');
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.dismiss();
      toast.error(error?.data?.errorSources?.message || `Login as ${role} failed`);
      console.error('Quick login error:', error);
    }
  };

  return (
    <div className="border-primary/20 bg-primary/5 mb-8 rounded-xl border-2 border-dashed p-4">
      <p className="text-primary mb-3 text-center text-xs font-bold tracking-wider uppercase">
        Dev Quick Login
      </p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isLoading}
          onClick={() => handleQuickLogin('mydevcafe@gmail.com', 'Admin#$12345@', 'Admin')}
          className="border-primary/20 hover:bg-primary/10 hover:text-primary rounded-full"
        >
          Admin
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isLoading}
          onClick={() =>
            handleQuickLogin('mdmuzahid7396@gmail.com', 'HDiotuIDG85678%7%$#KjgDJG', 'Employer')
          }
          className="border-primary/20 hover:bg-primary/10 hover:text-primary rounded-full"
        >
          Employer
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isLoading}
          onClick={() =>
            handleQuickLogin('mdmuzahid.dev@gmail.com', 'FKJhOFIt985^&54#$%#', 'Seeker')
          }
          className="border-primary/20 hover:bg-primary/10 hover:text-primary rounded-full"
        >
          Seeker
        </Button>
      </div>
    </div>
  );
};

export default DevLoginShortcuts;
