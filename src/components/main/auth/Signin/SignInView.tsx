"use client";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import WkForm from "../../../form/WkForm";
import WKInput from "../../../form/WkInput";
import { useAuthDialog } from "../AuthDialogProvider";

interface SignInFormData {
  email: string;
  password: string;
}

const SignInView = () => {
  const { switchView } = useAuthDialog();
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues: SignInFormData = {
    email: "",
    password: "",
  };

  const handleSubmit = (data: SignInFormData) => {
    console.log(data);
  };

  return (
    <>
      <DialogHeader className="space-y-3">
        <DialogTitle className="text-foreground text-center text-2xl font-bold">
          Welcome Back
        </DialogTitle>
        <DialogDescription className="text-muted-foreground text-center">
          Sign in to your Workly_job account to continue your career journey.
        </DialogDescription>
      </DialogHeader>

      <WkForm defaultValues={defaultValues} onSubmit={handleSubmit}>
        <div className="mt-6 space-y-6">
          <div className="space-y-4">
            <WKInput
              name="email"
              label="Email Address"
              type="email"
              required
              className="form-input rounded-full transition-all duration-200"
            />

            <div className="relative">
              <WKInput
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
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
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full cursor-pointer rounded-full py-3 font-semibold shadow-sm transition-colors duration-200"
            >
              Sign In
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                className="text-muted-foreground hover:text-primary cursor-pointer text-sm transition-colors duration-200"
                onClick={() => switchView("forgot")}
              >
                Forgot your password?
              </Button>
            </div>
          </div>
        </div>
      </WkForm>

      <div className="border-border mt-6 border-t pt-6">
        <p className="text-muted-foreground text-center text-sm">
          {`Don't`} have an account?{" "}
          <Button
            variant="link"
            className="text-primary hover:text-primary/80 h-auto cursor-pointer p-0 font-medium transition-colors duration-200"
            onClick={() => switchView("signUp")}
          >
            Sign up here
          </Button>
        </p>
      </div>
    </>
  );
};

export default SignInView;
