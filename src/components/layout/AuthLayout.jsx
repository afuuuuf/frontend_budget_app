import { Link } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { Logo } from "@/components/ui/Logo";

function NestIllustration() {
  return (
    <svg
      viewBox="0 -120 320 320"
      className="w-full max-w-[330px]"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="160" cy="-62" r="44" fill="#DDEDAD" />
      <path
        d="M12 12 C60 130 260 130 308 12"
        stroke="#F7F8F4"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <path
        d="M44 74 C85 160 235 160 276 74"
        stroke="#F7F8F4"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <path
        d="M92 136 C120 188 200 188 228 136"
        stroke="#F7F8F4"
        strokeWidth="16"
        strokeLinecap="round"
      />
    </svg>
  );
}

// `switchPrompt` + `switchLabel` + `switchTo` drive the top-right link.
export function AuthLayout({ children, switchPrompt, switchLabel, switchTo }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      {/* Brand panel */}
      <aside className="hidden flex-col items-center gap-12 bg-primary px-12 py-12 text-center text-ivory lg:flex">
        {/* Logo with the "Nest" word, pinned top-left */}
        <div className="self-start">
          <Logo showText className="h-12" textClassName="text-3xl" />
        </div>

        {/* Headline + illustration, centred in the remaining space */}
        <div className="my-auto w-full max-w-md">
          <h2 className="text-[56px] font-medium leading-[1.05] tracking-tight">
            Make room for
            <br />
            what matters.
          </h2>
          <p className="mt-5 text-lg text-ivory/80">
            A little clarity. A little more possibility.
          </p>
          <div className="mt-16 flex justify-center">
            <NestIllustration />
          </div>
        </div>

        <p className="flex items-center gap-2 text-sm text-ivory/90">
          <FiLock className="text-lime" aria-hidden="true" />
          Your money story stays yours.
        </p>
      </aside>

      {/* Form panel */}
      <main className="flex flex-col bg-ivory px-6 py-8 sm:px-12">
        <div className="mb-10 flex items-center justify-between lg:justify-end">
          {/* Mobile-only logo (image only, no word) */}
          <div className="flex items-center rounded-lg bg-primary px-3 py-2 lg:hidden">
            <Logo className="h-6" />
          </div>
          <p className="text-sm text-slate">
            {switchPrompt}{" "}
            <Link
              to={switchTo}
              className="font-semibold text-primary hover:underline"
            >
              {switchLabel}
            </Link>
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-[402px] flex-1 flex-col justify-center pb-16">
          {children}
        </div>
      </main>
    </div>
  );
}
