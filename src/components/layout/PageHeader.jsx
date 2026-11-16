// Title + subtitle on the left, optional actions (month picker, buttons) on the right.
export function PageHeader({ title, description, children }) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-[32px] font-medium leading-tight tracking-tight text-ink">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-[15px] text-slate">{description}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
}
