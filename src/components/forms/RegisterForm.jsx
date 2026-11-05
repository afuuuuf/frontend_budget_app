import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiCheckCircle, FiMail } from "react-icons/fi";
import { registerSchema } from "@/schemas/authSchemas";
import { ROUTES } from "@/constants/routes";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";

export function RegisterForm({ onSubmit, loading }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <FormField label="Email" htmlFor="email" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@email.com"
          invalid={Boolean(errors.email)}
          adornment={<FiMail size={20} aria-hidden="true" />}
          {...register("email")}
        />
      </FormField>

      <FormField
        label="Password"
        htmlFor="password"
        hint="At least 8 characters, including a number."
        error={errors.password?.message}
      >
        <PasswordInput
          id="password"
          autoComplete="new-password"
          placeholder="Create a password"
          invalid={Boolean(errors.password)}
          {...register("password")}
        />
      </FormField>

      <div>
        <FormField
          label="Confirm password"
          htmlFor="confirmPassword"
          error={errors.confirmPassword?.message}
        >
          <PasswordInput
            id="confirmPassword"
            autoComplete="new-password"
            placeholder="Re-enter your password"
            invalid={Boolean(errors.confirmPassword)}
            {...register("confirmPassword")}
          />
        </FormField>
        {passwordsMatch && (
          <p
            className="mt-3 flex items-center gap-2 text-[13px] text-primary"
            aria-live="polite"
          >
            <FiCheckCircle aria-hidden="true" />
            Passwords match
          </p>
        )}
      </div>

      <Button type="submit" loading={loading}>
        Create account
      </Button>

      <p className="text-center text-[13px] text-slate">
        By creating an account, you agree to our{" "}
        <a href="#" className="text-ink hover:underline">
          Terms of service
        </a>{" "}
        and{" "}
        <a href="#" className="text-ink hover:underline">
          Privacy policy
        </a>
        .
      </p>

      <p className="text-center text-sm text-slate">
        Already have an account?{" "}
        <Link
          to={ROUTES.login}
          className="font-semibold text-primary hover:underline"
        >
          Log in
        </Link>
      </p>
    </form>
  );
}
