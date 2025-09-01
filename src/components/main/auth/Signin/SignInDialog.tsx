"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";

export function SignInDialog() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex cursor-pointer items-center gap-2 rounded-lg bg-green-400 px-6 py-3 text-lg font-semibold text-white shadow-sm transition-colors duration-200">
          Sign In
          <LogIn className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-3xl border-gray-200 bg-green-50 shadow-xl sm:max-w-[425px]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-center text-2xl font-bold text-gray-900">
            Welcome Back
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Sign in to your Workly_job account to continue your career journey.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg border-gray-300 bg-white transition-all duration-200 focus:outline-none active:border-green-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-lg border-gray-300 bg-white pr-10 transition-all duration-200 focus:border-green-400 focus:ring-2 focus:ring-green-400"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-green-400 py-3 font-semibold text-white shadow-sm transition-colors duration-200"
            >
              Sign In
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                className="cursor-pointer text-sm text-gray-500 transition-colors duration-200 hover:text-green-400"
              >
                Forgot your password?
              </Button>
            </div>
          </div>
        </form>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <p className="text-center text-sm text-gray-600">
            {`Don't`} have an account?{" "}
            <Button
              variant="link"
              className="h-auto cursor-pointer p-0 font-medium text-green-400 transition-colors duration-200 hover:text-[#00C299]"
            >
              Sign up here
            </Button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
