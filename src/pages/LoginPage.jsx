import { AuthLayout } from "@/components/layout/AuthLayout";
import { LoginForm } from "@/components/forms/LoginForm";
import { useLogin } from "@/hooks/useLogin";
import { ROUTES } from "@/constants/routes";
import { APP_NAME } from "@/constants/app";

export default function LoginPage() {
  const { mutate, isPending } = useLogin();

  return (
    <AuthLayout
      switchPrompt={`New to ${APP_NAME}?`}
      switchLabel="Create an account"
      switchTo={ROUTES.register}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
        Welcome to {APP_NAME}
      </p>
      <h1 className="mt-3 text-[40px] font-medium leading-tight tracking-tight text-ink">
        Welcome back.
      </h1>
      <p className="mb-9 mt-3 text-[15px] text-slate">
        A little more clarity starts here. Log in to your account.
      </p>

      <LoginForm onSubmit={mutate} loading={isPending} />

      <nav
        className="mt-12 flex justify-center gap-6 text-[13px] text-slate"
        aria-label="Legal"
      >
        <a href="#" className="hover:text-ink">
          Privacy policy
        </a>
        <a href="#" className="hover:text-ink">
          Terms of service
        </a>
        <a href="#" className="hover:text-ink">
          Help &amp; support
        </a>
      </nav>
    </AuthLayout>
  );
}
