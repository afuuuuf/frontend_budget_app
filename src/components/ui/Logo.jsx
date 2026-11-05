import logo from "@/assets/Nest.png";
import { APP_NAME } from "@/constants/app";

export function Logo({
  className = "h-8",
  showText = false,
  textClassName = "text-2xl",
  textColor = "text-ivory",
}) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={logo}
        alt={showText ? "" : APP_NAME.toLowerCase()}
        className={`w-auto shrink-0 object-contain ${className}`}
      />
      {showText && (
        <span
          className={`font-sans font-medium tracking-tight ${textColor} ${textClassName}`}
        >
          {APP_NAME.toLowerCase()}
        </span>
      )}
    </div>
  );
}
