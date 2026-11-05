import { AuthLayout } from "@/components/layout/AuthLayout";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { useRegister } from "@/hooks/useRegister";
import { ROUTES } from "@/constants/routes";
import { APP_TAGLINE } from "@/constants/app";

export default function RegisterPage() {
  const { mutate, isPending } = useRegister();

  // The API only needs email + password; confirmPassword is a UI-only field.
  const handleSubmit = ({ email, password }) => mutate({ email, password });

  return (
    <AuthLayout
      switchPrompt="Already have an account?"
      switchLabel="Log in"
      switchTo={ROUTES.login}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
        A fresh start
      </p>
      <h1 className="mt-3 text-[40px] font-medium leading-tight tracking-tight text-ink">
        Your next chapter starts here.
      </h1>
      <p className="mb-9 mt-3 text-[15px] text-slate">{APP_TAGLINE}</p>

      <RegisterForm onSubmit={handleSubmit} loading={isPending} />
    </AuthLayout>
  );
}
