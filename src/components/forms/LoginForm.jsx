import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiMail } from "react-icons/fi";
import { loginSchema } from "@/schemas/authSchemas";
import { ROUTES } from "@/constants/routes";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";

// The form only collects and validates; the page decides what a submit does.
export function LoginForm({ onSubmit, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

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
        error={errors.password?.message}
      >
        <PasswordInput
          id="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          invalid={Boolean(errors.password)}
          {...register("password")}
        />
      </FormField>

      <div className="flex justify-end">
        <Link
          to="#"
          className="text-sm font-semibold text-primary hover:underline"
          onClick={(e) => e.preventDefault()}
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" loading={loading}>
        Log in
      </Button>

      <p className="text-center text-sm text-slate">
        New to Nest?{" "}
        <Link
          to={ROUTES.register}
          className="font-semibold text-primary hover:underline"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}
