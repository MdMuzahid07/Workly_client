"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import ForgetPasswordView from "./forget-password/ForgetPasswordView";
import SignInView from "./Signin/SignInView";
import SignUpView from "./signup/SignUpView";

export type AuthView = "signIn" | "signUp" | "forgot";

type Ctx = {
  open: boolean;
  view: AuthView;
  openAuth: (v: AuthView) => void;
  closeAuth: () => void;
  switchView: (v: AuthView) => void;
};

const AuthDialogCtx = createContext<Ctx | null>(null);

export const useAuthDialog = () => {
  const ctx = useContext(AuthDialogCtx);
  if (!ctx)
    throw new Error("useAuthDialog must be used within AuthDialogProvider");
  return ctx;
};

const AuthDialogProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<AuthView>("signIn");

  const api = useMemo<Ctx>(
    () => ({
      open,
      view,
      openAuth: (v) => {
        setView(v);
        setOpen(true);
      },
      closeAuth: () => setOpen(false),
      switchView: (v) => setView(v),
    }),
    [open, view],
  );

  return (
    <AuthDialogCtx.Provider value={api}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-card rounded-2xl border-gray-200 shadow-xl sm:max-w-[425px]">
          {view === "signIn" && <SignInView />}
          {view === "signUp" && <SignUpView />}
          {view === "forgot" && <ForgetPasswordView />}
        </DialogContent>
      </Dialog>
    </AuthDialogCtx.Provider>
  );
};

export default AuthDialogProvider;
